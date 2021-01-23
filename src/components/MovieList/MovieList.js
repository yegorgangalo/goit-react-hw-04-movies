import s from './MovieList.module.css';
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import slugify from 'slugify';

const slugOptions = { lower: true, strict: true };
const slug = (string) => slugify(string, slugOptions);

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

function MovieList({ movies }) {
    const location = useLocation();
    const label = location.pathname === "/" ? "Back to Home" : "Back to Movies";

    return (
        <ul className={s.movieList}>
            {movies.map(({ id, title, name, poster_path }) =>
                poster_path &&
                <li key={id} className={s.movieItem}>
                    <Link to={{
                        pathname: `/movies/${slug(`${id} ${title ? title : name}`)}`,
                        state: {
                            from: location,
                            label: label,
                        }
                    }}
                        // onClick={() => localStorage.setItem("movieId", id)}
                    >
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