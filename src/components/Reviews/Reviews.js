import { useEffect, useState } from 'react';
// import { Link, useParams, Route, useRouteMatch } from 'react-router-dom';
import { fetchMovieReviewsAPI } from '../../APIservice';
import s from './Reviews.module.css';

// const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w185';

function Reviews({moviesId}) {
    const [reviews, setReviews] = useState('');
    const [error, setError] = useState('');
    // console.log(reviews);

    useEffect(() => {
        fetchMovieReviewsAPI(moviesId)
            .then(({results}) => setReviews(results))
            .catch(error=>setError(error));
    }, [moviesId])

    return (<>
            {reviews && (
                <ul className={s.reviewsList}>
                    {reviews.map(({author_details: {name, username}, content, id}) =>
                        <li key={id+content}  className={s.reviewsItem}>
                            <h4> {name ? name : username} </h4>
                            <p className={s.avatar}> {content} </p>
                        </li>
                )}
            </ul>)}
            {error && (<h2>{error.message}</h2>)}
        </>)
}

export default Reviews;