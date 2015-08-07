'use strict';

import { StyleSheet } from 'react-native';
import Colors from './colors-scheme';

export default StyleSheet.create({
  tabContent: {
    marginTop: 64,
    marginBottom: 45,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1
  },
  menuListIcon: {
    marginRight: 10
  },
  menuListRow: {
    flexDirection: 'row',
    padding: 10
  },
  menuListText: {
    flex: 1,
    fontSize: 25
  },
  menuListContainer: {
    flex: 3
  },
  notificationContainer: {
    flex: 7
  },
  notificationIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  notificationRow: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  notificationText: {
    fontSize: 15,
    flex: 9
  },
  separator: {
    height: 1,
    backgroundColor: Colors.get('gray')
  }
});