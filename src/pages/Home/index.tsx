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
  const getSearch = useSelector((state: RootState) => state.movies.searchMovie);
  const getSearchYear = useSelector((state: RootState) => state.movies.searchYear);
  const getPage = useSelector((state: RootState) => state.movies.currentPage);
  const getMovies = useSelector((state: RootState) => state.movies);
  const selectedType = useSelector((state: RootState) => state.movies.selectedType);
  
  const tabTypes = ["movie", "series", "episode"];

  useEffect(() => {
    dispatch(fetchMovies({ search: getSearch, page: getPage, type: selectedType, year: getSearchYear }));
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
      <div className={getMovies?.movies?.length > 0 ? "home__body" : "home__not-found"}>
        {getMovies?.movies?.length > 0 ? (
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