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
      <Link to={`/movie/${imdbID}`} className="card-link">
        <img src={poster ? poster : "/placeholder.jpg"} alt={name} className="card-img" />
        <div className="card-info">
          <span className="card-title">{name}</span>
          <span className="card-year">{year}</span>
          <span className="card-type">{type.toUpperCase()}</span>
        </div>
      </Link>
    </div>
  );
};

export default Card;
