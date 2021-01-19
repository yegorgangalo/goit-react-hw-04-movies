import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList';
import { fetchQueryMoviesAPI } from '../../APIservice';
import {DebounceInput} from 'react-debounce-input';
import s from './MoviesPage.module.css';
import { toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';

const { IDLE, PENDING, REJECTED, RESOLVED } = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
}

function MoviesPage() {
    const [status, setStatus] = useState(IDLE);
    const [inputQuery, setInputQuery] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if(!inputQuery){return}
        setStatus(PENDING);
        fetchQueryMoviesAPI(inputQuery)
            .then(({ results }) => {
            if (!results.length) {
                  return Promise.reject(new Error(`There is no movie with name: ${inputQuery}`));
              }
            setMovies(results);
            setStatus(RESOLVED);
          })
            .catch(error => {
                toast.warn(error.message);
                setStatus(REJECTED);
            })
    }, [inputQuery])

    const handleInputChange = ({ target }) => setInputQuery(target.value);

        return (
            <>
                <DebounceInput
                    debounceTimeout={500}
                    className={s.searchInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies"
                    value={inputQuery}
                    onChange={handleInputChange}
                />
                {status===PENDING && <ImSpinner9 size="36" className={s.iconSpin} />}
                {status === RESOLVED && <MovieList movies={movies} />}
            </>)

}

export default MoviesPage;