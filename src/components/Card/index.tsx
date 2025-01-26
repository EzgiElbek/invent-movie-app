import { Link } from "react-router-dom";
import "./style.scss";

interface CardProps {
    imdbID: string;
    name: string;
    year: string;
    poster: string;
    type: "movie" | "series" | "episode";
}

const Card = ({ imdbID, name, year, poster, type }: CardProps) => {

  return (
    <div className="card">
      <Link to={`/movie/${imdbID}`} className="card__wrapper">
        <img src={poster ? poster : "/placeholder.jpg"} alt={name} className="card__wrapper-img" />
        <div className="card__wrapper-info">
          <span className="card__wrapper-info-title">{name}</span>
          <span className="card__wrapper-info-year">{year}</span>
          <span className="card__wrapper-info-type">{type.toUpperCase()}</span>
        </div>
      </Link>
    </div>
  );
};

export default Card;
