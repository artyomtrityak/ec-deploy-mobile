'use strict';

import CommanderClient from './commander-client';


export default {
  login(server, userName, password) {
    CommanderClient.setServer(server);

    return CommanderClient.fetch({
      operation: 'login',
      parameters: {
        userName: userName,
        password: password
      }
    }, false)
    .then((response) => {
      CommanderClient.setSessionId(response.sessionId);
      return response;
    });
  },

  logout() {
    return CommanderClient.fetch({
      operation: 'logout'
    });
  }
};