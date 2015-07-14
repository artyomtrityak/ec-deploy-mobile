'use strict';

import Promise from 'bluebird';
import { AlertIOS } from 'react-native';
import AppDispatcher from 'dispatchers/app.dispatcher';
import { ActionTypes } from 'constants/app.constants';

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

    requestBody = {
      value: [[data], {}]
    };
    if (userSessionId && useSessionId) {
      requestBody.sessionId = 'COMMANDER_SESSION_ID=' + userSessionId;
    }

    requestBody = JSON.stringify(requestBody);

    //TODO: change it to Commander Server IP
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
      onDone.resolve(parseResponse(response));
    })
    .catch(handleServerError.bind(null, onDone));

    return onDone.promise;
  }
};

function parseResponse (response) {
  if (!response.responses) {
    throw 'Unknown server error';
  }
  response = response.responses[0];
  if (response.error) {
    throw response.error.message;
  }
  return response;
}

function handleServerError (onDone, error) {
  if (typeof error !== 'string') {
    error = 'Unknown error';
  }
  AlertIOS.alert('Server error', error);
  AppDispatcher.handleServerAction({
    type: ActionTypes.SERVER_ERROR,
    error: error
  });
  onDone.reject(error);
}