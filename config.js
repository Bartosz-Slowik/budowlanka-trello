require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    apiKey: process.env.TRELLO_API_KEY,    // Trello API Key from environment variable
    apiToken: process.env.TRELLO_API_TOKEN, // Trello API Token from environment variable
    boardId: process.env.TRELLO_BOARD_ID,   // Trello Board ID from environment variable
};
