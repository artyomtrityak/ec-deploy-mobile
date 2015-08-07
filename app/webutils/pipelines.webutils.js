'use strict';

import Promise from 'bluebird';
import CommanderClient from './commander-client';
import { AsyncStorage } from 'react-native';


export default {
  getRuntimeDetails(flowRuntimeId) {
    return CommanderClient.fetch({
      operation: 'getPipelineRuntimeDetails',
      parameters: {
        flowRuntimeId: flowRuntimeId
      }
    })
    .then((response) => {
      return response.flowRuntime[0];
    });
  },

  approveOrReject(flowRuntimeId, stageName, taskName, gateType, solution, comment) {
    console.log({
      operation: 'completeManualTask',
      parameters: {
        flowRuntimeId: flowRuntimeId,
        stageName: stageName,
        taskName: taskName,
        gateType: gateType,
        actualParameter: [
          {
            actualParameterName: 'action',
            value: solution
          },
          {
            actualParameterName: 'evidence',
            value: comment
          }
        ]
      }
    });

    return CommanderClient.fetch({
      operation: 'completeManualTask',
      parameters: {
        flowRuntimeId: flowRuntimeId,
        stageName: stageName,
        taskName: taskName,
        gateType: gateType,
        actualParameter: [
          {
            actualParameterName: 'action',
            value: solution
          },
          {
            actualParameterName: 'evidence',
            value: comment
          }
        ]
      }
    })
    .then((response) => {
      console.log(response);
      return response;
    });
  },

  getPipelines() {
    return CommanderClient.fetch({
      operation: 'findObjects',
      parameters: {
        objectType: 'pipeline',
        includeAccess: true,
        filter: [
          {
            operator: 'equals',
            propertyName: 'projectName',
            operand1: 'Default'
          }
        ],
        sort: [
          {
            propertyName: 'pipelineName',
            order: 'ascending'
          }
        ]
      }
    })
    .then((response) => {
      return response.object;
    });
  },

  runPipeline(pipelineName) {
    return CommanderClient.fetch({
      operation: 'runPipeline',
      parameters: {
        'projectName': 'Default',
        'pipelineName': pipelineName,
        'actualParameter': []
      }
    })
    .then((response) => {
      return response.flowRuntime;
    });
  },

  getPipelineRuns(onlyApprovals=false) {
    var sort;
    if (onlyApprovals) {
      sort = {
        'operator': 'equals',
        'propertyName': 'hasManualApproval',
        'operand1': '1'
      };
    }
    return CommanderClient.fetch({
      operation: 'getPipelineRuntimes',
      parameters: {
        'projectName': 'Default',
        'sortOrder': 'descending',
        'sortKey': 'createTime',
        'maxResults': 50,
        'filter': sort
      }
    })
    .then((response) => {
      return response.flowRuntime;
    });
  }
};