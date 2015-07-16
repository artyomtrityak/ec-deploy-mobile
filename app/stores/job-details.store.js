'use strict';

import EventEmitter from 'eventemitter2';
import Immutable from 'immutable';

import AppDispatcher from 'dispatchers/app.dispatcher';
import {ActionTypes} from 'constants/app.constants';


// Private data and functions
var JobDetailsState = Immutable.Map({loading: false});

function _showLoading () {
  JobDetailsState = JobDetailsState.set('loading', true);
}

function _hideLoading () {
  JobDetailsState = JobDetailsState.set('loading', false);
}

function _setJob (job) {
  JobDetailsState = JobDetailsState.set('job', job); 
}

// Store eventemitter
class JobDetailsStore extends EventEmitter {
  getState() {
    return JobDetailsState.toJS();
  }

  emitChange() {
    this.emit('change');
  }
}
var store = new JobDetailsStore();

// Dispatcher
store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.RETRIVING_JOB:
      _showLoading();
      store.emitChange();
      break;

    case ActionTypes.RETRIVED_JOB:
      _hideLoading();
      _setJob(action.job);
      store.emitChange();
      break;

    case ActionTypes.SERVER_ERROR:
      _hideLoading();
      store.emitChange();
      break;
  }
});

export default store;