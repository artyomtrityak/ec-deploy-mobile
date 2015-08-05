'use strict';

import CommanderClient from './commander-client';


export default {
  getJobs() {
    return CommanderClient.fetch({
      operation: 'findObjects',
      parameters: {
        objectType: 'job',
        computed: true,
        sort: [
          {
            propertyName: 'status',
            order: 'descending'
          },
          {
            propertyName: 'finish',
            order: 'descending'
          },
          {
            propertyName: 'priority',
            order: 'ascending'
          },
          {
            propertyName: 'createTime',
            order: 'descending'
          }
        ]
      }
    })
    .then((response) => {
      let jobs = [];
      response.object.forEach((item) => jobs.push(item.job));
      return jobs;
    });
  },

  getJobDetails(jobId) {
    return CommanderClient.fetch({
      operation: 'getJobDetails',
      parameters: {
        jobId: jobId,
        progressPercentage: '1'
      }
    })
    .then((response) => {
      return response.job;
    });
  }
};