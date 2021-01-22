import { useEffect, useState } from 'react';
import { fetchMovieCastAPI } from '../../APIservice';
import s from './Cast.module.css';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w185';

function Cast({moviesId}) {
    const [cast, setCast] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMovieCastAPI(moviesId)
            .then(({ cast }) => {
                return cast.length ?
                    setCast(cast) :
                    Promise.reject(new Error('There are no casts'));
            })
            .catch(error=>setError(error));
    }, [moviesId])

    return (
        <>
            {cast && (<ul className={s.castList}>
                {cast.map(({character, name, profile_path, id}) =>
                    profile_path &&
                        (<li key={id+profile_path}  className={s.castItem}>
                            <img src={`${BASE_IMG_URL}${profile_path}`} alt={name} />
                            <h4> {name} </h4>
                            <h5> {`Character: ${character}`} </h5>
                        </li>)

                )}
            </ul>)}
            {error && (<h2>{error.message}</h2>)}
        </>
    )
}

export default Cast;