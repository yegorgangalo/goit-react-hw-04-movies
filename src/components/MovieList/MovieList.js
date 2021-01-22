import s from './MovieList.module.css';
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

function MovieList({ movies }) {
    const location = useLocation();

    return (
        <ul className={s.movieList}>
            {movies.map(({ id, title, name, poster_path }) =>
                poster_path &&
                <li key={id} className={s.movieItem}>
                    <Link to={{pathname:`/movies/${id}`, state: {from: location}}}>
                        <img src={`${BASE_IMG_URL}${poster_path}`} alt={title} />
                        <h2  className={s.movieTitle}>
                            {title ? title : name}
                        </h2>
                    </Link>
                </li>
            )}
        </ul>
    )
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;