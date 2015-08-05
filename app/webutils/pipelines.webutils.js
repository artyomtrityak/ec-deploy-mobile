'use strict';

import Promise from 'bluebird';
import CommanderClient from './commander-client';
import { AsyncStorage } from 'react-native';


export default {
  getRunimeDetails(flowRuntimeId) {
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
  }
};