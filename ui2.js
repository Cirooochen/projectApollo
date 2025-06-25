import { getSavedMovies, saveMovies } from "./storage.js";

export function renderMovies(container) {
  const savedMovies = getSavedMovies();
  container.innerHTML = "";

  if (savedMovies.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 text-white/80 text-lg italic tracking-wide">
        You haven’t saved any movies yet. Add some from the homepage 🎬
      </div>
    `;
    return;
  }

  savedMovies.forEach((movie, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl p-6 shadow-xl transition hover:scale-105 w-full";

    const imageHtml = movie.poster_path
      ? `<img src="${movie.poster_path}" alt="${movie.title}" class="rounded mb-4 shadow-lg w-full max-h-72 object-cover" />`
      : "";

    card.innerHTML = `
      <div class="flex flex-col h-full justify-between">
        ${imageHtml}

        <!-- Icon -->
        <div class="text-5xl text-white mb-4">🎬</div>

        <!-- Title & Description -->
        <h2 class="text-2xl font-bold text-white mb-2">${movie.title}</h2>
        <p class="text-sm italic text-gray-300 mb-4">
          ${movie.overview || "No description available."}
        </p>

        <!-- Note Display (if any) -->
        <div class="movie-note-block mt-2">
          ${
            movie.note
              ? `<p class="note-display italic text-md text-yellow-300 bg-white/10 px-4 py-3 rounded mb-4 shadow transition-all duration-300">
                  📝 ${movie.note}
                </p>`
              : ""
          }

          <!-- Input + Save -->
          <input 
            type="text" 
            class="note-input w-full p-2 mb-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400" 
            placeholder="Add a personal note..." 
            value=""
          />
          <button 
            class="save-note-btn bg-blue-500 hover:bg-blue-600 w-full text-white py-2 rounded-full text-sm" 
            data-index="${index}">
            💾 Save Note
          </button>
        </div>

        <!-- Remove Button -->
        <button 
          class="remove-btn mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm shadow" 
          data-index="${index}">
          🗑 Remove
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // ✅ Remove movie
  container.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      const updated = getSavedMovies();
      updated.splice(index, 1);
      saveMovies(updated);
      renderMovies(container);
    });
  });

  // ✅ Save note
  container.querySelectorAll(".save-note-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      const input = btn.closest("div").querySelector(".note-input");
      const note = input?.value?.trim();

      if (note) {
        const updated = getSavedMovies();
        updated[index].note = note;
        saveMovies(updated);

        // ✅ Update UI immediately
        const noteBlock = btn.closest(".movie-note-block");
        const oldNoteDisplay = noteBlock.querySelector(".note-display");

        if (oldNoteDisplay) {
          oldNoteDisplay.textContent = `📝 ${note}`;
        } else {
          const noteDisplay = document.createElement("p");
          noteDisplay.className =
            "note-display italic text-md text-yellow-300 bg-white/10 px-4 py-3 rounded mb-4 shadow transition-all duration-300";
          noteDisplay.textContent = `📝 ${note}`;
          input.parentElement.insertBefore(noteDisplay, input);
        }

        // Visual feedback
        btn.textContent = "✅ Saved!";
        input.value = "";

        setTimeout(() => {
          btn.textContent = "💾 Save Note";
        }, 1200);
      }
    });
  });
}
