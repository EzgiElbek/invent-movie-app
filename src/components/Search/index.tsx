import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovie, setSearchYear, fetchMovies, setCurrentPage } from "../../redux/movieSlice";
import { RootState, AppDispatch } from "../../redux/store";
import debounce from "lodash/debounce";
import { FaSearch } from "react-icons/fa";
import "./style.scss";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchName = useSelector((state: RootState) => state.movies.searchMovie);
  const searchYear = useSelector((state: RootState) => state.movies.searchYear);
  const type = useSelector((state: RootState) => state.movies.selectedType);
  const isFirstRender = useRef(true);

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchMovie(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const changeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchYear(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const debouncedFetchMovies = useCallback(
    debounce((search: string, year: string) => {
      dispatch(fetchMovies({ search, page: 1, type: type, year }));
    }, 500),
    [dispatch, type]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (searchName.length > 2 || searchYear.length > 2) {
      debouncedFetchMovies(searchName, searchYear);
    }

    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [searchName, searchYear, dispatch, debouncedFetchMovies]);

  return (
    <div className="search">
      <div className="search__wrapper">
        <FaSearch className="search__wrapper-name-icon" />
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={changeSearch}
          className="search__wrapper-input"
        />
        <FaSearch className="search__wrapper-year-icon" />
        <input
          type="text"
          placeholder="Search by year"
          value={searchYear}
          onChange={changeYear}
          className="search__wrapper-input"
        />
      </div>
    </div>
  );
};

export default Search;