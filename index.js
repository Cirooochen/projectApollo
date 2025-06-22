const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDViZGVkOTBiMGUzYTc3NjQxNzdiZjI4ZDVkZWY3ZCIsIm5iZiI6MTc1MDE2NjY2Mi41MDg5OTk4LCJzdWIiOiI2ODUxNmM4Njc1YmUzODk2MjEwNjVkZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DWVStGexBgO90tumCY3h3UFtoNP7lYZ4AIxrYQoIX5g",
  },
};

async function fetchMovie() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    );

    if (!response.ok) {
      throw new Error("Something went wrong!!!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const movieData = await fetchMovie();
// console.log(movieData);
const movieInfo = movieData.results;
console.log(movieInfo);

const movieContainer = document.querySelector("#movieContainer");
movieInfo.forEach((movie) => {
  const movieCard = document.createElement("div");
  movieCard.className =
    "p-4 min-w-[25rem] md:w-1/3 snap-center gap-[2rem] border border-red-50 "; //  here add some styling and shit
  movieCard.classList.add("movie-card"); //classname for each movie card

  const movieImag = document.createElement("img");
  movieImag.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  movieImag.className =
    "object-cover hover:scale-110 transition-transform duration-300 ease-in-out"; //  here add some styling and shit
  const imgDiv = document.createElement("figure");
  imgDiv.className = "overflow-hidden mb-4";
  imgDiv.appendChild(movieImag);

  const movieTitle = document.createElement("h5");
  movieTitle.textContent = movie.original_title;

  const movieDescription = document.createElement("p");
  movieDescription.textContent = movie.overview;
  movieDescription.className = "text-gray-600 mb-4 text-pretty line-clamp-4";

  const favBtn = document.createElement("button");
  favBtn.className =
    "border text-black py-2 px-8 rounded-full hover:bg-gray-200";
  favBtn.textContent = "Add to my journal";

  favBtn.classList.add("AddToJournal");
  favBtn.dataset.id = movie.id; //Attention!!! When you assign the movie.id to button's dataset-id, the data type changes from Number to String

  movieCard.appendChild(imgDiv);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieDescription);
  movieCard.appendChild(favBtn);
  movieContainer.appendChild(movieCard);
});

//Window event listener, this is for checking the localStorage movies evry time when the page refresh and showing different button labels on the movie cards accordingly.
window.addEventListener("load", () => {
  //Read current favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const allButtons = document.querySelectorAll(".AddToJournal");
  console.log(favorites);
  // console.log(movieInfo);
  // console.log(allButtons);
  allButtons.forEach((btn) => {
    const btnId = btn.dataset.id;
    const isFavorite = favorites.some((movie) => movie.id === btnId); //returns true or false
    console.log(isFavorite);
    if (isFavorite) {
      btn.textContent = "✅ Added";
    } else {
      btn.textContent = "Add to my journal";
    }
  });
});

//Click event listener
movieContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("AddToJournal")) {
    const clickedCard = event.target.closest(".movie-card");
    const id = event.target.dataset.id;

    //Read current favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyAddedIndex = favorites.findIndex((movie) => movie.id === id);
    console.log(favorites);
    console.log(alreadyAddedIndex);

    //This part check if the movie is already added into the localStorage
    if (alreadyAddedIndex === -1) {
      const favoriteMovie = {
        id: id,
        title: clickedCard.querySelector("h5").textContent,
        overview: clickedCard.querySelector("p").textContent,
        poster_path: clickedCard.querySelector("img").src,
      };

      favorites.push(favoriteMovie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      event.target.textContent = "✅ Added";
    } else {
      // Already added → Remove from favorites
      favorites.splice(alreadyAddedIndex, 1); // remove the movie
      localStorage.setItem("favorites", JSON.stringify(favorites));
      event.target.textContent = "Add to my journal";
    }
  }
});
