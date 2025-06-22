export function getSavedMovies() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveMovies(movies) {
  localStorage.setItem("favorites", JSON.stringify(movies));
}

export function deleteAllMovies() {
  localStorage.removeItem("favorites");
}
