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

  getPipelineRuns() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIEVING_PIPELINE_RUNS
    });

    PipelinesWebUtils.getPipelineRuns()
    .then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIEVED_PIPELINE_RUNS,
        pipelineRuns: data
      });
    });
  },

  runPipeline(pipelineName) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RUNNING_PIPELINE
    });

    PipelinesWebUtils.runPipeline(pipelineName)
    .then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RUN_PIPELINE,
        pipelineRuns: data
      });
    });
  },

  getApprovals() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIEVING_APPROVALS
    });

    PipelinesWebUtils.getPipelineRuns(true)
    .then((pipelineRuns) => {
      let approvals = [];
      if(pipelineRuns && pipelineRuns.length) {
        pipelineRuns.forEach((pipelineRun) => {
          if (pipelineRun.approvers) {
            approvals.push(pipelineRun);
          }
        });
      }
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIEVED_APPROVALS,
        approvals: approvals
      });
    });
  },

  getPipelineDashboardData() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIEVING_PIPELINE_DASHBOARD_DATA
    });
    this.fetchPipelineData(true).then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIEVED_PIPELINE_DASHBOARD_DATA,
        pipelines: data.pipelines,
        pipelineRuns: data.pipelineRuns
      });
    });
  },

  manualNotificationsFetch() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIEVING_NOTIFICATION
    });
    this.fetchNotifications();
  },

  fetchNotifications() {
    this.fetchPipelineData(true).then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIEVED_NOTIFICATION,
        pipelines: data.pipelines,
        pipelineRuns: data.pipelineRuns
      });
    });
  },

  fetchPipelineData(onlyApprovers) {
    return PipelinesWebUtils.getPipelines()
      .then((pipelines) => {
        return [pipelines, PipelinesWebUtils.getPipelineRuns(onlyApprovers)];
      })
      .spread((pipelines, pipelineRuns) => {
        return {
          pipelines: pipelines,
          pipelineRuns: pipelineRuns
        };
      });
  }
};