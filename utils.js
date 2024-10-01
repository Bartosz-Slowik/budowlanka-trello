const https = require('https');

// Helper function to perform GET requests
function get(url, callback) {
    https.get(url, (res) => {
        let data = '';

        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            callback(null, JSON.parse(data));
        });
    }).on('error', (err) => {
        callback(err, null);
    });
}

// Helper function to perform PUT requests
function put(url, data, callback) {
    const jsonData = JSON.stringify(data);

    const req = https.request(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': jsonData.length,
        },
    }, (res) => {
        let response = '';

        res.on('data', chunk => {
            response += chunk;
        });

        res.on('end', () => {
            callback(null, JSON.parse(response));
        });
    });

    req.on('error', (err) => {
        callback(err, null);
    });

    req.write(jsonData);
    req.end();
}

// Convert Clarion date to standard JavaScript date
function convertClarionDate(clarionDate) {
    const baseDate = new Date(1800, 11, 28); // December 28, 1800
    const resultDate = new Date(baseDate);
    resultDate.setDate(baseDate.getDate() + clarionDate);
    return resultDate;
}

module.exports = {
    get,
    put,
    convertClarionDate,
};
