window.addEventListener("load", navigator, false)
window.addEventListener("hashchange", navigator, false)

function navigator() {
    console.log({ location })

    if (location.hash.startsWith("#trends")){
        trendsPage()
    } else if (location.hash.startsWith("#search=")){
        searchPage()
    } else if (location.hash.startsWith("#movie=")){
        movieDetailsPage()
    } else if (location.hash.startsWith("#category=")){
        categoriesPage()
    } else {
        homePage();
    }
}

function homePage() {

    getTrendingMoviesPreview()
    getGenresMoviesPreview()
    getTrendingSeriesPreview()
    console.log("Home!!")
}
function categoriesPage() {
    console.log("Categories!!!!")
}
function movieDetailsPage() {
    header.classList.add("inactive")
    trendingMovies.classList.add("inactive")
    movieInfoPage.classList.remove("inactive")
    // movieHeader.style.background = ""
    movieGenres.classList.add("inactive")
    trendingSeries.classList.add("inactive")

    console.log("Movies")
}
function searchPage() {
    console.log("Search!!")
}
function trendsPage() {
    console.log("Trends!!")
}