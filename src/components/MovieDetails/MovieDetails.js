import s from './MovieDetails.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetails({ movieDetails }) {
    const { poster_path, title, name, overview, genres, vote_average, release_date } = movieDetails;
    const releaseYear = release_date.split('-')[0];

    return (<section className={s.sectionMainInfo}>
                <img src={poster_path && `${BASE_IMG_URL}${poster_path}`} alt={title} className={s.poster}/>
                <div className={s.blockInfo}>
                    <h2 className={s.movieTitle}> {`${title ? title : name} (${releaseYear})`} </h2>
                    <p>User Score: {`${Number(vote_average)*10}%`}</p>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                    <h3>Genres</h3>
                    <ul className={s.genres}>
                        {genres.map( ({id, name}) =>
                            <li key={id}>{name}</li>
                        )}
                    </ul>
                </div>
                </section>)
}

export default MovieDetails;