// Client ID and API key from the Developer Console
var CLIENT_ID = '151578627180-th20sv0vu907ljef4mjm9i6lh7chmuml.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAytjeUwFlFJDZVQxZFMe34F0KcdEIXd5c';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre('content', JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listPlaces();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(id, message) {
  var pre = document.getElementById(id);
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * List places from a sheet
 */
function listPlaces() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1lErteSHrIT8-gVrJ43R_Powy3D22nRTFiKzaFjcKxsk',
    range: 'paikat!A2:C',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      appendPre('content', 'Name, Lat, Lon:');
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        name = row[0];
        lat = row[1];
        lon = row[2];
        // Print columns A, B, C
        appendPre('content', name + ', ' + lat + ', ' + lon);

        if (lat !== undefined && lon !== undefined) {
          addMarker(lat, lon);
        } else {
          addUnknown(name);
        }
      }
    } else {
      appendPre('content', 'No data found.');
    }
  }, function(response) {
    appendPre('content', 'Error: ' + response.result.error.message);
  });
}


function addUnknown(name) {
  $('#tuntemattomat').append($('<option>', {
    value: name,
    text: name
  }));
}

function recordPosition(latLng) {
  console.log(latLng);
  name = $("#tuntemattomat :selected").text();

  appendPre('output', name + ", " + latLng.lat + ", " + latLng.lng);
}
