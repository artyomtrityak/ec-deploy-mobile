'use strict';

import Promise from 'bluebird';
import { AlertIOS } from 'react-native';

var userSessionId,
    serverAddr,
    requestId = 1;

export default {
  setSessionId(sessionId) {
    userSessionId = sessionId;
  },

  setServer(server) {
    serverAddr = server;
  },

  fetch(data, useSessionId=true) {
    var onDone = Promise.pending(),
        requestBody = '';

    data.requestId = requestId;
    requestId += 1;

    if (userSessionId && useSessionId) {
      requestBody = 'COMMANDER_SESSION_ID=' + userSessionId + '\n';
    }
    requestBody += JSON.stringify([[data], {}]);

    fetch('http://localhost:3001/api', {
      method: 'post',
      headers: {
        'Server-IP': serverAddr,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody
    })
    .then((rawResponse) => {
      return rawResponse.json();
    })
    .then((response) => {
      onDone.resolve(
        parseResponse(response)
      );
    })
    .catch((error) => {
      AlertIOS.alert('Server error', error);
      onDone.reject(error);
    });

    return onDone.promise;
  }
};

function parseResponse(response) {
  if (!response.responses) {
    throw response;
  }
  response = response.responses[0];
  if (response.error) {
    throw response.error.message;
  }
  return response;
}