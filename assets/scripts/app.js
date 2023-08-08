const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backDrop = document.getElementById("backdrop");
const cancelAddMovieButton = document.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");

const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    listRoot.children[movieIndex].remove();
};

const deleteMovieHandler = (movieId) => {
    const deleteMovieModal = document.getElementById("delete-modal");
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    // deleteMovie(movieId); 
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;

    newMovieElement.addEventListener(
        "click",
        deleteMovieHandler.bind(null, id)
    );

    listRoot.append(newMovieElement);
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle("visible");
    toggleBackdrop();
};

const clearMovieInputs = () => {
    for (const userInput of userInputs) {
        userInput.value = "";
    }
};

const toggleBackdrop = () => {
    backDrop.classList.toggle("visible");
};

const backdropClickHandler = () => {
    toggleMovieModal();
};

const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearMovieInputs();
};

const addMovieHandlar = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    if (
        titleValue.trim() === "" ||
        imageUrlValue.trim() === "" ||
        ratingValue.trim() === "" ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert("Please enter a valid values (rating between 1 and 5).");
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue,
    };
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInputs();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
    updateUI();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backDrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandlar);
