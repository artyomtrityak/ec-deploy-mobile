'use strict';

import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import JobsActions from 'actions/jobs.actions';
import SettingsStore from 'stores/settings.store';
import JobsStore from 'stores/jobs.store';
import NotLoggenInComponent from './shared/not-logged-in.component';
import LoaderComponent from './shared/loader.component';
import JobDetails from './job-details.component';


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
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

  propTypes: {
    navigator: React.PropTypes.object
  },

  statics: {
    title: 'Jobs',
    refresh: Refresh
  },

  getInitialState() {
    return {
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
    this.setState({
      jobs: JobsStore.getState(),
      settings: SettingsStore.getState()
    });
  },

  showJobDetails() {

    // Get Job id
    var jobId = '64e62659-2b79-11e5-ad26-005056330c34';

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
        <Text style={styles.tabText}>{'Jobs'}</Text>
        <Text style={styles.tabText} onPress={this.showJobDetails}>{'Details'}</Text>
      </View>
    );
  }
});
