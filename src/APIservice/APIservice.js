const { BASE_URL, API_KEY } = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: '1b1c18abd6b8f6ca28c43d3db578a793',
}

export function fetchTrendMoviesAPI () {
    const url = `${BASE_URL}/trending/movies/day?api_key=${API_KEY}`;
    return fetch(url)
        .then(response => {
            return response.ok ?
                response.json() :
                Promise.reject(new Error(`There is no trend movies`));
        })
}

export function fetchQueryMoviesAPI (query) {
    const url = `${BASE_URL}/search/movie/?api_key=${API_KEY}&query=${query}`;
    return fetch(url)
        .then(response => {
            return response.ok ?
                response.json() :
                Promise.reject(new Error(`There is no trend movies`));
        })
}