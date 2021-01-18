import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList';
import { fetchTrendMoviesAPI } from '../../APIservice';
import s from './HomePage.module.css';

function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchTrendMoviesAPI()
            .then(({ results }) => setMovies(results))
            .catch(error => console.log(error));
    }, [])

    return (
        <>
            <h1 className={s.mainTitle}>Trend Movies</h1>
            <MovieList movies={movies}/>
        </>)
}

export default HomePage;