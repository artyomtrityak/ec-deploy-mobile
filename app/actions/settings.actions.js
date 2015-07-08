'use strict';

//import AppDispatcher from '../dispatchers/app.dispatcher';
import UserWebUtils from '../webutils/user.webutils';
import { ActionTypes } from '../constants/app.constants';


export default {
  login(login, password) {
    /*
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_PROCESSING
    });*/

    UserWebUtils.login(login, password)
    .then((data) => {
      console.log('data:', data);
    })
    .catch((err) => {
      console.log('ERR:', err);
    });
  }
};