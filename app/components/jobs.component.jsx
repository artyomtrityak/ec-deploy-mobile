'use strict';

import React, {
  View,
  ListView,
  TouchableHighlight,
  Text
} from 'react-native';

import JobsActions from 'actions/jobs.actions';
import SettingsStore from 'stores/settings.store';
import JobsStore from 'stores/jobs.store';
import NotLoggenInComponent from './shared/not-logged-in.component';
import LoaderComponent from './shared/loader.component';
import JobDetails from './job-details.component';
import Styles from './jss/jobs-list';


function Refresh (smartLoad=false) {
  if (!SettingsStore.getState().user) {
    return;
  }
  if (smartLoad === true && JobsStore.getState().jobs) {
    return;
  }
  JobsActions.getJobs();
}

export default React.createClass({
  displayName: 'JobsComponent',

  propTypes: {
    navigator: React.PropTypes.object
  },

  statics: {
    title: 'Jobs',
    refresh: Refresh
  },

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(JobsStore.getState()),
      jobs: JobsStore.getState(),
      settings: SettingsStore.getState()
    };
  },

  componentDidMount() {
    SettingsStore.on('change', this.handleChange);
    JobsStore.on('change', this.handleChange);
  },

  componentWillUnmount() {
    SettingsStore.off('change', this.handleChange);
    JobsStore.off('change', this.handleChange);
  },

  handleChange() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(JobsStore.getState().jobs),
      jobs: JobsStore.getState(),
      settings: SettingsStore.getState()
    });
  },

  renderRow: function(rowData, sectionID, rowID) {
    let _index = parseInt(rowID, 10) + 1;
    return (
      <TouchableHighlight
        onPress={this.showJobDetails.bind(this, rowData.jobId)}
        underlayColor="#cccccc"
        >
        <View>
          <View style={Styles.row}>
            <Text style={Styles.text}>{_index}. {rowData.jobName}</Text>
          </View>
          <View style={Styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },

  showJobDetails(jobId) {
    this.props.navigator.push({
      component: JobDetails,
      title: 'Job Details',
      passProps: {jobId: jobId},
      rightButtonTitle: 'Refresh',
      onRightButtonPress: JobDetails.refresh.bind(null, jobId)
    });
  },

  render() {
    if (this.state.jobs.loading) {
      return (
        <View style={Styles.loader}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    if (!this.state.settings.user) {
      return (<NotLoggenInComponent />);
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
