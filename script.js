/***
* Sync vs Async
* Sync - code runs 1 line at a time.
* Async - code can run and go to another task before completing the first.
*/

// 1. Sync operation
function beginSyncOperation() {
    console.log("Begin");
    console.log("Running");
    console.log("Stopping");
}
beginSyncOperation();

document.addEventListener("DOMContentLoaded", () => {
    // beginSyncOperation();
    // beginSyncOperation();
    // console.log(simulateAsyncOperation);

    const btn = document.getElementById("btn");
    btn.addEventListener("click", displayQuote);
});

// 2. Async operation - keeps apps responsive
function beginAsyncOperation() {
    console.log("Beg");

    // setTimeout - starts a timer after a period of time
    // Where a callback function gets invoked.
    setTimeout(() => {
        console.log("Running");
    }, 3000); // after 3 seconds run to console

    console.log("Stopping");
}

/***
* Common Async Patterns
* 1. Callbacks - like we see above
* 2. Promises - cleaner chaining operations
* 3. Async/Await - modern and easier to read
*/

/***
* Simulate an async operations using a timeout.
* The async keyword turns a function into an async function,
* allowing it to return a promise implicitly or explicitly.
*/
async function simulateAsyncOperation() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(console.log("Data fetched after waiting"));
        }, 5000);
    });
}

const myPromise = new Promise((resolve, reject) => {
    // here, we simulate a condition to demonstrate both,
    // resolve and reject scenarios.
    const condition = true;
    if (condition) {
        resolve("Promise is resolved successfully.");
    } else {
        reject("Promise is rejected");
    }
});

myPromise
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

/***
* API - Application Programming Interface
*/

async function getQuote() {
    try {
        // fetch returns a promise that resolves to the response object representing
        // the response of the request
        const response = await fetch("https://api.quotable.io/random");

        // checking if the response is okay (status code in the range of 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Failed to fetch quote:", error.message);
    }
}

async function displayQuote() {
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");

    const data = await getQuote();

    quoteElement.textContent = data.content;
    authorElement.textContent = "- " + data.author;
}
