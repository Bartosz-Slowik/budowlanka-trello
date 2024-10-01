// config.js
require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    apiKey: process.env.TRELLO_API_KEY,    // Trello API Key from environment variable
    apiToken: process.env.TRELLO_API_TOKEN, // Trello API Token from environment variable
    boardId: process.env.TRELLO_BOARD_ID,   // Trello Board ID from environment variable
    planGodzFieldId: '5f872bcafe324d65ffcde836', // ID for PLAN_GODZ custom field
};
