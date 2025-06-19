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

  movieCard.appendChild(imgDiv);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieDescription);
  movieCard.appendChild(favBtn);
  movieContainer.appendChild(movieCard);
});
