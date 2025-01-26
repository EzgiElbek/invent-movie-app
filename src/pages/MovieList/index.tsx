import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Card from "../../components/Card";
import MoviePagination from "../../components/MoviePagination";
import "./style.scss";

const MovieList = () => {

  const movieList = useSelector((state: RootState) => state.movies.movies);
  
    return (
      <div className="movie-wrapper">
        <div className="movie-wrapper__list">
          {movieList.map((movie) => (
            <Card key={movie.imdbID} imdbID={movie.imdbID} poster={movie.Poster} name={movie.Title} type={movie.Type} year={movie.Year} />
          ))}
        </div>
        <MoviePagination />
      </div>
    );
  };
  
export default MovieList;
