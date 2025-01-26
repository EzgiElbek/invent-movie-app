import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovie, setSearchYear, fetchMovies, setCurrentPage } from "../../redux/movieSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { FaSearch } from "react-icons/fa";
import "./style.scss";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getSearch = useSelector((state: RootState) => state.movies.searchMovie);
  const getYear = useSelector((state: RootState) => state.movies.searchYear);
  const getType = useSelector((state: RootState) => state.movies.selectedType);
  const isFirstRender = useRef(true);

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchMovie(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const changeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchYear(e.target.value));
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (getSearch.length > 2 || getYear.length > 2) {
      const delaySearch = setTimeout(() => {
        dispatch(fetchMovies({ search: getSearch, page: 1, type: getType, year: getYear }));
      }, 500);
      return () => clearTimeout(delaySearch);
    }
  }, [getSearch, getYear, dispatch]);

  return (
    <div className="search">
      <div className="search__wrapper">
        <FaSearch className="search__wrapper-name-icon" />
        <input
          type="text"
          placeholder="Search by name"
          value={getSearch}
          onChange={changeSearch}
          className="search__wrapper-input"
        />
        <FaSearch className="search__wrapper-year-icon" />
        <input
          type="text"
          placeholder="Search by year"
          value={getYear}
          onChange={changeYear}
          className="search__wrapper-input"
        />
      </div>
    </div>
  );
};

export default Search;