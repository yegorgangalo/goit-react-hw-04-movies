import { useEffect, useState } from 'react';
import { NavLink, useParams, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { fetchMovieDetailsAPI } from '../../APIservice';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
import s from './MovieDetailsView.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetailsView() {
    const [movieDetails, setMovieDetails] = useState('');
    const [error, setError] = useState('');
    const { moviesId } = useParams();
    const { url, path } = useRouteMatch();
    const history = useHistory();


    useEffect(() => {
        fetchMovieDetailsAPI(moviesId)
            .then(movieInfo => setMovieDetails(movieInfo))
            .catch(error=>setError(error));
    }, [moviesId])

    const { poster_path, title, name, overview, genres, vote_average, release_date } = movieDetails;
    const releaseYear = release_date ? release_date.split('-')[0] : false;

    return (
        <main>
            <button type="button"
                onClick={history.goBack}
                className={s.btnGoBack}>Go Back</button>
            {movieDetails && (
                <>
                <section className={s.sectionMainInfo}>
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
                </section>
                <section className={s.sectionAdditionalInfo}>
                        <h3>Additional information</h3>
                        <ul>
                            <li><NavLink to={`${url}/cast`}>Cast</NavLink></li>
                            <li><NavLink to={`${url}/reviews`}>Reviews</NavLink></li>
                        </ul>
                </section>
                </>
            )}
            {error && (<h2>{error.message}</h2>)}
            <Route path={`${path}/cast`}>
                <Cast moviesId={moviesId}/>
            </Route>
            <Route path={`${path}/reviews`}>
                <Reviews moviesId={moviesId}/>
            </Route>
        </main>)
}

export default MovieDetailsView;