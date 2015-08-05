'use strict';

import AppDispatcher from 'dispatchers/app.dispatcher';
import PipelinesWebUtils from 'webutils/pipelines.webutils';
import { ActionTypes } from 'constants/app.constants';


export default {
  getRuntimeDetails(flowRuntimeId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIVING_PIPELINE_DETAILS
    });

    PipelinesWebUtils.getRunimeDetails(flowRuntimeId)
    .then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIVED_PIPELINE_DETAILS,
        details: data
      });
    });
  },

  commentChange(text) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.APPROVAL_CHANGE_COMMENT,
      text: text
    });
  },

  approveOrRejectAction(flowRuntimeId, stageName, taskName, gateType, solution, comment) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.APPROVING
    });
    PipelinesWebUtils.approveOrReject(flowRuntimeId, stageName, taskName, gateType, solution, comment)
    .then((data) => {
      AppDispatcher.handleViewAction({
        type: ActionTypes.APPROVED,
        solution: solution
      });
    });
  }
};