'use strict';

import EventEmitter from 'eventemitter2';
import Immutable from 'immutable';

import AppDispatcher from 'dispatchers/app.dispatcher';
import { ActionTypes } from 'constants/app.constants';


// Private data and functions
var approvalState = Immutable.Map({loading: true});

function _showLoading () {
  approvalState = approvalState.set('loading', true);
}

function _hideLoading () {
  approvalState = approvalState.set('loading', false);
}

function _setApproval (details) {
  approvalState = approvalState.set('stageName', details.activeStage);
  approvalState = approvalState.set('pipelineName', details.name);

  details.stages.stage.forEach((stage) => {
    stage.gates.gate.forEach((gate) => {
      gate.tasks.task.forEach((task) => {
        if (task.status.toLowerCase() === 'pending') {
          approvalState = approvalState.set('taskName', task.name);
          approvalState = approvalState.set('approvers', task.approvers);
          approvalState = approvalState.set('gateType', gate.gateType);
        }
      });
    });
  });
}

function _changeComment (text) {
  approvalState = approvalState.set('comment', text); 
}

// Store eventemitter
class GateApprovalStore extends EventEmitter {
  getState() {
    return approvalState.toJS();
  }

  emitChange() {
    this.emit('change');
  }
}
var store = new GateApprovalStore();

// Dispatcher
store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;

  console.log(action);

  switch (action.type) {
    case ActionTypes.RETRIVING_PIPELINE_DETAILS:
      _showLoading();
      store.emitChange();
      break;

    case ActionTypes.RETRIVED_PIPELINE_DETAILS:
      _hideLoading();
      _setApproval(action.details);
      store.emitChange();
      break;

    case ActionTypes.APPROVAL_CHANGE_COMMENT:
      _changeComment(action.text);
      store.emitChange();
      break;

      
  }
});

export default store;