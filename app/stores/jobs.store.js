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

function _setJobs (jobs) {
  jobsState = jobsState.set('jobs', jobs); 
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
    case ActionTypes.RETRIEVING_JOBS:
      _showLoading();
      store.emitChange();
      break;

    case ActionTypes.RETRIEVED_JOBS:
      _hideLoading();
      _setJobs(action.jobs);
      store.emitChange();
      break;

    case ActionTypes.SERVER_ERROR:
      _hideLoading();
      store.emitChange();
      break;
  }
});

export default store;