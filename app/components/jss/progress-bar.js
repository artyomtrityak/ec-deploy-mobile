'use strict';

import {StyleSheet} from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  error: {
    backgroundColor: '#C50C1E'
  },
  success: {
    backgroundColor: '#3AC50A'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgray'
  },
  incomplete: {
    backgroundColor: 'lightgray'
  }
});