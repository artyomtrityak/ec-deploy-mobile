'use strict';

import AppDispatcher from 'dispatchers/app.dispatcher';
import PipelinesWebUtils from 'webutils/pipelines.webutils';
import { ActionTypes } from 'constants/app.constants';


export default {
  getRuntimeDetails(flowRuntimeId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIEVING_PIPELINE_DETAILS
    });

    PipelinesWebUtils.getRuntimeDetails(flowRuntimeId)
    .then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIEVED_PIPELINE_DETAILS,
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
  },

  getPipelines() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIEVING_PIPELINES
    });

    PipelinesWebUtils.getPipelines()
    .then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIEVED_PIPELINES,
        pipelines: data
      });
    });
  },
  //
  //getPipelineRuns() {
  //  console.log('getPipelines');
  //  AppDispatcher.handleViewAction({
  //    type: ActionTypes.RETRIEVING_PIPELINE_RUNS
  //  });
  //
  //  PipelinesWebUtils.getPipelineRuns()
  //  .then((data) => {
  //    AppDispatcher.handleServerAction({
  //      type: ActionTypes.RETRIEVED_PIPELINE_RUNS,
  //      pipelineRuns: data
  //    });
  //  });
  //},
  //
  getPipelineDashboardData() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIEVING_PIPELINE_DASHBOARD_DATA
    });
    PipelinesWebUtils.getPipelines()
    .then((pipelines) => {
      return [pipelines, PipelinesWebUtils.getPipelineRuns()];
    })
    .spread((pipelines, pipelineRuns) => {
        var approvals = [];
        if(pipelineRuns && pipelineRuns.length) {
          pipelineRuns.forEach((pipelineRun) => {
            if(pipelineRun.approvers) {
              approvals.push(pipelineRun);
            }
          });
        }

        AppDispatcher.handleServerAction({
          type: ActionTypes.RETRIEVED_PIPELINE_DASHBOARD_DATA,
          pipelines: pipelines,
          pipelineRuns: pipelineRuns,
          approvals: approvals
        });
    });
  }
};