// to contain most of the logic for fetching the data from each API endpoint

// makes a single API request to retrieve user's IP
// Input:
// callback (to pass back error or IP string)
// Returns: (via callback)
// - error (if any)
// IP address as a string (null if error)
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  // curl 'https://api.ipify.org?format=json'
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data
    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

module.exports = { fetchMyIP };