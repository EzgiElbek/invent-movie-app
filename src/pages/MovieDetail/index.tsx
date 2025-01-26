import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchMovieDetails } from "../../redux/movieSlice";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../../components/Loading";
import "./style.scss";

const MovieDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const movieDetail = useSelector((state: RootState) =>
    state.movies.movies.find((m) => m.imdbID === id)
  );

  useEffect(() => {
    if (id) {
      setLoading(true); 
      dispatch(fetchMovieDetails(id)).finally(() => {
        setLoading(false);
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!movieDetail) {
      console.log(movieDetail)
      navigate("/");
    }
  }, [movieDetail, navigate]);

  return (
    <div>
      {movieDetail && 
        <div className="detail">
          {loading && <Loading />}
          <div className="detail__header">
            <img src="./../assets/logo.png" alt="logo" />
          </div>
          <div className="detail__body">
            <div className="detail__body-button">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/")}
                className="back-button"
              >
                Back to Home
              </Button>
            </div>
            <div className="detail__body-wrapper">
              <div className="detail__body-wrapper-header">
                <img src={movieDetail.Poster} alt={movieDetail.Title} width={300} height={500} className="detail__body-wrapper-header-logo"/>
                <div>
                  <span className="detail__body-wrapper-header-text">{movieDetail.Title}</span>
                  <div className="detail__body-wrapper-body">
                    <span className="detail__body-wrapper-body-text">Time:</span>
                    <span className="detail__body-wrapper-body-subtext">{movieDetail.Runtime}</span>
                  </div>

                  <div className="detail__body-wrapper-body">
                    <span className="detail__body-wrapper-body-text">Type:</span>
                    <span className="detail__body-wrapper-body-subtext">{movieDetail.Genre}</span>
                  </div>

                  <div className="detail__body-wrapper-body">
                    <span className="detail__body-wrapper-body-text">Director:</span>
                    <span className="detail__body-wrapper-body-subtext">{movieDetail.Director}</span>
                  </div>

                  <div className="detail__body-wrapper-body">
                    <span className="detail__body-wrapper-body-text">Actors:</span>
                    <span className="detail__body-wrapper-body-subtext">{movieDetail.Actors}</span>
                  </div>

                  <div className="detail__body-wrapper-body">
                    <span className="detail__body-wrapper-body-text">IMDb Rating:</span>
                    <span className="detail__body-wrapper-body-subtext">{movieDetail.imdbRating}</span>
                  </div>

                  <div className="detail__body-wrapper-body">
                    <span className="detail__body-wrapper-body-text">Summary:</span>
                    <span className="detail__body-wrapper-body-subtext">{movieDetail.Plot}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>

  );
};

export default MovieDetail;
