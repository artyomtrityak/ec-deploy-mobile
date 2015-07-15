'use strict';

import Promise from 'bluebird';
import CommanderClient from './commander-client';
import { AsyncStorage } from 'react-native';


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
  },

  saveLocalSetting(settingName, value) {
    AsyncStorage.setItem(settingName, value.toString());
    this.getSettings();
  },

  getSettings() {
    var onDone = Promise.pending();

    AsyncStorage.multiGet([
      '@flow:rememberMe',
      '@flow:pushNotifications',
      '@flow:autoSync'
    ])
    .then((result) => {
      //TODO: for some reason it does not work correct in emulator
      onDone.resolve([
        result[0][1] === 'true',
        result[1][1] === 'true',
        result[2][1] === 'true'
      ]);
    });

    return onDone.promise;


  }
};