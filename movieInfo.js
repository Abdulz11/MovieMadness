// fetching data
const API_KEY = "api_key=74110faee415f150854ef2a006350d93";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

//EACH MOVIE
let outerContainer = document.querySelector(".outer");
let eachMovieContainer = document.getElementById("eachMovie-container");
function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  console.log(movieId);
  let header = sessionStorage.getItem("movieHeader");
  console.log(header);

  fetch(BASE_URL + "/movie/" + movieId + "?" + API_KEY)
    .then((response) => response.json())
    .then((data) => showMovieInfo(data, header));
}

function showMovieInfo(movieInfo, header) {
  let {
    imdb_id,
    overview,
    title,
    poster_path,
    tagline,
    vote_average,
    release_date,
  } = movieInfo;
  let genre =
    movieInfo.genres[0].name.charAt(0).toUpperCase() +
    movieInfo.genres[0].name.slice(1);
  eachMovieContainer.innerHTML = "";
  let eachMovie = document.createElement("div");
  eachMovie.setAttribute("id", "outer");
  eachMovie.innerHTML = `<div id='movie'>
        <div class='movie-info'>
        <div class="movieposter">
        <img src="${IMG_URL + poster_path}" alt="movie-poster">
        </div>
        <h3 class="title">${title}</h3>
        <h3 class="tagline">${tagline}</h3>
        <span>Release: ${release_date}</span>
        </div>
        <div class='info-desc'>
        <h3>Rating:${vote_average}</h3>
        <h3>Genre:${genre}</h3>
        </div>
        <div class='movie-overview'>
            <h3>${overview}</h3>
        </div>
        <div class='info-btn'>
            <a class="btn" id='backbtn' href='movie.html'>Go back</button>
            <a class="btn" target=_blank href="https://www.imdb.com/title/${imdb_id}">IMDB</a>
        </div>
</div>
    </div>
    `;

  eachMovieContainer.append(eachMovie);
  let span = document.querySelector("span");
  let newHeader = header.trim().replace(" ", "");
  if (newHeader !== "NewRelease") {
    span.style.display = "none";
  }
}
