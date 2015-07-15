'use strict';

import AppDispatcher from 'dispatchers/app.dispatcher';
import JobsWebUtils from 'webutils/jobs.webutils';
import { ActionTypes } from 'constants/app.constants';


export default {
  getJobs() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIVING_JOBS
    });

    JobsWebUtils.getJobs()
    .then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIVED_JOBS,
        jobs: data
      });
    });
  },

  getJobDetails(jobId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIVING_JOB
    });

    JobsWebUtils.getJobDetails(jobId)
    .then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIVED_JOB,
        job: data
      });
    });
  }
};