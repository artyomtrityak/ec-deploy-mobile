'use strict';

import EventEmitter from 'eventemitter2';
import Immutable from 'immutable';

import AppDispatcher from '../dispatchers/app.dispatcher';
import { ActionTypes } from '../constants/app.constants';

// Private data and functions
var appState = Immutable.Map({loading: true});

function _showLoading () {
  appState = appState.set('loading', true);
}

function _hideLoading () {
  appState = appState.set('loading', false);
}

// Store eventemitter
class AppStore extends EventEmitter {
  getState() {
    return appState;
  }

  emitChange() {
    this.emit('change');
  }
}
var store = new AppStore();

// Dispatcher
store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;

  console.log(action);

  switch (action.type) {

    case ActionTypes.LOGIN_PROCESSING:
      _showLoading();
      store.emitChange();
      break;

    case ActionTypes.LOGIN_ERROR:
      _hideLoading();

      store.emitChange();
      break;

    case ActionTypes.APP_LOADED:
      _hideLoading();

      store.emitChange();
      break;

    case ActionTypes.LOGIN_DONE:
      _hideLoading();

      store.emitChange();
      break;
  }
});

export default store;