import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setCurrentPage } from "../../redux/movieSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { Pagination } from "@mui/material";
import './style.scss'

const MoviePagination = () => {

  const dispatch = useDispatch<AppDispatch>();
  const totalResults = useSelector((state: RootState) => state.movies.totalResults);
  const searchMovie = useSelector((state: RootState) => state.movies.searchMovie);
  const currentPage = useSelector((state: RootState) => state.movies.currentPage);
  const type = useSelector((state: RootState) => state.movies.selectedType);
  const isFirstRender = useRef(true);

  const pageCount: number = Math.ceil(totalResults / 10);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    dispatch(fetchMovies({ page: currentPage, search: searchMovie, type: type }));
  }, [currentPage, dispatch, searchMovie]);

  return (
    <div className="pagination">
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={(_, page: number) => dispatch(setCurrentPage(page))}
        variant="outlined"
        shape="rounded"
        color="secondary"
        size="medium"
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default MoviePagination;