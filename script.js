const addButton = document.querySelector(".add-btn");
const formBox = document.querySelector(".form-box-center");
const closeButton = document.querySelector(".close-btn");
const displayGrid = document.querySelector(".display-grid");
const submitButton = document.querySelector(".submit-btn");
const addMovieForm = document.querySelector(".add-movie-form");

//empty array for storing movies
let movieLibrary = [];

addButton.addEventListener("click", openForm);
closeButton.addEventListener("click", (e) => closeForm(e));
submitButton.addEventListener("click", (e) => submitForm(e));

function openForm() {
  formBox.style.display = "flex";
}

function closeForm(e) {
  e.preventDefault();
  formBox.style.display = "none";
  addMovieForm.reset();
}

// object constructor

class Movie {
  constructor(name, director, genre, haveSeen) {
    this.name = name;
    this.director = director;
    this.genre = genre;
    this.haveSeen = haveSeen;
  }

  toggleSeen() {
    if (this.haveSeen == "true") {
      this.haveSeen = "false";
    } else {
      this.haveSeen = "true";
    }
  }
}

function submitForm(e) {
  e.preventDefault(e);

  let movieName = document.querySelector("#name").value;
  let movieDirector = document.querySelector("#director").value;
  let movieGenre = document.querySelector("#genre").value;
  let movieSeen = document.querySelector("#have-seen").checked;

  movie = new Movie(
    `${movieName}`,
    `${movieDirector}`,
    `${movieGenre}`,
    `${movieSeen}`
  );

  movieLibrary.push(movie);
  showMovie(movieLibrary);

  formBox.style.display = "none";
  addMovieForm.reset();
}

function showMovie(movieLibrary) {
  let numberOfMovies = movieLibrary.length;

  displayGrid.innerHTML = ""; //to avoid repetition

  for (let i = 0; i < numberOfMovies; i++) {
    let div = document.createElement("div");
    displayGrid.appendChild(div);

    let paraName = document.createElement("p");
    div.appendChild(paraName);

    let paraDirector = document.createElement("p");
    div.appendChild(paraDirector);

    let paraGenre = document.createElement("p");
    div.appendChild(paraGenre);

    let seenButton = document.createElement("button");
    div.appendChild(seenButton);
    seenButton.setAttribute("id", `${i}`);
    seenButton.addEventListener("click", (e) => toggle(e));

    let removeButton = document.createElement("button");
    div.appendChild(removeButton);
    removeButton.className = "remove-btn";
    removeButton.setAttribute("id", `${i}`);
    removeButton.addEventListener("click", (e) => removeCard(e));

    paraName.textContent = `Name: ${movieLibrary[i]["name"]}`;
    paraDirector.textContent = `Director: ${movieLibrary[i]["director"]}`;
    paraGenre.textContent = `Genre: ${movieLibrary[i]["genre"]}`;

    if (movieLibrary[i]["haveSeen"] === "true") {
      seenButton.textContent = "Seen";
      seenButton.className = "seen-btn";
    } else {
      seenButton.textContent = "Not Seen";
      seenButton.className = "notSeen-btn";
    }

    removeButton.textContent = "Remove";
  }
}

function removeCard(e) {
  uniqueId = e.target.id;
  movieLibrary.splice(uniqueId, 1);
  showMovie(movieLibrary);
}

function toggle(e) {
  uniqueId = e.target.id;
  movieLibrary[uniqueId].toggleSeen();
  showMovie(movieLibrary);
}
