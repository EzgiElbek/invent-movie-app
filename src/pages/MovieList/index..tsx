import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MoviePagination from "../../components/MoviePagination";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchMovies } from "../../redux/movieSlice";
import Card from "../../components/Card";
import "./style.scss";

const MovieList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state: RootState) => state.movies.movies);
    const getCurrentPage = useSelector((state: RootState) => state.movies.currentPage);
  
    useEffect(() => {
      dispatch(fetchMovies({ search: "Pokemon", page: getCurrentPage }));
    }, [dispatch, getCurrentPage]);
  
    return (
      <div>
        <div className="movie-list">
          {movies.map((item) => (
            <Card key={item.imdbID} imdbID={item.imdbID} poster={item.Poster} name={item.Title} type={item.Type} year={item.Year} />
          ))}
        </div>
        <MoviePagination />
      </div>
    );
  };
  
export default MovieList;
