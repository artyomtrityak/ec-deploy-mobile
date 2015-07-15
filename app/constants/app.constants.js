'use strict';

import keyMirror from 'keymirror';

export default {
    ActionTypes: keyMirror({
        APP_LOADED: null,
        LOGIN_PROCESSING: null,
        LOGIN_DONE: null,
        LOGIN_ERROR: null,
        LOGOUT_PROCESSING: null,
        LOGOUT_DONE: null,
        CREDENTIALS_CHANGE: null,
        RETRIVING_JOB: null,
        REMEMBER_ME_SETTING: null,
        PUSH_NOTIFICATIONS_SETTING: null,
        AUTO_SYNC_SETTING: null,
        RETRIVING_JOBS: null,
        RETRIVED_JOB: null,
        RETRIVED_JOBS: null,
        SERVER_ERROR: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    })
};