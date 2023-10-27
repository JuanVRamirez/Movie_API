let maxPage;
let page = 1;
let infiniteScroll;

searchButton.addEventListener("click", () => {
    location.hash = "#search="+inputMain.value;
});
searchButtonCategory.addEventListener("click", () => {
    location.hash = "#search=" + searchInputCategory.value;
});
backButtonMovie.addEventListener("click", () => {
    location.hash = "#home";
});
backButtonCategory.addEventListener("click", () => {
    history.back();
});
popularMoviesButton.addEventListener("click", () => {
    location.hash = "#trends=movies";
});
popularSeriesButton.addEventListener("click", () => {
    location.hash = "#trends=series";
});

window.addEventListener("scroll", infiniteScroll, false)
window.addEventListener("DOMContentLoaded", navigate, false)
window.addEventListener("hashchange", navigate, false)

function navigate() {
    console.log({ location })
    if(infiniteScroll){
        window.removeEventListener("scroll", infiniteScroll, {passive:false})
        infiniteScroll = undefined
    }

    if (location.hash.startsWith("#trends=movies")){
        trendsMoviesPage()
    } else if (location.hash.startsWith("#trends=series")){
        trendsSeriesPage()
    } else if (location.hash.startsWith("#search=")){
        searchPage()
    } else if (location.hash.startsWith("#movie=")){
        movieDetailsPage()
    } else if (location.hash.startsWith("#serie=")){
        serieDetailsPage()
    } else if (location.hash.startsWith("#category=")){
        categoriesPage()
    } else {
        homePage();
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if(infiniteScroll){
        window.addEventListener("scroll", infiniteScroll, {passive: false})
    }
}



// Sections----------------

function homePage() {
    header.classList.remove("inactive")
    trendingMovies.classList.remove("inactive")
    categoryPage.classList.add("inactive")
    movieGenres.classList.remove("inactive")
    movieInfoPage.classList.add("inactive")
    trendingSeries.classList.remove("inactive")
    categoryGenre.classList.remove("inactive")
    movieIframe.src = ""
    languageBtn.classList.remove("inactive")


    getTrendingMoviesPreview()
    getGenresMoviesPreview()
    getTrendingSeriesPreview()
    getLikedMovies()

    console.log("Home!!")
}
function categoriesPage() {
    header.classList.add("inactive")
    trendingMovies.classList.add("inactive")
    categoryPage.classList.remove("inactive")
    // movieHeader.style.background = ""
    movieGenres.classList.add("inactive")
    trendingSeries.classList.add("inactive")
    categoryGenre.classList.remove("inactive")
    movieInfoPage.classList.add("inactive")
    likedSection.classList.add("inactive")
    languageBtn.classList.add("inactive")
    console.log("Categories!!!!")

    const [_,categoryData] = location.hash.split("=") //["#category", "id-name"]
    const [categoryId, categoryName] = categoryData.split("-")

    const decodedCategoryName = decodeURIComponent(categoryName);

    categoryGenre.innerText = decodedCategoryName;

    if (categoryId == 10765 || categoryId == 10759){
        getSeriesByCategory(categoryId)
    } else {
        getMoviesByCategory(categoryId)
    }
    
    infiniteScroll = getPaginatedMoviesByCategory(categoryId)
   
}
function movieDetailsPage() {
    header.classList.add("inactive")
    trendingMovies.classList.add("inactive")
    movieInfoPage.classList.remove("inactive")
    // movieHeader.style.background = ""
    movieGenres.classList.add("inactive")
    trendingSeries.classList.add("inactive")
    categoryPage.classList.add("inactive")
    likedSection.classList.add("inactive")
    languageBtn.classList.remove("inactive")
    console.log("Movies")


    const [_,query] = location.hash.split("=") //["#movie", "movieID"]

    
    getMovieById(query)
    getMovieVideo(query)
}
function serieDetailsPage() {
    header.classList.add("inactive")
    trendingMovies.classList.add("inactive")
    movieInfoPage.classList.remove("inactive")
    movieGenres.classList.add("inactive")
    trendingSeries.classList.add("inactive")
    categoryPage.classList.add("inactive")
    likedSection.classList.add("inactive")
    languageBtn.classList.remove("inactive")
    console.log("Movies")


    const [_,query] = location.hash.split("=") //["#serie", "movieID"]
    getSerieById(query)
    getSerieVideo(query)
}
function searchPage() {
    header.classList.add("inactive")
    trendingMovies.classList.add("inactive")
    categoryPage.classList.remove("inactive")
    movieGenres.classList.add("inactive")
    trendingSeries.classList.add("inactive")
    trendingSeries.classList.add("inactive")
    categoryGenre.classList.add("inactive")
    searchInputCategory.classList.remove("inactive")
    searchButtonCategory.classList.remove("inactive")
    likedSection.classList.add("inactive")
    languageBtn.classList.remove("inactive")

    const [_,query] = location.hash.split("=") //["#searc", "-"]

    getMoviesBySearch(query)
    console.log("Search!!")

    infiniteScroll = getPaginatedMoviesBySearch(query);
}
function trendsMoviesPage() {
    header.classList.add("inactive")
    trendingMovies.classList.add("inactive")
    categoryPage.classList.remove("inactive")
    movieGenres.classList.add("inactive")
    trendingSeries.classList.add("inactive")
    searchInputCategory.classList.add("inactive")
    searchButtonCategory.classList.add("inactive")
    categoryGenre.classList.add("inactive")
    likedSection.classList.add("inactive")
    languageBtn.classList.add("inactive")
    console.log("Trends!!")
    
    
    getTrendingMovies()

    infiniteScroll = getPaginatedTrendingMovies;
}
function trendsSeriesPage() {
    categoryCards.innerHTML = ""
    header.classList.add("inactive")
    trendingMovies.classList.add("inactive")
    categoryPage.classList.remove("inactive")
    movieGenres.classList.add("inactive")
    trendingSeries.classList.add("inactive")
    searchInputCategory.classList.add("inactive")
    searchButtonCategory.classList.add("inactive")
    categoryGenre.classList.add("inactive")
    likedSection.classList.add("inactive")
    languageBtn.classList.add("inactive")
    console.log("Trends!!")
    
    getTrendingSeries()
    infiniteScroll = getPaginatedTrendingSeries;
}