'use strict';

import EventEmitter from 'eventemitter2';
import Immutable from 'immutable';
import moment from 'moment/moment';

import AppDispatcher from 'dispatchers/app.dispatcher';
import { ActionTypes } from 'constants/app.constants';

import SettingsStore from 'stores/settings.store';
import PipelinesActions from 'actions/pipelines.actions';


// Private data and functions
var notificationState = Immutable.Map({notifications: [], loading: false});

function _showLoading () {
  notificationState = notificationState.set('loading', true);
}

function _hideLoading () {
  notificationState = notificationState.set('loading', false);
}

function _setNotifications (notifications) {
  notificationState = notificationState.set('notifications', notifications);
}

function _parseNotifications (pipelineRuns) {

  var approvals = [];
  if(pipelineRuns && pipelineRuns.length) {
    pipelineRuns.forEach((pipelineRun) => {
      if(pipelineRun.approvers) {
        approvals.push(pipelineRun);
      }
    });
  }
  let formatted = [],
    user = SettingsStore.getState().user.userName;
  approvals.forEach((approval) => {
    let approvers = approval.approvers.approverName;
    if (approvers.indexOf(user) !== -1) {
      formatted.push({
        text: `Pipeline Name: ${approval.pipelineName}  \n
Current Stage: ${approval.currentStage}. \n
Last modify time: ${moment(approval.modifyTime).format('MMM DD, YYYY h:mm A')}`,
        flowRuntimeId: approval.flowRuntimeId
      });
    }
  });

  return formatted;
}

// Store eventemitter
class NotificationStore extends EventEmitter {
  getState() {
    return notificationState.toJS();
  }

  emitChange() {
    this.emit('change');
  }
}
var store = new NotificationStore();

// Dispatcher
store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;

  console.log(action);

  switch (action.type) {
    case ActionTypes.RETRIEVING_NOTIFICATION:
      _showLoading();
      store.emitChange();
      break;

    case ActionTypes.RETRIEVED_NOTIFICATION:
      _hideLoading();
      _setNotifications(_parseNotifications(action.pipelineRuns));
      store.emitChange();
      break;

    case ActionTypes.AUTO_SYNC:
      _showLoading();
      PipelinesActions.fetchNotifications();
      break;
  }
});

export default store;