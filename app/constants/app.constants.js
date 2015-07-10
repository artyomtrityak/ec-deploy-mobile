'use strict';

import keyMirror from 'keymirror';

export default {
    ActionTypes: keyMirror({
        APP_LOADED: null,
        LOGIN_PROCESSING: null,
        LOGIN_DONE: null,
        LOGIN_ERROR: null,
        CREDENTIALS_CHANGE: null,
        RETRIVING_JOBS: null,
        RETRIVED_JOBS: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    })
};