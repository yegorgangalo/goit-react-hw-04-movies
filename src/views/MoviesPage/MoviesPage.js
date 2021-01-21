import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import MovieList from '../../components/MovieList';
import { fetchQueryMoviesAPI } from '../../APIservice';
import {DebounceInput} from 'react-debounce-input';
import s from './MoviesPage.module.css';
import { toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';
import Pagination from "react-js-pagination";

const { IDLE, PENDING, REJECTED, RESOLVED } = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
}

function MoviesPage() {
    const [status, setStatus] = useState(IDLE);
    const [movies, setMovies] = useState([]);
    const [activePage, setActivePage] = useState(1);

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (!query) {
        return
    }
    setStatus(PENDING);
    fetchMovieByQuery(query, activePage);
  }, [location.search, activePage]);

    const fetchMovieByQuery = (value, page) => {
        fetchQueryMoviesAPI(value, page)
            .then(({ results }) => {
            if (!results.length) {
                  return Promise.reject(new Error(`There is no movie with name: ${value}`));
              }
            setMovies(results);
            setStatus(RESOLVED);
          })
            .catch(error => {
                toast.warn(error.message);
                setStatus(REJECTED);
            })
    }

    const handleInputChange = ({ target }) => {
        history.push({ ...location, search: `q=${target.value}` });
    }

    function handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    }

        return (
            <>
                <DebounceInput
                    debounceTimeout={500}
                    className={s.searchInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies"
                    onChange={handleInputChange}
                />
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={450}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                />
                {status===PENDING && <ImSpinner9 size="36" className={s.iconSpin} />}
                {status === RESOLVED && <MovieList movies={movies} />}
            </>)

}

export default MoviesPage;