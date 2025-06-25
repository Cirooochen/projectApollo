// journal.js

import { renderMovies } from "./ui2.js";
import { deleteAllMovies } from "./storage.js";
import { navBarScrollEffect } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const movieCardContainer = document.getElementById("movieCard");
  const deleteAllBtn = document.getElementById("delete-all-btn");

  // Render all saved movies into the UI
  renderMovies(movieCardContainer);

  // Handle Delete All click
  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all saved movies?")) {
      deleteAllMovies(); // clear localStorage
      renderMovies(movieCardContainer); // re-render (empty)
    }
  });
});
