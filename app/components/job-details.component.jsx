'use strict';

import moment from 'moment/moment';
import React, {ListView, View, Image, Text} from 'react-native';
import JobDetailsStore from 'stores/job-details.store';
import LoaderComponent from './shared/loader.component';
import ProgressBar from './shared/progress-bar.component';
import JobsActions from 'actions/jobs.actions';
import Styles from './jss/job-details';
import Icon from 'react-native-vector-icons/FontAwesome';


function Refresh (jobId) {
  JobsActions.getJobDetails(jobId);
}


export default React.createClass({
  displayName: 'JobDetailsComponent',

  propTypes: {
    jobId: React.PropTypes.string.required
  },

  statics: {
    title: 'Job Details',
    refresh: Refresh
  },

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return ({
      job: JobDetailsStore.getState(),
      dataSource: ds.cloneWithRows([])
    });
  },

  componentDidMount() {
    JobDetailsStore.on('change', this.handleChange);
    JobsActions.getJobDetails(this.props.jobId);
  },

  componentWillUnmount() {
    JobDetailsStore.off('change', this.handleChange);
  },

  handleChange() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        job = JobDetailsStore.getState(),
        dataSource = ds.cloneWithRows(job.job && job.job.jobStep ? job.job.jobStep : []);

    this.setState({job, dataSource});
  },

  renderHeader() {
    if (!this.state.job.job) {
      return null;
    }

    console.log('ololo');
    console.log('this.state.job.job', this.state.job.job);

    var
      statusImage,
      mainColor,
      error = '#C50C1E',
      success = '#3AC50A',
      warning = '#ff6d26',
      startTime = moment(this.state.job.job.start).format('MMM DD, YYYY h:mm A'),
      elapsedTime = moment.utc(parseInt(this.state.job.job.elapsedTime, 10)).format('mm:ss'),
      percentageText = this.state.job.job.progressPercentage + '%';

    switch (this.state.job.job.combinedStatus.status) {
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
      <View style={Styles.header}>

        <View style={Styles.headerTitle}>
            <Text style={Styles.headerTitleText} numberOfLines={3}>{this.state.job.job.jobName}</Text>
            <Icon name={statusImage} style={Styles.headerTitleImage} color={mainColor}/>
        </View>

        <View style={Styles.headerStatus}>
          <View style={Styles.headerStatusProgress}>
            <ProgressBar
              percentage={this.state.job.job.progressPercentage}
              status={this.state.job.job.outcome}
              mainColor={mainColor}/>
            <Text numberOfLines={1} style={Styles.headerStatusProgressText}>{percentageText}</Text>
          </View>

          <View style={Styles.headerStatusTime}>
            <View style={Styles.headerStatusTimeRow}>
              <Icon name='clock-o' style={Styles.headerStatusTimeIcon} />
              <Text numberOfLines={1} style={Styles.headerStatusTimeText}>{startTime}</Text>
            </View>
            <View style={Styles.headerStatusTimeRow}>
              <Icon name='flag' style={Styles.headerStatusTimeIcon} />
              <Text numberOfLines={1} style={Styles.headerStatusTimeText}>{elapsedTime}</Text>
            </View>
          </View>
        </View>

        <View style={Styles.headerInfo}>
          <View style={Styles.headerInfoRow}>
            <Text style={Styles.headerInfoRowTitle}>Project:</Text>
            <Text numberOfLines={1} style={Styles.headerInfoRowText}>{this.state.job.job.projectName}</Text>
          </View>
          <View style={Styles.headerInfoRow}>
            <Text style={Styles.headerInfoRowTitle}>Application:</Text>
            <Text numberOfLines={1} style={Styles.headerInfoRowText}>{this.state.job.job.applicationName}</Text>
          </View>
          <View style={Styles.headerInfoRow}>
            <Text style={Styles.headerInfoRowTitle}>Launched by:</Text>
            <Text numberOfLines={1} style={Styles.headerInfoRowText}>{this.state.job.job.launchedByUser}</Text>
          </View>
          <View style={Styles.headerInfoRow}>
            <Text style={Styles.headerInfoRowTitle}>Priority:</Text>
            <Text numberOfLines={1} style={Styles.headerInfoRowText}>{this.state.job.job.priority}</Text>
          </View>
        </View>

        <View style={[Styles.headerMessage, {backgroundColor: mainColor}]}>
          <Text style={Styles.headerMessageText}>
            {this.state.job.job.combinedStatus.message + ': ' + this.state.job.job.combinedStatus.status}
          </Text>
        </View>

        <View style={Styles.listHeader}>
          <Text style={Styles.listHeaderColumn1}>Step name</Text>
          <Text style={Styles.listHeaderColumn2}>Elapsed</Text>
        </View>

      </View>
    );
  },

  renderRow(data) {
    console.log('DATA', data);

    return (
      <View style={Styles.listRow}>
        <Text numberOfLines={1} style={Styles.listRowColumn1}>{data.jobName}</Text>
        <Text numberOfLines={1} style={Styles.listRowColumn2}>00:23</Text>
      </View>
    );
  },

  render() {
    if (this.state.job.loading) {
      return (
        <View style={Styles.loader}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    return (
      <ListView
        renderHeader={this.renderHeader}
        renderRow={this.renderRow}
        dataSource={this.state.dataSource}
        pageSize={50} />
    );
  }
});
