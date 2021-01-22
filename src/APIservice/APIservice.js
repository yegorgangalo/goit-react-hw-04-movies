const { BASE_URL, API_KEY } = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: '1b1c18abd6b8f6ca28c43d3db578a793',
}

export function fetchTrendMoviesAPI (page=1) {
    const url = `${BASE_URL}/trending/movies/day?api_key=${API_KEY}&page=${page}`;
    return fetch(url)
        .then(response => {
            return response.ok ?
                response.json() :
                Promise.reject(new Error(`There are no trend movies`));
        })
}

export function fetchQueryMoviesAPI (query, page=1) {
    // const url = `${BASE_URL}/search/movie/?api_key=${API_KEY}&query=${query}&page=${page}`;
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=1b1c18abd6b8f6ca28c43d3db578a793&query=${query}&${page}`)
        .then(response => {
            return response.ok ?
                response.json() :
                Promise.reject(new Error(`There is no movie with this name`));
        })
}

export function fetchMovieDetailsAPI (movieID) {
    const url = `${BASE_URL}/movie/${movieID}?api_key=${API_KEY}`;
    return fetch(url)
        .then(response => {
            return response.ok ?
                response.json() :
                Promise.reject(new Error(`There are no details about this movie`));
        })
}

export function fetchMovieCastAPI (movieID) {
    const url = `${BASE_URL}/movie/${movieID}/credits?api_key=${API_KEY}`;
    return fetch(url)
        .then(response => {
            return response.ok ?
                response.json() :
                Promise.reject(new Error(`There is no info about casts`));
        })
}

export function fetchMovieReviewsAPI (movieID) {
    const url = `${BASE_URL}/movie/${movieID}/reviews?api_key=${API_KEY}`;
    return fetch(url)
        .then(response => {
            return response.ok ?
                response.json() :
                Promise.reject(new Error(`There are no reviews`));
        })
}