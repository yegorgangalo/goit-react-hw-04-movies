import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList';
import { fetchTrendMoviesAPI } from '../../APIservice';
import s from './HomePage.module.css';
import { ImSpinner9 } from 'react-icons/im';
// import Pagination from "react-js-pagination";

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
    // const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        setStatus(PENDING);
        fetchTrendMoviesAPI()
            .then(({ results }) => {
                if (!results.length) {
                    return Promise.reject(new Error(`Something wrong. Reload the page, please.`));
                }
                setMovies(results);
                setStatus(RESOLVED);
            })
            .catch(error => {
                setError(error);
                setStatus(REJECTED);
            })
    }, [])

//     function handlePageChange(pageNumber) {
//         console.log(`active page is ${pageNumber}`);
//         setActivePage(pageNumber);
//   }

    return (<>
            {status===PENDING && <ImSpinner9 size="36" className={s.iconSpin} />}
            { status === RESOLVED &&
                <>
                    <h1 className={s.mainTitle}>Trend Movies</h1>
                    <MovieList movies={movies} />
                    {/* <Pagination
                      activePage={activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={450}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange}
                    /> */}
                </>
            }
            { status === REJECTED && <h1>{error.message}</h1> }
            </>)
}

export default HomePage;