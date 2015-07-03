'use strict';

import { Dispatcher } from 'flux';
import { PayloadSources } from '../constants/app.constants';

class AppDispatcher extends Dispatcher {
  handleViewAction(action) {
    var payload = {
        source: PayloadSources.VIEW_ACTION,
        action: action
    };
    this.dispatch(payload);
  }

  handleServerAction(action) {
    var payload = {
        source: PayloadSources.SERVER_ACTION,
        action: action
    };
    this.dispatch(payload);
  }
}

export default new AppDispatcher();