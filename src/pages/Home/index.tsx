import { useState } from "react";
import "./style.scss";
import MovieList from "../MovieList/index.";
import Search from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/movieSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { Tabs, Tab, Box } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getSearch = useSelector((state: RootState) => state.movies.searchMovie);
  const [selectedTab, setSelectedTab] = useState(0);

  const changeType = (type: "movie" | "series" | "episode", index: number) => {
    if (selectedTab !== index) {
      setSelectedTab(index);
      dispatch(fetchMovies({ search: getSearch || "Pokemon", page: 1, type }));
    }
  };
  
  return (
    <div className="home">
      <div className="home__header">
        <img src="./assets/logo.png" alt="logo" className="home__header-logo" />
        <Box className="home__header-wrapper">
          <Tabs 
            value={selectedTab} 
            onChange={(_, newValue) => setSelectedTab(newValue)} 
            aria-label="Movie Tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Movies" onClick={() => changeType("movie", 0)} />
            <Tab label="TV Series" onClick={() => changeType("series", 1)} />
            <Tab label="Episodes" onClick={() => changeType("episode", 2)} />
          </Tabs>
          <Search />
        </Box>
      </div>

      <div className="home__body">
        <MovieList />
      </div>
    </div>
  );
};

export default Home;