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

// run after DOM loads
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("generateQuoteButton");
    btn.addEventListener("click", displayQuote);
});

// 2. Async operation example
function beginAsyncOperation() {
    console.log("Beg");

    setTimeout(() => {
        console.log("Running");
    }, 3000);

    console.log("Stopping");
}

/***
* Simulate async operation using Promise
*/
async function simulateAsyncOperation() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data fetched after waiting");
        }, 5000);
    });
}

// Promise example
const myPromise = new Promise((resolve, reject) => {
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
* API - Fetch Random Quote
*/
async function getQuote() {
    try {
        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to fetch quote:", error.message);
        return null;
    }
}

/***
* Display Quote on Screen
*/
async function displayQuote() {
    const quoteElement = document.getElementById("quoteText");
    const authorElement = document.getElementById("authorText");

    const data = await getQuote();

    if (data) {
        quoteElement.textContent = `"${data.quote}"`;
        authorElement.textContent = "- " + data.author;
    } else {
        quoteElement.textContent = "Failed to load quote.";
        authorElement.textContent = "";
    }
}