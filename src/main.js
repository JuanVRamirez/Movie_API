const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        "api_key": API_KEY,
    }
});

async function getTrendingMoviesPreview(){
    const {data} = await api("/trending/movie/day")
    const content = null || document.getElementById("popular_movies__cards")
    const movies = data.results

    let view = `${movies.map(movie => `
    <article class="card">
                <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="">
                <p class="movie_title">${movie.title}</p>
                <div class="cards_icons">
                    <p>${movie.vote_average}</p>
                    <div>
                        <a href="">
                            <svg width="34" height="21" viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.65" d="M17.0411 6.59255C20.8939 6.59255 24.0174 9.70588 24.0174 13.5463C24.0174 17.3868 20.8939 20.5 17.0411 20.5C13.1882 20.5 10.0648 17.3868 10.0648 13.5463C10.0648 9.70588 13.1882 6.59255 17.0411 6.59255ZM17.0411 0.5C25.0874 0.5 32.0333 5.97609 33.9605 13.6502C34.136 14.3487 33.7101 15.0568 33.0093 15.2317C32.3084 15.4064 31.5982 14.982 31.4227 14.2834C29.7852 7.76311 23.8802 3.10765 17.0411 3.10765C10.199 3.10765 4.29207 7.76711 2.65745 14.2914C2.48242 14.9899 1.77233 15.4147 1.07144 15.2404C0.370553 15.0658 -0.0557334 14.3581 0.119302 13.6594C2.04317 5.9808 8.99128 0.5 17.0411 0.5Z" fill="#F34096"/>
                                </svg>
                        </a>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.65" d="M10.9865 0.982403C11.6056 -0.327461 13.3944 -0.327474 14.0135 0.982403L16.9614 7.21948L23.5531 8.21964C24.9374 8.42969 25.4902 10.2061 24.4885 11.2257L19.7186 16.0805L20.8447 22.9358C21.0811 24.3755 19.634 25.4734 18.3958 24.7936L12.5 21.557L6.6042 24.7936C5.36601 25.4734 3.91886 24.3755 4.15533 22.9358L5.28134 16.0805L0.511531 11.2257C-0.49019 10.2061 0.062573 8.42969 1.44692 8.21964L8.03862 7.21948L10.9865 0.982403Z" fill="#FBD757"/>
                                </svg>
                        </a>
                    </div>
                </div>
    </article>
    `).slice(0, 20).join("")}
    `;
    content.innerHTML = view;
}
async function getTrendingSeriesPreview(){
    const {data} = await api("/trending/tv/day")

    const content = null || document.getElementById("popular_series__cards")
    const series = data.results
    console.log(series[0].name)
    let view = `${series.map(serie => `
    <article class="card">
                <img src="https://image.tmdb.org/t/p/w300${serie.poster_path}" alt="">
                <p class="movie_title">${serie.name}</p>
                <div class="cards_icons">
                    <p>${serie.vote_average}</p>
                    <div>
                        <a href="">
                            <svg width="34" height="21" viewBox="0 0 34 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.65" d="M17.0411 6.59255C20.8939 6.59255 24.0174 9.70588 24.0174 13.5463C24.0174 17.3868 20.8939 20.5 17.0411 20.5C13.1882 20.5 10.0648 17.3868 10.0648 13.5463C10.0648 9.70588 13.1882 6.59255 17.0411 6.59255ZM17.0411 0.5C25.0874 0.5 32.0333 5.97609 33.9605 13.6502C34.136 14.3487 33.7101 15.0568 33.0093 15.2317C32.3084 15.4064 31.5982 14.982 31.4227 14.2834C29.7852 7.76311 23.8802 3.10765 17.0411 3.10765C10.199 3.10765 4.29207 7.76711 2.65745 14.2914C2.48242 14.9899 1.77233 15.4147 1.07144 15.2404C0.370553 15.0658 -0.0557334 14.3581 0.119302 13.6594C2.04317 5.9808 8.99128 0.5 17.0411 0.5Z" fill="#F34096"/>
                                </svg>
                        </a>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.65" d="M10.9865 0.982403C11.6056 -0.327461 13.3944 -0.327474 14.0135 0.982403L16.9614 7.21948L23.5531 8.21964C24.9374 8.42969 25.4902 10.2061 24.4885 11.2257L19.7186 16.0805L20.8447 22.9358C21.0811 24.3755 19.634 25.4734 18.3958 24.7936L12.5 21.557L6.6042 24.7936C5.36601 25.4734 3.91886 24.3755 4.15533 22.9358L5.28134 16.0805L0.511531 11.2257C-0.49019 10.2061 0.062573 8.42969 1.44692 8.21964L8.03862 7.21948L10.9865 0.982403Z" fill="#FBD757"/>
                                </svg>
                        </a>
                    </div>
                </div>
    </article>
    `).slice(0, 20).join("")}
    `;
    content.innerHTML = view;
}
async function getGenresMoviesPreview(){
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY)
    const data = await res.json()

    const content = null || document.getElementById("movie_genres__cards")
    const genres = data.genres
    

    let view = `${genres.map(genre => `
    <article class="movie_genres_image" id="id${genre.id}">
                <p>${genre.name}</p>
            </article>
    `).slice(0, 20).join("")}
    `;
    content.innerHTML = view;
}
