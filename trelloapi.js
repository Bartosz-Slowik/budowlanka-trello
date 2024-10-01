// trelloapi.js
const { get, put, post  } = require('./utils');
const config = require('./config');

// Get all cards from the specified board in a single API call
function getAllCardsFromBoard(boardId, callback) {
    const url = `https://api.trello.com/1/boards/${boardId}/cards?key=${config.apiKey}&token=${config.apiToken}&customFieldItems=true`;
    get(url, callback);
}

// Update a card's start date
function updateCardStartDate(cardId, newStartDate, callback) {
    const url = `https://api.trello.com/1/cards/${cardId}?key=${config.apiKey}&token=${config.apiToken}`;
    const data = { start: newStartDate };
    put(url, data, callback);
}

// Update a card's end date
function updateCardEndDate(cardId, newEndDate, callback) {
    const url = `https://api.trello.com/1/cards/${cardId}?key=${config.apiKey}&token=${config.apiToken}`;
    const data = { due: newEndDate };
    put(url, data, callback);
}

// Update a card's custom field value
function updateCustomFieldValue(cardId, customFieldId, value, callback) {
    const url = `https://api.trello.com/1/cards/${cardId}/customField/${customFieldId}/item?key=${config.apiKey}&token=${config.apiToken}`;
    const data = {
        value: {
            number: value,
        }
    };
    put(url, data, callback);
}

// Create a new card
function createCard(listId, name, callback) {
    const url = `https://api.trello.com/1/cards?key=${config.apiKey}&token=${config.apiToken}`;
    const data = { name: name, idList: listId }; // Add the list ID where you want to create the card
    post(url, data, callback);
}

module.exports = {
    getAllCardsFromBoard,
    updateCardStartDate,
    updateCardEndDate,
    updateCustomFieldValue,
    createCard, // Export the new function
};
