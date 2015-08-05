'use strict';

import {StyleSheet, PixelRatio} from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
	loader: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200
  },

   header: {
    padding: 4,
    backgroundColor: '#909090',
    flexDirection: 'column'
  },

  headerSeparator: {
    height: 1,
    backgroundColor: '#d0d0d0'
  },

  headerTitle: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10
  },

  headerTitleText: {
    fontSize: 20,
    color: '#ffffff'
  },

  headerStatus: {
    marginVertical: 10,
    flexDirection: 'row'
  },

  headerStatusImage: {
    width: 50,
    height: 50,
    marginRight: 10
  },

  headerStatusTimeWrapper: {
    flex: 1,
    flexDirection: 'column'
  },

  headerStatusTime: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerStatusTimeTitle: {
    color: '#e0e0e0',
    marginRight: 10
  },

  headerStatusTimeText: {
    color: '#ffffff',
    fontWeight: '700'
  },

  headerInformation: {
    marginVertical: 10,
    flexDirection: 'column',
    paddingHorizontal: 10
  },

  headerInformationRow: {
    height: 20,
    flexDirection: 'row'
  },



  list: {
    flexDirection: 'column'
  },

  row: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f0ffff'
  }
});