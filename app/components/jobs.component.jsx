'use strict';

import React, {
  View,
  ListView,
  TouchableHighlight,
  Text
} from 'react-native';

import moment from 'moment/moment';
import JobsActions from 'actions/jobs.actions';
import SettingsStore from 'stores/settings.store';
import JobsStore from 'stores/jobs.store';
import ProgressBar from './shared/progress-bar.component';
import NotLoggedInComponent from './shared/not-logged-in.component';
import LoaderComponent from './shared/loader.component';
import JobDetails from './job-details.component';
import Styles from './jss/jobs-list';
import StylesJob from './jss/job-details';
import Colors from './jss/colors-scheme';
import Icon from 'react-native-vector-icons/FontAwesome';


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

  renderRow(rowData, sectionID, rowID) {
    let completePerc = parseInt(rowData.progressPercentage, 10),
        incompletePerc = Math.abs(completePerc - 100),
        progressColor = rowData.outcome === 'error' ? Styles.error : Styles.success,
        elapsedTime = moment.utc(parseInt(rowData.elapsedTime, 10)).format('mm:ss'),
        startTime = moment(rowData.start).format('MMM DD, YYYY h:mm A');
    var statusImage,
        mainColor,
        error = '#C50C1E',
        success = '#3AC50A',
        warning = '#ff6d26',
        // startTime = moment(this.state.job.job.start).format('MMM DD, YYYY h:mm A'),
        // elapsedTime = moment.utc(parseInt(this.state.job.job.elapsedTime, 10)).format('mm:ss'),
        percentageText = rowData.progressPercentage + '%';
    switch (rowData.combinedStatus.status) {
      case 'running_error':
        statusImage = 'repeat';
        mainColor = error;
        break;
      case 'running_success':
        statusImage = 'repeat';
        mainColor = success;
        break;
      case 'running_warning':
        statusImage = 'repeat';
        mainColor = warning;
        break;
      case 'completed_error':
        statusImage = 'times-circle';
        mainColor = error;
        break;
      case 'completed_success':
        statusImage = 'check-circle';
        mainColor = success;
        break;
      case 'completed_warning':
        statusImage = 'exclamation-circle';
        mainColor = warning;
        break;
      default:
        statusImage = '';
        mainColor = '';
    }
    return (
      <TouchableHighlight
        onPress={this.showJobDetails.bind(this, rowData.jobId)}
        underlayColor={Colors.get('lightGray')}
        >
        <View>
          <View style={StylesJob.headerTitle}>
            <Text style={StylesJob.headerTitleText} numberOfLines={3}>{rowData.jobName}</Text>
            <Icon name={statusImage} style={StylesJob.headerTitleImage} color={mainColor}/>
          </View>

          <View style={StylesJob.headerStatus}>
            <View style={StylesJob.headerStatusProgress}>
              <ProgressBar
                percentage={rowData.progressPercentage}
                status={rowData.outcome}
                mainColor={mainColor}/>
              <Text numberOfLines={1} style={StylesJob.headerStatusProgressText}>{percentageText}</Text>
            </View>

            <View style={StylesJob.headerStatusTime}>
              <View style={StylesJob.headerStatusTimeRow}>
                <Icon name='clock-o' style={StylesJob.headerStatusTimeIcon} />
                <Text numberOfLines={1} style={StylesJob.headerStatusTimeText}>{startTime}</Text>
              </View>
              <View style={StylesJob.headerStatusTimeRow}>
                <Icon name='flag' style={StylesJob.headerStatusTimeIcon} />
                <Text numberOfLines={1} style={StylesJob.headerStatusTimeText}>{elapsedTime}</Text>
              </View>
            </View>
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
      return (<NotLoggedInComponent />);
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
