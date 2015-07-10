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
      console.log('JOBS!', data);
      AppDispatcher.handleServerAction({
        type: ActionTypes.RETRIVED_JOBS,
        jobs: data
      });
    });
  }
};