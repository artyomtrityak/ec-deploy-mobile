'use strict';

import AppDispatcher from 'dispatchers/app.dispatcher';
import JobsWebUtils from 'webutils/jobs.webutils';
import { ActionTypes } from 'constants/app.constants';


export default {
  getJobs() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIEVING_JOBS
    });

    JobsWebUtils.getJobs()
    .then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIEVED_JOBS,
        jobs: data
      });
    });
  },

  getJobDetails(jobId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RETRIEVING_JOB
    });

    JobsWebUtils.getJobDetails(jobId)
    .then((data) => {
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIEVED_JOB,
        job: data
      });
    });
  }
};