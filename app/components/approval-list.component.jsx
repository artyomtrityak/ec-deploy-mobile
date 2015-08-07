'use strict';

import React, {
  View,
  ListView,
  TouchableHighlight,
  Image,
  Text
  } from 'react-native';

import PipelinesActions from 'actions/pipelines.actions';
import PipelinesStore from 'stores/pipeline.store';
import LoaderComponent from './shared/loader.component';
import GateApprovalComponent from './gate-approval.component';
import Styles from './jss/jobs-list';
import Colors from './jss/colors-scheme';
import ListStyles from './jss/dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';


function Refresh (smartLoad=false) {
  if (smartLoad === true && PipelinesStore.getState().approvals) {
    return;
  }
  PipelinesActions.getApprovals();
}

export default React.createClass({
  displayName: 'ApprovalComponent',

  propTypes: {
    navigator: React.PropTypes.object
  },

  statics: {
    title: 'Approvals',
    refresh: Refresh
  },

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(PipelinesStore.getState().approvals),
      approvals: PipelinesStore.getState()
    };
  },

  componentDidMount() {
    PipelinesStore.on('change', this.handleChange);
    PipelinesActions.getApprovals();
  },

  componentWillUnmount() {
    PipelinesStore.off('change', this.handleChange);
  },

  handleChange() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(PipelinesStore.getState().approvals),
      approvals: PipelinesStore.getState()
    });
  },

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={this.showApprovalDetails.bind(this, rowData.flowRuntimeId)}
        underlayColor={Colors.get('lightGray')}
        >
        <View>
          <View style={ListStyles.notificationRow}>
            <Text style={{fontSize: 16, width: 30, textAlign: 'center'}}>{++rowID + '.'}</Text>
            <Image source={require('image!pipeIcon')} style={ListStyles.notificationTypeIcon}
                   resizeMode={Image.resizeMode.contain} />
            <Text style={Styles.text}>{rowData.flowRuntimeName}</Text>
            <Icon
              name="chevron-right"
              style={ListStyles.menuRowIcon}
              size={16} color="#5d5d5d"
            />
          </View>
          <View style={ListStyles.notificationSeparator} />
        </View>
      </TouchableHighlight>
    );
  },

  showApprovalDetails(flowRuntimeId) {
    this.props.navigator.push({
      component: GateApprovalComponent,
      title: 'Gate Approval',
      passProps: {flowRuntimeId: flowRuntimeId}
    });
  },

  render() {
    if (this.state.approvals.loading) {
      return (
        <View style={Styles.loader}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    return (
      <View style={Styles.tabContent}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          />
      </View>
    );
  }
});
