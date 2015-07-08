'use strict';

import EventEmitter from 'eventemitter2';
import Immutable from 'immutable';

import AppDispatcher from 'dispatchers/app.dispatcher';
import { ActionTypes } from 'constants/app.constants';

// Private data and functions
var settingsState = Immutable.Map({loading: false});

function _showLoading () {
  settingsState = settingsState.set('loading', true);
}

function _hideLoading () {
  settingsState = settingsState.set('loading', false);
}

function _loginUser (user) {
  settingsState = settingsState.set('user', Immutable.fromJS(user));
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

  console.log(action);

  switch (action.type) {

    case ActionTypes.LOGIN_PROCESSING:
      _showLoading();
      console.log('login processing');
      store.emitChange();
      break;

    case ActionTypes.LOGIN_ERROR:
      _hideLoading();

      store.emitChange();
      break;

    case ActionTypes.LOGIN_DONE:
      _loginUser(action.user);
      _hideLoading();

      store.emitChange();
      break;
  }
});

export default store;