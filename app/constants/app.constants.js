'use strict';

import keyMirror from 'keymirror';

export default {
    ActionTypes: keyMirror({
        APP_LOADED: null,
        INIT_PROCESSING: null,
        INIT_DONE: null,
        LOGIN_PROCESSING: null,
        LOGIN_DONE: null,
        LOGIN_ERROR: null,
        LOGOUT_PROCESSING: null,
        LOGOUT_DONE: null,
        CREDENTIALS_CHANGE: null,
        REMEMBER_ME_SETTING: null,
        PUSH_NOTIFICATIONS_SETTING: null,
        AUTO_SYNC_SETTING: null,
        RETRIEVING_JOB: null,
        RETRIEVING_JOBS: null,
        RETRIEVED_JOB: null,
        RETRIEVED_JOBS: null,
        RETRIEVING_PIPELINES: null,
        RETRIEVED_PIPELINES: null,
        RETRIEVING_PIPELINE_RUNS: null,
        RETRIEVED_PIPELINE_RUNS: null,
        RETRIEVING_PIPELINE_DASHBOARD_DATA: null,
        RETRIEVED_PIPELINE_DASHBOARD_DATA: null,
        RETRIEVING_APPROVALS: null,
        RETRIEVED_APPROVALS: null,
        SERVER_ERROR: null,
        AUTO_SYNC: null,
        RETRIEVING_PIPELINE_DETAILS: null,
        RETRIEVED_PIPELINE_DETAILS: null,
        APPROVAL_CHANGE_COMMENT: null,
        APPROVING: null,
        APPROVED: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    })
};