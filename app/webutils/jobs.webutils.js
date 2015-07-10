'use strict';

import CommanderClient from './commander-client';


export default {
  getJobs() {
    return CommanderClient.fetch({
      operation: 'getJobs'
    })
    .then((response) => {
      return response;
    });
  }
};