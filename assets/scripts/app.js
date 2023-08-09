const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backDrop = document.getElementById("backdrop");
const cancelAddMovieButton = document.querySelector("#add-modal .btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();
    const cancelDeletionButton =
        deleteMovieModal.querySelector(".btn--passive");
    let confirmDelitionButton =
        deleteMovieModal.querySelector(".btn--danger");

    confirmDelitionButton.replaceWith(confirmDelitionButton.cloneNode(true));
    confirmDelitionButton = deleteMovieModal.querySelector(".btn--danger");

    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal)

    cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
    confirmDelitionButton.addEventListener(
        "click",
        deleteMovieHandler.bind(null, movieId)
    );
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
        startDeleteMovieHandler.bind(null, id)
    );

    listRoot.append(newMovieElement);
};

const showMovieModal = () => {
    addMovieModal.classList.add("visible");
    toggleBackdrop();
};

const closeMovieModal = () => {
    addMovieModal.classList.remove("visible");
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
    closeMovieModal();
    closeMovieDeletionModal();
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInputs();
    toggleBackdrop();
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
    closeMovieModal();
    clearMovieInputs();
    toggleBackdrop();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
    updateUI();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backDrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandlar);
