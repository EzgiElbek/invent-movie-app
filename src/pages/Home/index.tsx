import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setSelectedType, setCurrentPage } from "../../redux/movieSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Tabs, Tab, Box } from "@mui/material";
import Search from "../../components/Search";
import MovieList from "../MovieList/index";
import { FaSadTear } from "react-icons/fa";
import "./style.scss";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchWord = useSelector((state: RootState) => state.movies.searchMovie);
  const searchYear = useSelector((state: RootState) => state.movies.searchYear);
  const currentPage = useSelector((state: RootState) => state.movies.currentPage);
  const allMovieList = useSelector((state: RootState) => state.movies);
  const selectedType = useSelector((state: RootState) => state.movies.selectedType);
  
  const tabTypes = ["movie", "series", "episode"];

  useEffect(() => {
    dispatch(fetchMovies({ search: searchWord, page: currentPage, type: selectedType, year: searchYear }));
  }, [dispatch, selectedType]);

  return (
    <div className="home">
      <div className="home__header">
        <img src="./assets/logo.png" alt="logo" />
        <Box className="home__header-wrapper">
          <Tabs
            value={tabTypes.indexOf(selectedType) === -1 ? false : tabTypes.indexOf(selectedType)}
            onChange={(_, tabIndex) => {dispatch(setSelectedType(tabTypes[tabIndex])); dispatch(setCurrentPage(1));}}
            indicatorColor="primary"
            textColor="primary"
          >
            {tabTypes.map((name, index) => (
              <Tab key={index} label={name} />
            ))}
          </Tabs>
          <Search/>
        </Box>
      </div>
      <div className={allMovieList?.movies?.length > 0 ? "home__body" : "home__not-found"}>
        {allMovieList?.movies?.length > 0 ? (
          <MovieList/>
        ) : (
          <div className="home__not-found-wrapper">
            <FaSadTear className="home__not-found-wrapper-icon" />
            <span className="home__not-found-wrapper-title">Page Not Found.</span>
            <span className="home__not-found-wrapper-subtitle">The content you were looking for was not found. Try a different search.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;