import { useEffect, useState, lazy, Suspense } from 'react';
import { NavLink, useParams, Route, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import { fetchMovieDetailsAPI } from '../../APIservice';
import s from './MovieDetailsView.module.css';
import MovieDetails from '../../components/MovieDetails';
const Cast = lazy(() => import('../../components/Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() => import('../../components/Reviews' /* webpackChunkName: "reviews" */));

const { IDLE, PENDING, REJECTED, RESOLVED } = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
}

function MovieDetailsView() {
    const [status, setStatus] = useState(IDLE);
    const [movieDetails, setMovieDetails] = useState('');
    const [error, setError] = useState('');

    const { moviesId } = useParams();
    const { url, path } = useRouteMatch();

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        setStatus(PENDING);
        fetchMovieDetailsAPI(moviesId)
            .then(movieInfo => {
                if (!movieInfo) {
                    return Promise.reject(new Error(`Something wrong. Reload the page, please.`));
                }
                setMovieDetails(movieInfo);
                setStatus(RESOLVED);
            })
            .catch(error => {
                setError(error);
                setStatus(REJECTED);
            })
    }, [moviesId])

    return (
        <main>

            {status === PENDING && <ImSpinner9 size="36" className={s.iconSpin} />}
            {status === REJECTED && <h1>{error.message}</h1> }
            {status===RESOLVED && (
                <div className={s.box}>
                <button type="button"
                onClick={ () => history.push(location?.state?.from || '/')}
                className={s.btnGoBack}>Go Back</button>
                <MovieDetails movieDetails={movieDetails}/>
                <section className={s.sectionAdditionalInfo}>
                        <h3>Additional information</h3>
                        <li>
                          <NavLink to={{ pathname: `${url}/cast`, state: { from: location?.state?.from }}}>
                            Cast
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={{ pathname: `${url}/reviews`, state: { from: location?.state?.from }}}>
                            Reviews
                          </NavLink>
                        </li>
                </section>

                <Suspense fallback={<span>Loading...</span>}>
                    <Route path={`${path}/cast`}>
                        <Cast moviesId={moviesId}/>
                    </Route>
                    <Route path={`${path}/reviews`}>
                        <Reviews moviesId={moviesId}/>
                    </Route>
                </Suspense>
            </div>
            )}
        </main>)
}

export default MovieDetailsView;