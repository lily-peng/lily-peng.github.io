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
    // Clears and hides the previous punchline div
    punchlineDiv.innerHTML = "";
    punchlineDiv.classList.remove('bubble');

    //Toggles button visibility
    toggleButtons();

    // Gets the joke from the API
    const jokePromise = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');

    // Error Handling - check if jokePromise was successful
    if (jokePromise.ok) {
        // Retrieves the joke as an array from JSON
        const joke = await jokePromise.json();

        // Inserts the joke setup into the div
        setupDiv.innerHTML = joke[0].setup;

        // Populates the punchline for the current joke
        punchline = joke[0].punchline;
    } else {
        // Display the error on the page
        setupDiv.innerHTML = `Sorry, an error from the server has occured: ${jokePromise.status} ${jokePromise.statusText}. Please refresh the page and try again.`;

        // Disable buttons
        punchlineBtn.disabled = true;
        newJokeBtn.disabled = true;
    }
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