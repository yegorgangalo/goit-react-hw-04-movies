import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import MovieList from '../../components/MovieList';
import { fetchTrendMoviesAPI } from '../../APIservice';
import s from './HomePage.module.css';
import { ImSpinner9 } from 'react-icons/im';
import Pagination from "react-js-pagination";

const { IDLE, PENDING, REJECTED, RESOLVED } = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
}

function HomePage() {
    const [status, setStatus] = useState(IDLE);
    const [error, setError] = useState('');
    const [movies, setMovies] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const currentPage = new URLSearchParams(location.search).get('p');

        // const currentPageNumber = Number(currentPage);
        // currentPageNumber && setActivePage(currentPageNumber);
        let currentPageNumber = Number(currentPage);
        currentPageNumber = currentPageNumber ? currentPageNumber : 1;
        setActivePage(currentPageNumber);

        setStatus(PENDING);
        //як правильніше? фетчити через currentPageNumber чи activePage? activePage робить лишній рендер і часом рендер не відбувається
        // fetchTrendMoviesAPI(activePage)
        fetchTrendMoviesAPI(currentPageNumber)
            .then(({ results, total_results }) => {
                if (!results.length) {
                    return Promise.reject(new Error(`Something wrong. Reload the page, please.`));
                }
                setMovies(results);
                setTotalMovies(total_results);
                setStatus(RESOLVED);
            })
            .catch(error => {
                setError(error);
                setStatus(REJECTED);
            })
    }, [location.search])
    // }, [location.search, activePage])

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        history.push({ ...location, search: `p=${pageNumber}` });
    }

    return (<main>
            {status===PENDING && <ImSpinner9 size="36" className={s.iconSpin} />}
            { status === RESOLVED &&
                <>
                    <h1 className={s.mainTitle}>Trend Movies</h1>
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
                </>
            }
            { status === REJECTED && <h1>{error.message}</h1> }
            </main>)
}

export default HomePage;