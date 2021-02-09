const setupDiv = document.getElementById('setup');
const punchlineDiv = document.getElementById('punchline');
const punchlineBtn = document.getElementById('punchlineBtn');
const newJokeBtn = document.getElementById('newJokeBtn');
let punchline = ""; // will update in getJoke()


function toggleButtons() {
    // Toggles hide/show for the punchline and new joke buttons
    punchlineBtn.classList.toggle('hidden');
    newJokeBtn.classList.toggle('hidden');
}

async function getJoke() {
    // Gets the joke from the API
    const jokePromise = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
    const joke = await jokePromise.json();

    // Inserts the joke setup into the div
    setupDiv.innerHTML = joke[0].setup;

    // Clears and hides the previous punchline div
    punchlineDiv.innerHTML = "";
    punchlineDiv.classList.remove('bubble');

    // Populates the punchline for the current joke
    punchline = joke[0].punchline;

    //Toggles button visibility
    toggleButtons();
}

function getPunchline() {
    // Inserts the punchline into the div and shows it on the DOM
    punchlineDiv.innerHTML = punchline;
    punchlineDiv.classList.toggle('bubble');

    // Toggles button visibility
    toggleButtons();
}

// Get initial joke on load
getJoke();

// Gets punchline when punchline button is clicked
punchlineBtn.addEventListener('click', getPunchline);

// Gets a new joke when new joke button is clicked
newJokeBtn.addEventListener('click', getJoke);