'use strict';

import CommanderClient from './commander-client';


export default {
  login(userName, password) {
    return CommanderClient.fetch({
      operation: 'login',
      parameters: {
        userName: userName,
        password: password
      }
    })
    .then((response) => {
      if (response.responses) {
        response = response.responses[0];  
      } else {
        throw 'Invalid username or password';
      }
      CommanderClient.setSessionId(response.sessionId);

      return response;
    });
  }
};