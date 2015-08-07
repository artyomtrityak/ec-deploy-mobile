'use strict';

import React, {
  View,
  ListView,
  TouchableHighlight,
  Text
  } from 'react-native';

import PipelinesActions from 'actions/pipelines.actions';
import PipelinesStore from 'stores/pipeline.store';
import NotLoggenInComponent from './shared/not-logged-in.component';
import LoaderComponent from './shared/loader.component';
import Styles from './jss/jobs-list';
import Colors from './jss/colors-scheme';
import ListStyles from './jss/dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';

function Refresh (smartLoad=false) {
  if (smartLoad === true && PipelinesStore.getState().pipelineRuns) {
    return;
  }
  PipelinesActions.getPipelineRuns();
}

export default React.createClass({
  displayName: 'PipelineRunsComponent',

  propTypes: {
    navigator: React.PropTypes.object
  },

  statics: {
    title: 'Pipeline Runs',
    refresh: Refresh
  },

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(PipelinesStore.getState().pipelineRuns),
      pipelineRuns: PipelinesStore.getState()
    };
  },

  componentDidMount() {
    PipelinesStore.on('change', this.handleChange);
    PipelinesActions.getPipelineRuns();
  },

  componentWillUnmount() {
    PipelinesStore.off('change', this.handleChange);
  },

  handleChange() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(PipelinesStore.getState().pipelineRuns),
      pipelineRuns: PipelinesStore.getState()
    });
  },

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        underlayColor={Colors.get('lightGray')}
        >
        <View>
          <View style={ListStyles.notificationRow}>
            <Text style={{fontSize: 16, width: 30, textAlign: 'center'}}>{++rowID + '.'}</Text>
            <Text style={Styles.text}>{rowData.flowRuntimeName}</Text>
          </View>

          <View style={ListStyles.notificationSeparator} />
        </View>
      </TouchableHighlight>
    );
  },

  render() {
    if (this.state.pipelineRuns.loading) {
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
