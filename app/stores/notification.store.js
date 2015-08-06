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

function _parseNotifications (notifications) {
  let formatted = [],
    user = SettingsStore.getState().user.userName;
  notifications.forEach((notification) => {
    let approvers = notification.approvers.approverName;
    if (approvers.indexOf(user) !== -1) {
      formatted.push({
        text: `There are need Your approval in ${notification.pipelineName} Pipeline.
Current stage is ${notification.currentStage}.
Last modify time is ${moment(notification.modifyTime).format('MMM DD, YYYY h:mm A')}`
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
      _setNotifications(_parseNotifications(action.approvals));
      store.emitChange();
      break;

    case ActionTypes.AUTO_SYNC:
      _showLoading();
      PipelinesActions.fetchNotifications();
      break;
  }
});

export default store;