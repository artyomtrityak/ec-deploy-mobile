'use strict';

import AppDispatcher from 'dispatchers/app.dispatcher';
import UserWebUtils from 'webutils/user.webutils';
import { ActionTypes } from 'constants/app.constants';


export default {
  login(server, login, password) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_PROCESSING
    });
    
    UserWebUtils.login(server, login, password)
    .then((user) => {
      return [user, UserWebUtils.getSettings()]; 
    })
    .spread((user, settings) => {
      var [ rememberMe, autoSync, jobsNotifications ] = settings;

      if (autoSync) {
        this.autoSync();
      } else {
        this.disableAutoSync();
      }

      AppDispatcher.handleServerAction({
        type: ActionTypes.LOGIN_DONE,
        user: user,
        rememberMe: rememberMe,
        autoSync: autoSync,
        jobsNotifications: jobsNotifications
      });
    })
    .catch((error) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.LOGIN_ERROR,
        error: error
      });
    });
  },

  logout() {
    this.disableAutoSync();
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT_PROCESSING
    });
    UserWebUtils.logout()
    .then(() => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.LOGOUT_DONE
      });
    });
  },

  credentialsChange(field, value) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREDENTIALS_CHANGE,
      field: field,
      value: value
    });
  },

  changeRememberMe(value) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REMEMBER_ME_SETTING,
      value: value
    });
    UserWebUtils.saveLocalSetting('@flow:rememberMe', value);
  },

  changeAutoSync(value) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.AUTO_SYNC_SETTING,
      value: value
    });
    UserWebUtils.saveLocalSetting('@flow:autoSync', value);
    if (value) {
      this.autoSync();
    } else {
      this.disableAutoSync();
    }
  },

  changeJobsNotifications(value) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PUSH_NOTIFICATIONS_SETTING,
      value: value
    });
    UserWebUtils.saveLocalSetting('@flow:jobsNotifications', value);
  },

  autoSync() {
    this.autoSyncer = setInterval(() => {
      AppDispatcher.handleViewAction({
        type: ActionTypes.AUTO_SYNC
      });
    }, 30 * 1000); //every 30 sec
  },

  disableAutoSync() {
    if (this.autoSyncer) {
      clearInterval(this.autoSyncer);  
    }
  }
};