import { useEffect, useState, lazy, Suspense } from 'react';
import { Link, NavLink, useParams, Route, useRouteMatch , useLocation } from 'react-router-dom';
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

    const { slug } = useParams();
    const { url, path } = useRouteMatch();

    // const history = useHistory();
    const location = useLocation();

    const moviesId = slug.match(/[a-z0-9]+/)[0];
    // const moviesId = localStorage.getItem("movieId");

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
        <main style={{alignItems:"start"}}>
            {/* <button type="button"
                onClick={ () => history.push(location?.state?.from || '/')}
                className={s.btnGoBack}>{location?.state?.label ?? "Go Home"}</button> */}
            <Link to={location?.state?.from || '/'} className={s.btnGoBack}>
            {location?.state?.label ?? "Go Home"}
            </Link>

            {status === PENDING && <ImSpinner9 size="36" className={s.iconSpin} />}
            {status === REJECTED && <h1>{error.message}</h1>}

            {status===RESOLVED && (
                <>
                <MovieDetails movieDetails={movieDetails}/>
                <section className={s.sectionAdditionalInfo}>
                        <h3>Additional information</h3>
                        <li>
                          <NavLink to={{ pathname: `${url}/cast`, state: { from: location?.state?.from, label: location?.state?.label }}}>
                            Cast
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={{ pathname: `${url}/reviews`, state: { from: location?.state?.from, label: location?.state?.label  }}}>
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
            </>
            )}
        </main>)
}

export default MovieDetailsView;