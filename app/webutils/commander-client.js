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

    console.log(userSessionId, useSessionId);
    requestBody = {
      value: [[data], {}]
    };
    if (userSessionId && useSessionId) {
      requestBody.sessionId = 'COMMANDER_SESSION_ID=' + userSessionId;
    }

    requestBody = JSON.stringify(requestBody);

    fetch('http://localhost:3001/api', {
      method: 'post',
      headers: {
        'Server-IP': serverAddr,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
      if (typeof error !== 'string') {
        error = 'Unknown error';
      }
      AlertIOS.alert('Server error', error);
      onDone.reject(error);
    });

    return onDone.promise;
  }
};

function parseResponse(response) {
  if (!response.responses) {
    throw 'Unknown server error';
  }
  response = response.responses[0];
  if (response.error) {
    throw response.error.message;
  }
  return response;
}