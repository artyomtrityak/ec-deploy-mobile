'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ArticleView
} from 'react-native';

import JobsActions from 'actions/jobs.actions';
import SettingsStore from 'stores/settings.store';
import JobsStore from 'stores/jobs.store';
import NotLoggenInComponent from './shared/not-logged-in.component';
import LoaderComponent from './shared/loader.component';
import JobListItem from './job.list.item';


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  tabText: {
    color: 'black',
    margin: 50
  }
});

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

  renderJob(job) {
    return (
      <JobListItem
        job={job}
        onSelectJob={this.showJobDetails}
      />
    );
  },

  showJobDetails(job) {
    console.log('yay!', job.jobId);
  },

  render() {
    if (this.state.jobs.loading) {
      return (
        <View style={[styles.tabContent, {marginTop: 200}]}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    if (!this.state.settings.user) {
      return (<NotLoggenInComponent />);
    }

    return (
      <View style={[styles.tabContent, {backgroundColor: '#FFF'}]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderJob}
        />
      </View>
    );
  }
});
