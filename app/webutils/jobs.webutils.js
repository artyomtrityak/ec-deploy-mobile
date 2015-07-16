'use strict';

import CommanderClient from './commander-client';


export default {
  getJobs() {
    return CommanderClient.fetch({
      operation: 'getJobs'
    })
    .then((response) => {
      return response.job;
    });
  },

  getJobDetails(jobId) {
    return CommanderClient.fetch({
      operation: 'getJobDetails',
      parameters: {
        jobId: jobId
      }
    })
    .then((response) => {
      return response.job;
    });
  }
};