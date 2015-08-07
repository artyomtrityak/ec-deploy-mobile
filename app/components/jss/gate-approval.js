'use strict';

import {StyleSheet, PixelRatio} from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: Colors.get('white'),
    width: 370
  },
  buttonBlock: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 20,
    width: 370,
    paddingHorizontal: 10
  },
  btn: {
    marginTop: 10
  },

  parameterType: {
    color: 'gray',
    flex: 1
  },

  parameterName: {

    flex: 2
  },

  separator: {
    height: 3 / PixelRatio.get(),
    backgroundColor: Colors.get('separatorColor'),
    width: 350,
    marginRight: 10,
    marginLeft: 10
  },

  commentArea: {
    height: 80,
    borderColor: Colors.get('separatorColor'),

    borderWidth: 1,
    width: 350,
    paddingHorizontal: 10,
    flex: 0
  },

  firstRow: {
    marginTop: 80
  },

  row: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    marginTop: 5
  }
});