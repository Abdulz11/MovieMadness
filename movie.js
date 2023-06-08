// Opening/Closing side menu

let openBtn = document.getElementById("openbtn");
function openNav() {
  let side = document.getElementById("side-bar");
  if (window.innerWidth <= 800) {
    side.style.width = "100%";
    side.style.textAlign = "center";
  } else if (window.innerWidth > 800) {
    side.style.width = "30%";
    side.style.textAlign = "left";
  }
}
function closeNav() {
  let side = document.getElementById("side-bar");
  side.style.width = 0;
}

// fetching data
const API_KEY = "api_key=74110faee415f150854ef2a006350d93";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

let searchPopular =
  BASE_URL +
  "/discover/movie?sort_by=popularity.desc&" +
  API_KEY +
  "&language=en-US";

function getMovies(url) {
  fetch(url)
    .then((response) => {
      if (response.status == 404) {
        movieContainer.innerHTML = "<h2 class='err-mess'>Movie not found</h2>";
      }
      if (response.status == 200) {
        movieContainer.innerHTML = "<h2 class='err-mess'>Loading...</h2>";
      }

      return response.json();
    })
    .then((data) => {
      showMovies(data.results);
    })
    .catch((err) => console.log(err));
}
getMovies(searchPopular);

// IF OFFLINE
window.addEventListener("offline", () => {
  movieContainer.innerHTML =
    "<h2 class='err-mess'>Connect to the Internet</h2>";
});

// SHOWING MOVIES
let movieContainer = document.getElementById("movie-container");
let movieHeader = document.querySelector("nav h2");

function showMovies(movies) {
  if (movies.length == 0) {
    movieContainer.innerHTML = "<h2 class='err-mess'>Movie not found</h2>";
    console.log("movie not found");
    return;
  }
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    let { title, poster_path, id } = movie;
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie");
    movieCard.innerHTML = `<a onclick="movieSelected('${id}')"href=#><img src="${
      IMG_URL + poster_path
    }" alt="movie poster"></a>
     <h3 class="title">${title}</h3>`;

    movieContainer.append(movieCard);
  });
}

//SEARCHING FOR MOVIES
let searchBar = document.getElementById("search-bar");
let searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", findMovies);

let searchParam =
  BASE_URL + "/search/movie?language=en-US&" + API_KEY + "&query=";

function findMovies(e) {
  let movieName = searchBar.value.trim();
  e.preventDefault();
  if (movieName) {
    getMovies(searchParam + movieName + "");
  } else if (movieName == "") {
    getMovies(searchPopular);
  }
  movieHeader.innerHTML = `'${searchBar.value}' Movies`;
  searchBar.value = " ";
}

// GETTING INDIVIDUAL MOVIE INFO
function movieSelected(id) {
  let movieInfoHeader = movieHeader.textContent;
  sessionStorage.setItem("movieId", id);
  sessionStorage.setItem("movieHeader", movieInfoHeader);
  window.location = "movieInfo.html";
}

// links to sidebar
let popular = document.getElementById("popular");
let newRelease = document.getElementById("new");
let highestRated = document.getElementById("rated");

// POPULAR MOVIES
popular.addEventListener("click", function (e) {
  e.preventDefault();
  navLinks("/discover/movie?sort_by=popularity.desc&", "Most Popular");
});
// NEW MOVIES
newRelease.addEventListener("click", function (e) {
  e.preventDefault();
  navLinks("/movie/upcoming?", "New Release");
});
// HIGH RATING MOVIES
highestRated.addEventListener("click", function (e) {
  e.preventDefault();
  navLinks("/movie/top_rated?language=en-US&", "Highest Rated");
});

function navLinks(category, header) {
  getMovies(BASE_URL + category + API_KEY + "&language=en-US");
  movieHeader.innerHTML = header;
  closeNav();
}
