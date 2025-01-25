import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovie, fetchMovies } from "../../redux/movieSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { FaSearch } from "react-icons/fa";
import './style.scss'

const SearchComponent = () => {

  const dispatch = useDispatch<AppDispatch>(); 
  const search = useSelector((state: RootState) => state.movies.searchMovie);

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    dispatch(setSearchMovie(item));
  };

  const prevSearchRef = useRef(search);

  useEffect(() => {
    if (prevSearchRef.current === search) return;
    prevSearchRef.current = search;
  
    const delaySearch = setTimeout(() => {
      if (search.length > 2) {
        dispatch(fetchMovies({ search: search, page: 1 }));
      }
    }, 500);
    
    return () => clearTimeout(delaySearch);
  }, [search]);
  
  
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={changeSearch}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchComponent;