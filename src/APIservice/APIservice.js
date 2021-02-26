import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '1b1c18abd6b8f6ca28c43d3db578a793';

export async function fetchTrendMoviesAPI (page=1) {
    const { data } = await axios.get(`/trending/movies/day?api_key=${API_KEY}&page=${page}`);
    return data;
}

export async function fetchQueryMoviesAPI(query, page = 1) {
    const { data } = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return data;
}

export async function fetchMovieDetailsAPI(movieID) {
    const { data } = await axios.get(`/movie/${movieID}?api_key=${API_KEY}`);
    return data;
}

export async function fetchMovieCastAPI(movieID) {
    const { data } = await axios.get(`/movie/${movieID}/credits?api_key=${API_KEY}`);
    return data;
}

export async function fetchMovieReviewsAPI(movieID) {
    const { data } = await axios.get(`/movie/${movieID}/reviews?api_key=${API_KEY}`);
    return data;
}

export async function fetchMovieTrailerAPI(movieID) {
    const { data } = await axios.get(`/movie/${movieID}/videos?api_key=${API_KEY}`);
    return data;
}

// const { BASE_URL, API_KEY } = {
//     BASE_URL: 'https://api.themoviedb.org/3',
//     API_KEY: '1b1c18abd6b8f6ca28c43d3db578a793',
// }

// export function fetchTrendMoviesAPI (page=1) {
//     const url = `${BASE_URL}/trending/movies/day?api_key=${API_KEY}&page=${page}`;
//     return fetch(url)
//         .then(response => {
//             return response.ok ?
//                 response.json() :
//                 Promise.reject(new Error(`There are no trend movies`));
//         })
// }

// export function fetchQueryMoviesAPI (query, page=1) {
//     const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
//     return fetch(url)
//         .then(response => {
//             return response.ok ?
//                 response.json() :
//                 Promise.reject(new Error(`There is no movie with this name`));
//         })
// }

// export function fetchMovieDetailsAPI (movieID) {
//     const url = `${BASE_URL}/movie/${movieID}?api_key=${API_KEY}`;
//     return fetch(url)
//         .then(response => {
//             return response.ok ?
//                 response.json() :
//                 Promise.reject(new Error(`There are no details about this movie`));
//         })
// }

// export function fetchMovieCastAPI (movieID) {
//     const url = `${BASE_URL}/movie/${movieID}/credits?api_key=${API_KEY}`;
//     return fetch(url)
//         .then(response => {
//             return response.ok ?
//                 response.json() :
//                 Promise.reject(new Error(`There is no info about casts`));
//         })
// }

// export function fetchMovieReviewsAPI (movieID) {
//     const url = `${BASE_URL}/movie/${movieID}/reviews?api_key=${API_KEY}`;
//     return fetch(url)
//         .then(response => {
//             return response.ok ?
//                 response.json() :
//                 Promise.reject(new Error(`There are no reviews`));
//         })
// }

// export function fetchMovieTrailerAPI (movieID) {
//     const url = `${BASE_URL}/movie/${movieID}/videos?api_key=${API_KEY}`;
//     return fetch(url)
//         .then(response => {
//             return response.ok ?
//                 response.json() :
//                 Promise.reject(new Error(`There are no reviews`));
//         })
// }