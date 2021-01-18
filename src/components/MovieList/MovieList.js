import s from './MovieList.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieList({movies}) {
    return (
        <ul className={s.movieList}>
            {movies.map(({id, title, name, poster_path}) =>
                <li key={id}  className={s.movieItem}>
                    <img src={`${BASE_IMG_URL}${poster_path}`} alt={title} />
                    <h2  className={s.movieTitle}>
                    {title ? title : name}
                    </h2>
                </li>
            )}
        </ul>
    )
}