'use strict';

let requestId = 1;
let userSessionId;

export default {
  setSessionId(sessionId) {
    userSessionId = sessionId;
  },

  fetch(data) {
    let requestBody = '';

    data.requestId = requestId;
    requestId += 1;

    if (userSessionId) {
      requestBody = 'COMMANDER_SESSION_ID=' + userSessionId + '\n';
    }
    requestBody += JSON.stringify([[data], {}]);

    return fetch('http://localhost:3001/api', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody
    })
    .then((rawResponse) => {
      return rawResponse.json();
    })
    .then((response) => {
      return response;
    });
  }

};