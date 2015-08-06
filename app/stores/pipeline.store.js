'use strict';

import EventEmitter from 'eventemitter2';
import Immutable from 'immutable';

import AppDispatcher from 'dispatchers/app.dispatcher';
import { ActionTypes } from 'constants/app.constants';

// Private data and functions
var pipelineState = Immutable.Map({loading: false});

function _showLoading () {
  pipelineState = pipelineState.set('loading', true);
}

function _hideLoading () {
  pipelineState = pipelineState.set('loading', false);
}

function _setPipelines (pipelines) {
  pipelineState = pipelineState.set('pipelines', pipelines);
}

function _setPipelineRuns (pipelineRuns) {
  pipelineState = pipelineState.set('pipelineRuns', pipelineRuns);
}

function _setApprovals (approvals) {
  pipelineState = pipelineState.set('approvals', approvals);
}

// Store eventemitter
class PipelineStore extends EventEmitter {
  getState() {
    return pipelineState.toJS();
  }

  emitChange() {
    this.emit('change');
  }
}
var store = new PipelineStore();

// Dispatcher
store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.RETRIEVING_PIPELINES:
    case ActionTypes.RETRIEVING_PIPELINE_DASHBOARD_DATA:
      _showLoading();
      store.emitChange();
      break;


    case ActionTypes.RETRIEVED_PIPELINES:
      _hideLoading();
      console.log('pipe', action);

      _setPipelines(action.pipelines);
      store.emitChange();
      break;

    case ActionTypes.RETRIEVED_PIPELINE_DASHBOARD_DATA:
      _hideLoading();
      _setPipelines(action.pipelines);
      _setPipelineRuns(action.pipelineRuns);
      _setApprovals(action.approvals);

      store.emitChange();
      break;

    case ActionTypes.SERVER_ERROR:
      _hideLoading();
      store.emitChange();
      break;
  }
});

export default store;