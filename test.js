require('dotenv').config(); // Load environment variables from .env file
const { get } = require('./utils'); // Import the GET function from utils
const config = require('./config'); // Import configuration

// Function to get all lists from a board
function getAllListsFromBoard(boardId, callback) {
    const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${config.apiKey}&token=${config.apiToken}`;
    get(url, callback);
}

// Main flow: Get all lists from the board
getAllListsFromBoard(config.boardId, (err, lists) => {
    if (err) {
        console.error('Error getting lists:', err.message);
        return;
    }

    // Print the list names and IDs
    console.log("Lists on the board:");
    lists.forEach(list => {
        console.log(`ID: ${list.id}, Name: ${list.name}`);
    });
});
