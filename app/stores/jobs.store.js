'use strict';

import EventEmitter from 'eventemitter2';
import Immutable from 'immutable';

import AppDispatcher from 'dispatchers/app.dispatcher';
import { ActionTypes } from 'constants/app.constants';


// Private data and functions
var jobsState = Immutable.Map({loading: false});

function _showLoading () {
  jobsState = jobsState.set('loading', true);
}

function _hideLoading () {
  jobsState = jobsState.set('loading', false);
}

// Store eventemitter
class JobsStore extends EventEmitter {
  getState() {
    return jobsState.toJS();
  }

  emitChange() {
    this.emit('change');
  }
}
var store = new JobsStore();

// Dispatcher
store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.LOGIN_ERROR:
      _hideLoading();
      store.emitChange();
      break;
  }
});

export default store;