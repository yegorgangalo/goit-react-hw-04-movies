import { useEffect, useState } from 'react';
import { fetchMovieTrailerAPI } from '../../APIservice';
import s from './Trailer.module.css';
import Modal from 'components/Modal';
import {IoLogoYoutube} from 'react-icons/io';

const YOUTUBE_URL = 'https://www.youtube.com//embed/';

export default function Trailer({moviesId}) {
    const [trailerArray, setTrailerArray] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchMovieTrailerAPI(moviesId)
            .then(({ results }) => {
                console.log(results[0]);
                return results.length ?
                    setTrailerArray(results) :
                    Promise.reject(new Error('There are no trailers'));
            })
            .catch(error=>setError(error));
    }, [moviesId])

    const toggleModal = () => {
      setShowModal(value => !value);
    }

    return (
        <>
            {trailerArray && (<ul className={s.trailerList}>
                {trailerArray.map(({id, key, name}) =>
                    key &&
                        (<li key={id+key}  className={s.trailerItem}>
                        <div type="button" onClick={toggleModal} className={s.trailerBlock}>
                            <IoLogoYoutube/>
                        </div>
                        <h3 className={s.trailerName}>{name}</h3>
                        {showModal && (<Modal onClose={toggleModal}>
                            <iframe
                                title={name}
                                width="100%"
                                height="100%"
                                src={YOUTUBE_URL+key}
                                frameBorder="0"
                                allowFullScreen
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </Modal>)}
                        </li>)

                )}
            </ul>)}
            {error && (<h2>{error.message}</h2>)}
        </>
    )
}