import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { fetchMovies } from "../../redux/movieSlice";
import { RootState, AppDispatch } from "../../redux/store";
import './style.scss'

const MoviePagination = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  const totalResults = useSelector((state: RootState) => state.movies.totalResults);
  const getSearch = useSelector((state: RootState) => state.movies.searchMovie);

  const pageCount: number = Math.ceil(totalResults / 10);

  useEffect(() => {
    if (currentPage !== 1) {
      dispatch(fetchMovies({ page: currentPage, search: getSearch }));
    }
  }, [currentPage, dispatch, getSearch]);

  return (
    <div className="pagination">
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={(_, page: number) => setCurrentPage(page)}
        variant="outlined"
        shape="rounded"
        color="primary"
        size="medium"
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default MoviePagination;