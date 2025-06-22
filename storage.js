export function getSavedMovies() {
  return JSON.parse(localStorage.getItem("savedMovies")) || [];
}

export function saveMovies(movies) {
  localStorage.setItem("savedMovies", JSON.stringify(movies));
}

export function deleteAllMovies() {
  localStorage.removeItem("savedMovies");
}
