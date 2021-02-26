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
    const [totalMovies, setTotalMovies] = useState(0);
    const [inputQuery, setInputQuery] = useState('');

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (!query) {
        return
    }
    const currentPage = new URLSearchParams(location.search).get('p');
    const currentPageNumber = Number(currentPage);
    setActivePage(currentPageNumber);
    setStatus(PENDING);
    fetchMovieByQuery(query, currentPageNumber);
    //як правильніше? через currentPageNumber чи activePage?
    // fetchMovieByQuery(query, activePage);
    // }, [location.search, activePage]);
    }, [location.search]);

    const fetchMovieByQuery = (value, page) => {
        fetchQueryMoviesAPI(value, page)
            .then(({ results, total_results }) => {
            if (!results.length) {
                  return Promise.reject(new Error(`There is no movie with name: ${value}`));
              }
            setMovies(results);
            setTotalMovies(total_results);
            setStatus(RESOLVED);
          })
            .catch(error => {
                toast.warn(error.message);
                setStatus(REJECTED);
            })
    }

    const handleInputChange = ({ target }) => {
        setInputQuery(target.value);
        history.push({ ...location, search: `q=${target.value}&p=${activePage}` });
    }

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        const query = inputQuery ? inputQuery : new URLSearchParams(location.search).get('q');
        history.push({ ...location, search: `q=${query}&p=${pageNumber}` });
    }

        return (
            <main>
                <DebounceInput
                    debounceTimeout={500}
                    className={s.searchInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies"
                    onChange={handleInputChange}
                />
                {status===PENDING && <ImSpinner9 size="36" className={s.iconSpin} />}
                {status === RESOLVED && (<>
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={20}
                      totalItemsCount={totalMovies}
                      pageRangeDisplayed={10}
                      onChange={handlePageChange}
                    />
                    <MovieList movies={movies} />
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={20}
                      totalItemsCount={totalMovies}
                      pageRangeDisplayed={10}
                      onChange={handlePageChange}
                    />
                </>)}
            </main>)

}

export default MoviesPage;