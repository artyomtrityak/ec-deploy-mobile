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
    flexDirection: 'column'
  },


  headerTitle: {
    height: 70,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerTitleText: {
    flex: 1,
    fontSize: 16
  },

  headerTitleImage: {
    fontSize: 52,
    marginLeft: 10
  },


  headerStatus: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerStatusProgress: {
    paddingHorizontal: 5,
    flex: 1,
    flexDirection: 'row'
  },

  headerStatusProgressText: {
    marginLeft: 5
  },

  headerStatusTime: {
    paddingHorizontal: 5,
    flex: 1,
    flexDirection: 'column'
  },

  headerStatusTimeRow: {
    flexDirection: 'row'
  },

  headerStatusTimeIcon: {
    fontSize: 20,
    marginRight: 10
  },

  headerStatusTimeText: {
    fontSize: 12
  },


  headerInfo: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: '#8C8C8C',
    borderBottomWidth: 1,
    borderBottomColor: '#8C8C8C'
  },

  headerInfoRow: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerInfoRowTitle: {
    color: '#606060',
    marginRight: 5
  },

  headerMessage: {
    paddingHorizontal: 10,
    paddingVertical: 4
  },

  headerMessageText: {
    color: '#ffffff'
  },


  listHeader: {
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderTopWidth: 1,
    borderTopColor: '#8C8C8C',
    borderBottomWidth: 1,
    borderBottomColor: '#8C8C8C'
  }, 

  listHeaderColumn1: {
    flex: 65,
    color: '#606060'
  },

  listHeaderColumn2: {
    flex: 35,
    color: '#606060'
  }

});