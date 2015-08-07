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

function _parseApprovals (pipelineRuns) {
  var approvals = [];
  if(pipelineRuns && pipelineRuns.length) {
    pipelineRuns.forEach((pipelineRun) => {
      if(pipelineRun.approvers) {
        approvals.push(pipelineRun);
      }
    });
  }

  return approvals;
}

// Store eventemitter
class PipelineStore extends EventEmitter {
  getState() {
    return pipelineState.toJS();
  }

  emitChange() {
    this.emit('change');
  }

  emitRedirect () {

    this.emit('redirect');
  }
}
var store = new PipelineStore();

// Dispatcher
store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.RUNNING_PIPELINE:
    case ActionTypes.RETRIEVING_PIPELINES:
    case ActionTypes.RETRIEVING_PIPELINE_RUNS:
    case ActionTypes.RETRIEVING_PIPELINE_DASHBOARD_DATA:
    case ActionTypes.RETRIEVING_APPROVALS:
      _showLoading();
      store.emitChange();
      break;


    case ActionTypes.RETRIEVED_PIPELINES:
      _hideLoading();

      _setPipelines(action.pipelines);
      store.emitChange();
      break;

    case ActionTypes.RUN_PIPELINE:
      _hideLoading();

      store.emitRedirect();
      break;

    case ActionTypes.RETRIEVED_PIPELINE_RUNS:
      _hideLoading();

      _setPipelineRuns(action.pipelineRuns);
      store.emitChange();
      break;

    case ActionTypes.RETRIEVED_APPROVALS:
      _hideLoading();

      _setApprovals(action.approvals);
      store.emitChange();
      break;

    case ActionTypes.RETRIEVED_PIPELINE_DASHBOARD_DATA:
      _hideLoading();
      _setPipelines(action.pipelines);
      _setPipelineRuns(action.pipelineRuns);
      _setApprovals(_parseApprovals(action.pipelineRuns));

      store.emitChange();
      break;

    case ActionTypes.SERVER_ERROR:
      _hideLoading();
      store.emitChange();
      break;
  }
});

export default store;