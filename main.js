// main.js
require('dotenv').config(); // Load environment variables from .env file
const { getAllCardsFromBoard, updateCardStartDate, updateCardEndDate, updateCustomFieldValue } = require('./trelloapi');
const { convertClarionDate } = require('./utils');
const config = require('./config');

// Get command-line parameters
const customFieldMatchName = process.argv[2]; // Custom field name to match
const weirdStartDate = process.argv[3]; // Clarion start date (if provided)
const weirdEndDate = process.argv[4]; // Clarion end date (if provided)
const newCustomFieldValue = process.argv[5]; // New value for PLAN_GODZ if custom field matches

const startDaysToAdd = parseInt(weirdStartDate, 10);
const endDaysToAdd = parseInt(weirdEndDate, 10);

if (isNaN(startDaysToAdd) && weirdStartDate !== undefined) {
    console.error("The start date must be a valid number.");
    process.exit(1);
}
if (isNaN(endDaysToAdd) && weirdEndDate !== undefined) {
    console.error("The end date must be a valid number.");
    process.exit(1);
}

const newStartDate = !isNaN(startDaysToAdd) ? convertClarionDate(startDaysToAdd) : null;
const newEndDate = !isNaN(endDaysToAdd) ? convertClarionDate(endDaysToAdd) : null;

console.log("New Start Date:", newStartDate);
console.log("New End Date:", newEndDate);

// Process cards and update their start and end dates if the custom field matches
function processCards(cards, callback) {
    let foundMatch = false; // Flag to check if a match is found

    cards.forEach(card => {
        const matchingField = card.customFieldItems.find(field => field.idCustomField);
        const customFieldValue = matchingField && matchingField.value ? matchingField.value.text : null;

        if (customFieldValue === customFieldMatchName) {
            foundMatch = true; // Set flag if a match is found

            if (newStartDate) {
                console.log(`Updating start date of card '${card.name}' to ${newStartDate}...`);
                updateCardStartDate(card.id, newStartDate, (err) => {
                    if (err) {
                        console.error(`Error updating start date for card '${card.name}':`, err.message);
                    } else {
                        console.log(`Start date updated successfully for card '${card.name}'.`);
                    }
                });
            }
            if (newEndDate) {
                console.log(`Updating end date of card '${card.name}' to ${newEndDate}...`);
                updateCardEndDate(card.id, newEndDate, (err) => {
                    if (err) {
                        console.error(`Error updating end date for card '${card.name}':`, err.message);
                    } else {
                        console.log(`End date updated successfully for card '${card.name}'.`);
                    }
                });
            }
            // Update PLAN_GODZ field with new value
            if (newCustomFieldValue) {
                console.log(`Updating PLAN_GODZ field of card '${card.name}' to '${newCustomFieldValue}'...`);
                updateCustomFieldValue(card.id, config.planGodzFieldId, newCustomFieldValue, (err) => {
                    if (err) {
                        console.error(`Error updating PLAN_GODZ for card '${card.name}':`, err.message);
                    } else {
                        console.log(`PLAN_GODZ updated successfully for card '${card.name}'.`);
                    }
                });
            }
        }
    });

    // Removed the section to create a new card if no match was found
    // if (!foundMatch) {
    //     console.log(`No card found with custom field matching '${customFieldMatchName}'. Creating a new card...`);
    //     createCard(config.defaultListId, customFieldMatchName, (err) => {
    //         if (err) {
    //             console.error(`Error creating new card:`, err.message);
    //         } else {
    //             console.log(`New card '${customFieldMatchName}' created successfully in the default list.`);
    //         }
    //     });
    // }

    callback();
}

// Main flow: Get all cards from the board
getAllCardsFromBoard(config.boardId, (err, cards) => {
    if (err) {
        console.error('Error getting cards:', err.message);
        return;
    }

    processCards(cards, (err) => {
        if (err) {
            console.error('Error processing cards:', err.message);
        }
    });
});

setTimeout(() => {
    console.log("Exiting...");
}, 1000);
