'use strict';

import AppDispatcher from 'dispatchers/app.dispatcher';
import UserWebUtils from 'webutils/user.webutils';
import { ActionTypes } from 'constants/app.constants';


export default {
  initialize() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.INIT_PROCESSING
    });
    UserWebUtils.getSettings()
    .spread((rememberMe, autoSync, pushNotifications) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.INIT_DONE,
        rememberMe: rememberMe,
        autoSync: autoSync,
        pushNotifications: pushNotifications
      });
    });
  },

  login(server, login, password) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_PROCESSING
    });

    UserWebUtils.login(server, login, password)
    .then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.LOGIN_DONE,
        user: data
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
  },

  changePushNotifications(value) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PUSH_NOTIFICATIONS_SETTING,
      value: value
    });
    UserWebUtils.saveLocalSetting('@flow:pushNotifications', value);
  }
};