'use strict';

import EventEmitter from 'eventemitter2';
import Immutable from 'immutable';

import AppDispatcher from 'dispatchers/app.dispatcher';
import { ActionTypes } from 'constants/app.constants';


// Private data and functions
var settingsState = Immutable.Map({
  loading: false,
  pushNotifications: true,
  rememberMe: true,
  autoSync: false
});

function _showLoading () {
  settingsState = settingsState.set('loading', true);
}

function _hideLoading () {
  settingsState = settingsState.set('loading', false);
}

function _loginUser (user) {
  settingsState = settingsState.set('user', Immutable.fromJS(user));
}

function _logoutUser (user) {
  settingsState = settingsState.set('user', undefined);
}

function _changeCredential (field, value) {
  settingsState = settingsState.set(field, value);
}

// Store eventemitter
class SettingsStore extends EventEmitter {
  getState() {
    return settingsState.toJS();
  }

  emitChange() {
    this.emit('change');
  }
}
var store = new SettingsStore();

// Dispatcher
store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.LOGIN_PROCESSING:
    case ActionTypes.LOGOUT_PROCESSING:
      _showLoading();
      store.emitChange();
      break;

    case ActionTypes.LOGIN_ERROR:
    case ActionTypes.SERVER_ERROR:
      _hideLoading();
      store.emitChange();
      break;

    case ActionTypes.LOGIN_DONE:
      _loginUser(action.user);
      _hideLoading();
      store.emitChange();
      break;

    case ActionTypes.LOGOUT_DONE:
      _logoutUser();
      _hideLoading();
      store.emitChange();
      break;

    case ActionTypes.REMEMBER_ME_SETTING:
      _changeCredential('rememberMe', action.value);
      store.emitChange();
      break;

    case ActionTypes.AUTO_SYNC_SETTING:
      _changeCredential('autoSync', action.value);
      store.emitChange();
      break;

    case ActionTypes.PUSH_NOTIFICATIONS_SETTING:
      _changeCredential('pushNotifications', action.value);
      store.emitChange();
      break;

    case ActionTypes.CREDENTIALS_CHANGE:
      _changeCredential(action.field, action.value);
      store.emitChange();
      break;
  }
});

export default store;