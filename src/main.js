let lang = "en";

languageBtn.addEventListener('change', () => {
    lang = languageBtn.value;
    api.defaults.params['language'] = lang;
    
    switch (languageBtn.value) {
        case 'en':
            popularMoviesTitle.innerHTML = 'Trending Movies';
            movieSubTitle.innerHTML = "Related Movies"
            pinkButtons.forEach(button => {
                button.textContent = 'See more';
            });
            movieGenresTitle.innerHTML = 'Categories';
            popularSeriesTitle.innerHTML = 'Trending Series';
            likedTitle.innerHTML = "Favorites";
            categoryTitle.innerHTML = "Explore"
            break;
        case 'fr':
            popularMoviesTitle.innerHTML = 'Films en tendance';
            pinkButtons.forEach(button => {
                button.textContent = 'Voir plus';
            });
            movieGenresTitle.innerHTML = 'Catégories';
            popularSeriesTitle.innerHTML = 'Séries tendances';
            likedTitle.innerHTML = "Favoris";
            movieSubTitle.innerHTML = "Films connexes";
            categoryTitle.innerHTML = "Explorer"
            break;
        case 'pt-BR':
            popularMoviesTitle.innerHTML = 'Filmes em Destaque';
            pinkButtons.forEach(button => {
                button.textContent = 'Ver mais';
            });
            movieGenresTitle.innerHTML = 'Categorias';
            popularSeriesTitle.innerHTML = 'Séries em Destaque';
            likedTitle.innerHTML = "Favoritos";
            movieSubTitle.innerHTML = "Filmes Relacionados";
            categoryTitle.innerHTML = "Explorar"
            break;
        case 'es':
            popularMoviesTitle.innerHTML = 'Películas Populares';
            pinkButtons.forEach(button => {
                button.textContent = 'Ver más';
            });
            movieGenresTitle.innerHTML = 'Categorías';
            popularSeriesTitle.innerHTML = 'Series Populares';
            likedTitle.innerHTML = "Favoritas";
            movieSubTitle.innerHTML = "Películas Relacionadas";
            categoryTitle.innerHTML = "Explorar"
            break;
    }

    if(location.hash.startsWith("#home")){
        homePage();
    } else if (location.hash.startsWith("#movie")){
        movieDetailsPage()
    } else if(location.hash.startsWith("#serie")){
        serieDetailsPage()
    } else if(location.hash.startsWith("#category")){
        categoriesPage()
    } else if(location.hash.startsWith("#trends=movies")){
        trendsMoviesPage()
    } else if(location.hash.startsWith("#trends=series")){
        trendsSeriesPage()
    }
})


const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        "api_key": API_KEY,
        "language": lang,
    }
});

function likedMoviesList (){
    const item = JSON.parse(localStorage.getItem("liked_items"));
    let movies;

    if (item && Object.keys(item).length > 0) {
        movies = item;
        if (location.hash.startsWith("#home")){
            document.getElementById("liked").classList.remove("inactive");
        }
    } else {
        movies = {};
        document.getElementById("liked").classList.add("inactive");
    }

    return movies;
}

function likedMovie(movie) {
    // movie.id
    const likedMovies = likedMoviesList();
  
    console.log(likedMovies)
    
    if (likedMovies[movie.id]) {
      likedMovies[movie.id] = undefined;
    } else {
      likedMovies[movie.id] = movie;
    }
  
    localStorage.setItem('liked_items', JSON.stringify(likedMovies));
  }

function likedSeriesList (){
    const item = JSON.parse(localStorage.getItem("liked_items"));
    let series;

    if (item && Object.keys(item).length > 0) {
        series = item;
        if (location.hash.startsWith("#home")){
            document.getElementById("liked").classList.remove("inactive");
        }
    } else {
        series = {};
        document.getElementById("liked").classList.add("inactive");
    }

    return series;
}

function likedSerie(serie) {
    const likedSeries = likedSeriesList();
  
    console.log(likedSeries)
    
    if (likedSeries[serie.id]) {
      likedSeries[serie.id] = undefined;
    } else {
      likedSeries[serie.id] = serie;
    }
  
    localStorage.setItem('liked_items', JSON.stringify(likedSeries));
  }
// Utils

function createMovies (movies, container, clean = true){
   if (clean){
    container.innerHTML = "";
   }

   movies.forEach(movie => {
        if (movie.poster_path && movie.vote_average !== 0) { 
            const card = document.createElement('article');
            card.classList.add('card');
            card.dataset.movieId = movie.id;
          
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
            img.alt = '';
            img.addEventListener('click', () => {
                location.hash ="#movie=" + movie.id
            });
          
            const likedBtn = document.createElement("button")
            likedBtn.classList.add ("likedBtn")
            likedMoviesList()[movie.id] && likedBtn.classList.add('likedBtn--active');
            likedBtn.addEventListener("click", () => {
                likedBtn.classList.toggle("likedBtn--active")
                likedMovie(movie)
                getLikedMovies()
                if(location.hash.startsWith("#home")){
                    homePage()
                }
            })

            const title = document.createElement('p');
            title.classList.add('movie_title');
            title.textContent = movie.title || movie.name;
          
            const iconsContainer = document.createElement('div');
            iconsContainer.classList.add('cards_icons');
          
            const svgContainer = document.createElement("div")

            const rating = document.createElement('p');
            rating.textContent = movie.vote_average;
          
            const link1 = document.createElement('a');
            link1.href = '#'; 
            const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg1.setAttribute("width", "34")
            svg1.setAttribute("height", "21")
            svg1.setAttribute("viewBox", "0 0 34 21")
            svg1.setAttribute("fill", "none")
        
            const svg1Content = ` <path opacity="0.65" d="M17.0411 6.59255C20.8939 6.59255 24.0174 9.70588 24.0174 13.5463C24.0174 17.3868 20.8939 20.5 17.0411 20.5C13.1882 20.5 10.0648 17.3868 10.0648 13.5463C10.0648 9.70588 13.1882 6.59255 17.0411 6.59255ZM17.0411 0.5C25.0874 0.5 32.0333 5.97609 33.9605 13.6502C34.136 14.3487 33.7101 15.0568 33.0093 15.2317C32.3084 15.4064 31.5982 14.982 31.4227 14.2834C29.7852 7.76311 23.8802 3.10765 17.0411 3.10765C10.199 3.10765 4.29207 7.76711 2.65745 14.2914C2.48242 14.9899 1.77233 15.4147 1.07144 15.2404C0.370553 15.0658 -0.0557334 14.3581 0.119302 13.6594C2.04317 5.9808 8.99128 0.5 17.0411 0.5Z" fill="#F34096"/>`
            
            svg1.innerHTML = svg1Content
            link1.appendChild(svg1);
        
            const link2 = document.createElement('a');
            link2.href = '';
            const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg2.setAttribute("width", "25")
            svg2.setAttribute("height", "25")
            svg2.setAttribute("viewBox", "0 0 34 21")
            svg2.setAttribute("fill", "none")
      
            const svg2Content = ` <path opacity="0.65" d="M10.9865 0.982403C11.6056 -0.327461 13.3944 -0.327474 14.0135 0.982403L16.9614 7.21948L23.5531 8.21964C24.9374 8.42969 25.4902 10.2061 24.4885 11.2257L19.7186 16.0805L20.8447 22.9358C21.0811 24.3755 19.634 25.4734 18.3958 24.7936L12.5 21.557L6.6042 24.7936C5.36601 25.4734 3.91886 24.3755 4.15533 22.9358L5.28134 16.0805L0.511531 11.2257C-0.49019 10.2061 0.062573 8.42969 1.44692 8.21964L8.03862 7.21948L10.9865 0.982403Z" fill="#FBD757"/>`
          
            svg2.innerHTML = svg2Content
            link2.appendChild(svg2);
          
            svgContainer.appendChild(link1);
            svgContainer.appendChild(link2);
            iconsContainer.appendChild(rating);
            iconsContainer.appendChild(svgContainer)
          
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(iconsContainer);
            card.appendChild(likedBtn)
          
            container.appendChild(card)
        } else {
            return "";
        }
    })
    
}
function createSeries (series, container, clean = true){
    if (clean){
        container.innerHTML = "";
       }

    series.forEach(serie => {
        if (serie.poster_path && serie.vote_average !== 0) { 
            const card = document.createElement('article');
            card.classList.add('card');
            card.dataset.seriId = serie.id;
          
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w300${serie.poster_path}`;
            img.alt = '';
            img.addEventListener('click', () => {
                location.hash ="#serie=" + serie.id
            });
          
            const likedBtn = document.createElement("button")
            likedBtn.classList.add ("likedBtn")
            likedSeriesList()[serie.id] && likedBtn.classList.add('likedBtn--active');
            likedBtn.addEventListener("click", () => {
                likedBtn.classList.toggle("likedBtn--active")
                likedSerie(serie)
                getLikedSeries()
                if(location.hash.startsWith("#home")){
                    homePage()
                }
            })

            const title = document.createElement('p');
            title.classList.add('movie_title');
            title.textContent = serie.name;
          
            const iconsContainer = document.createElement('div');
            iconsContainer.classList.add('cards_icons');
          
            const svgContainer = document.createElement("div")

            const rating = document.createElement('p');
            rating.textContent = serie.vote_average;
          
            const link1 = document.createElement('a');
            link1.href = '#'; 
            const svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg1.setAttribute("width", "34")
            svg1.setAttribute("height", "21")
            svg1.setAttribute("viewBox", "0 0 34 21")
            svg1.setAttribute("fill", "none")
        
            const svg1Content = ` <path opacity="0.65" d="M17.0411 6.59255C20.8939 6.59255 24.0174 9.70588 24.0174 13.5463C24.0174 17.3868 20.8939 20.5 17.0411 20.5C13.1882 20.5 10.0648 17.3868 10.0648 13.5463C10.0648 9.70588 13.1882 6.59255 17.0411 6.59255ZM17.0411 0.5C25.0874 0.5 32.0333 5.97609 33.9605 13.6502C34.136 14.3487 33.7101 15.0568 33.0093 15.2317C32.3084 15.4064 31.5982 14.982 31.4227 14.2834C29.7852 7.76311 23.8802 3.10765 17.0411 3.10765C10.199 3.10765 4.29207 7.76711 2.65745 14.2914C2.48242 14.9899 1.77233 15.4147 1.07144 15.2404C0.370553 15.0658 -0.0557334 14.3581 0.119302 13.6594C2.04317 5.9808 8.99128 0.5 17.0411 0.5Z" fill="#F34096"/>`
            
            svg1.innerHTML = svg1Content
            link1.appendChild(svg1);
          
            const link2 = document.createElement('a');
            link2.href = '';
            const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg2.setAttribute("width", "25")
            svg2.setAttribute("height", "25")
            svg2.setAttribute("viewBox", "0 0 34 21")
            svg2.setAttribute("fill", "none")
      
            const svg2Content = ` <path opacity="0.65" d="M10.9865 0.982403C11.6056 -0.327461 13.3944 -0.327474 14.0135 0.982403L16.9614 7.21948L23.5531 8.21964C24.9374 8.42969 25.4902 10.2061 24.4885 11.2257L19.7186 16.0805L20.8447 22.9358C21.0811 24.3755 19.634 25.4734 18.3958 24.7936L12.5 21.557L6.6042 24.7936C5.36601 25.4734 3.91886 24.3755 4.15533 22.9358L5.28134 16.0805L0.511531 11.2257C-0.49019 10.2061 0.062573 8.42969 1.44692 8.21964L8.03862 7.21948L10.9865 0.982403Z" fill="#FBD757"/>`
          
            svg2.innerHTML = svg2Content
            link2.appendChild(svg2);
          
            svgContainer.appendChild(link1);
            svgContainer.appendChild(link2);
            iconsContainer.appendChild(rating);
            iconsContainer.appendChild(svgContainer)
          
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(iconsContainer);
            card.appendChild(likedBtn)
          
            container.appendChild(card)
        } else {
            return "";
        }
    })
}

function createCategories (categories, container){
    container.innerHTML = ""

    let view = `${categories.map(genre => `
    <article class="movie_genres_image" id="id${genre.id}">
                <p>${genre.name}</p>
            </article>
    `).slice(0, 20).join("")}
    `;
    container.innerHTML = view;

    const genreImages = document.querySelectorAll('.movie_genres_image');

    genreImages.forEach((genreImage) => {
        genreImage.addEventListener('click', (event) => {
            const genreId = event.currentTarget.id.substring(2);
            const genreName = genreImage.innerText;
            location.hash ="#category="+genreId+"-"+genreName;
        });
    });
}

// API Calls

async function getTrendingMoviesPreview(){
    const {data} = await api("/trending/movie/day")
    const content = null || document.getElementById("popular_movies__cards")
    const movies = data.results

    createMovies(movies, content)
}
async function getTrendingSeriesPreview(){
    const {data} = await api("/trending/tv/day")

    const content = null || document.getElementById("popular_series__cards")
    const series = data.results
    
    createSeries(series, content)
}
async function getGenresMoviesPreview(){
    const {data} = await api("/genre/movie/list")
   

    const content = null || document.getElementById("movie_genres__cards")
    const genres = data.genres

    createCategories(genres, content)

}
async function getMoviesByCategory(id){
    const {data} = await api("/discover/movie", {
        params: {
            with_genres: id,
        }
    })
    const content = null || document.getElementById("category_cards")
    const movies = data.results
    maxPage = data.total_pages;
    createMovies(movies, content)
}
function getPaginatedMoviesByCategory(id){
    return async function (){
        const {
            scrollTop, 
            scrollHeight, 
            clientHeight 
        } = document.documentElement
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight -15
        const pageIsNotMax = page < maxPage
    
        if (scrollIsBottom && pageIsNotMax){
            page++
            const {data} = await api("/discover/movie", {
            params: {
                with_genres: id,
                page,
            },
            })
            const content = document.getElementById("category_cards")
            const movies = data.results
    
            createMovies(movies, content, false);
        }
    }
}
async function getSeriesByCategory(id){
    const {data} = await api("/discover/tv", {
        params: {
            with_genres: id,
        }
    })
    const content = null || document.getElementById("category_cards")
    const movies = data.results

    createSeries(movies, content)
}
async function getMoviesBySearch(query){
    const {data} = await api("/search/movie", {
        params: {
            query,
        }
    })
    const content = null || document.getElementById("category_cards")
    const movies = data.results
    maxPage = data.total_pages;
    
    createMovies(movies, content);
}
function getPaginatedMoviesBySearch(query){
    return async function (){
        const {
            scrollTop, 
            scrollHeight, 
            clientHeight 
        } = document.documentElement
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight -15
        const pageIsNotMax = page < maxPage
    
        if (scrollIsBottom && pageIsNotMax){
            page++
            const {data} = await api("/search/movie", {
            params: {
                query,
                page,
            },
            })
            const content = document.getElementById("category_cards")
            const movies = data.results
    
            createMovies(movies, content, false);
        }
    }
}
async function getTrendingMovies(){
    const {data} = await api("/trending/movie/day")
    const content = document.getElementById("category_cards")
    const movies = data.results
    maxPage = data.total_pages;

    createMovies(movies, content);

}
async function getPaginatedTrendingMovies(){
    const {
        scrollTop, 
        scrollHeight, 
        clientHeight 
    } = document.documentElement
    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight -15
    const pageIsNotMax = page < maxPage

    if (scrollIsBottom && pageIsNotMax){
        page++
        const {data} = await api("/trending/movie/day", {
        params: {
            page,
        },
        })
        const content = document.getElementById("category_cards")
        const movies = data.results

        createMovies(movies, content, false);
    }
}
async function getTrendingSeries(){
    const {data} = await api("/trending/tv/day")
    const content = null || document.getElementById("category_cards")
    const series = data.results
    maxPage = data.total_pages;
    createSeries(series, content)
}
async function getPaginatedTrendingSeries(){
    const {
        scrollTop, 
        scrollHeight, 
        clientHeight 
    } = document.documentElement
    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight -15
    const pageIsNotMax = page < maxPage

    if (scrollIsBottom && pageIsNotMax){
        page++
        const {data} = await api("/trending/tv/day", {
        params: {
            page,
        },
        })
        const content = document.getElementById("category_cards")
        const series = data.results

        createSeries(series, content, false);
    }
}
async function getMovieById(id){
    
    const {data: movie} = await api("/movie/"+id)

    const movieImgUrl = "https://image.tmdb.org/t/p/original/" + movie.backdrop_path
    console.log(movieImgUrl)
    movieHeader.style.backgroundImage = `linear-gradient(to bottom, transparent, #090910), url(${movieImgUrl}) ` 

    movieVote.textContent = movie.vote_average
    movieTitle.textContent = movie.title;
    movieOverView.textContent = movie.overview;
   

    const content = null || document.getElementById("movie_genre_card")
    createCategories(movie.genres, content)
    getRelatedMoviesId(id);
    
 
}
async function getRelatedMoviesId(id) {
    const { data } = await api(`/movie/${id}/similar`);
    const relatedMovies = data.results;
  
    const content = null || document.getElementById("related_movies__cards")

    createMovies(relatedMovies, content, clean = true);
  }
async function getMovieVideo(id){
    const {data: movie} = await api("/movie/"+id+"/videos")
    
   
    // movieIframe.src = "https://www.youtube.com/embed/"+movie.results[0].key
    
    let videoKey;
    
    if (movie.results && movie.results.length > 0) {
        videoKey = "https://www.youtube.com/embed/" + movie.results[0].key;
    } else if (movie.results && movie.results.length > 1) {
        videoKey = "https://www.youtube.com/embed/" + movie.results[1].key;
    } else {
        videoKey = "https://www.youtube.com/embed/wDUNd9kcH0U"; 
    }

    movieIframe.src = videoKey;
}
async function getSerieById(id){
    const {data: tv} = await api("/tv/"+id)

    const tvImgUrl = "https://image.tmdb.org/t/p/original/" + tv.backdrop_path
    console.log(tvImgUrl)
    movieHeader.style.backgroundImage = `linear-gradient(to bottom, transparent, #090910), url(${tvImgUrl}) `
    
    movieVote.textContent = tv.vote_average
    movieTitle.textContent = tv.name;
    movieOverView.textContent = tv.overview;
   

    const content = null || document.getElementById("movie_genre_card")
    createCategories(tv.genres, content)
    getRelatedSeriesId(id)
}
async function getRelatedSeriesId(id) {
    const { data } = await api(`/tv/${id}/similar`);
    const relatedMovies = data.results;
  
    const content = null || document.getElementById("related_movies__cards")

    createSeries(relatedMovies, content, clean = true);
  }
async function getSerieVideo(id){
    const {data: movie} = await api("/tv/"+id+"/videos")
    let videoKey;
    
    if (movie.results && movie.results.length > 0) {
        videoKey = "https://www.youtube.com/embed/" + movie.results[0].key;
    } else if (movie.results && movie.results.length > 1) {
        videoKey = "https://www.youtube.com/embed/" + movie.results[1].key;
    } else {
        videoKey = "https://www.youtube.com/embed/wDUNd9kcH0U"; 
    }

    movieIframe.src = videoKey;
}
async function getLikedMovies(){
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);

    const content = null || document.getElementById("liked_movies__cards")

    createMovies(moviesArray, content);
  
    console.log(likedMovies)
}
async function getLikedSeries(){
    const likedSeries = likedSeriesList();
    const seriesArray = Object.values(likedSeries);

    const content = null || document.getElementById("liked_movies__cards")

    createSeries(seriesArray, content);
    console.log("ESTE ES EL SERIE ARRAY", seriesArray)
}
