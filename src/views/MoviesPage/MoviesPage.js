import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList';
import { fetchQueryMoviesAPI } from '../../APIservice';
import {DebounceInput} from 'react-debounce-input';
import s from './MoviesPage.module.css';
import { toast } from 'react-toastify';

function MoviesPage() {
    const [inputQuery, setInputQuery] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        inputQuery && fetchQueryMoviesAPI(inputQuery)
            .then(({ results }) => results.length ?
                setMovies(results) :
                toast.warn('There is no movie with this name'));
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
            {movies && <MovieList movies={movies}/>}
        </>)
}

export default MoviesPage;