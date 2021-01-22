import { useEffect, useState } from 'react';
import { fetchMovieReviewsAPI } from '../../APIservice';
import s from './Reviews.module.css';

function Reviews({moviesId}) {
    const [reviews, setReviews] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMovieReviewsAPI(moviesId)
            .then(({results}) => {
            return results.length ?
                setReviews(results) :
                Promise.reject(new Error(`There are no reviews`));
        })
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