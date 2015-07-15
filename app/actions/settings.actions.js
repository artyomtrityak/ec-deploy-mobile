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
  },

  changeAutoSync(value) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.AUTO_SYNC_SETTING,
      value: value
    });
  },

  changePushNotifications(value) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PUSH_NOTIFICATIONS_SETTING,
      value: value
    });
  }
};