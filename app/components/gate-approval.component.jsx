'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  AlertIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Components
import LoaderComponent from './shared/loader.component';
import ButtonComponent from './shared/button.component';

//Actions
import PipelinesActions from 'actions/pipelines.actions';

//Stores
import GateApprovalStore from 'stores/gate-approvals.store';
//TODO: add check from SettingsStore that current user is in approvers

//Styles
import LoaderJSS from './jss/loader';
import FormJSS from './jss/forms';
import SettingsJSS from './jss/settings';
import Colors from './jss/colors-scheme';


export default React.createClass({
  displayName: 'GateApprovalComponent',

  propTypes: {
    navigator: React.PropTypes.object,
    flowRuntimeId: React.PropTypes.string.isRequired
  },

  statics: {
    title: 'Gate Approval'
  },

  getInitialState() {
    return GateApprovalStore.getState();
  },

  componentDidMount() {
    GateApprovalStore.on('change', this.handleChange);
    PipelinesActions.getRuntimeDetails(this.props.flowRuntimeId);
  },

  componentWillUnmount() {
    GateApprovalStore.off('change', this.handleChange);
  },

  handleChange() {
    console.log('handle change', GateApprovalStore.getState());
    this.setState(GateApprovalStore.getState());
  },

  onChangeComment(text) {
    PipelinesActions.commentChange(text);
  },

  onApprove() {
    AlertIOS.alert(
      'Approve confirmation',
      'Are you sure you want to approve task ' + this.state.taskName,
      [
        {text: 'No'},
        {text: 'Yes', onPress: () => {
          PipelinesActions.approveOrRejectAction(
            this.props.flowRuntimeId,
            this.state.stageName,
            this.state.taskName,
            this.state.gateType,
            'approve',
            this.state.comment
          );
        }}
      ]
    );
  },

  onReject() {
    AlertIOS.alert(
      'Approve confirmation',
      'Are you sure you want to reject ' + this.state.taskName,
      [
        {text: 'No'},
        {text: 'Yes', onPress: () => {
          PipelinesActions.approveOrRejectAction(
            this.props.flowRuntimeId,
            this.state.stageName,
            this.state.taskName,
            this.state.gateType,
            'reject',
            this.state.comment
          );
        }}
      ]
    );
  },

  render() {
    if (this.state.loading) {
      return (
        <View style={[ FormJSS.forms.main, LoaderJSS.position ]}>
          <LoaderComponent loading={true} />
        </View>
      );
    }

    if (!this.state.taskName) {
      return (
        <View style={[ FormJSS.forms.main, LoaderJSS.position ]}>
          <Text>Nothing to approve</Text>
        </View>
      );
    }

    return (
      <View style={ FormJSS.forms.main }>
        <View style={ FormJSS.forms.firstRow }>
          <Text>Pipeline name: </Text>
          <Text>{this.state.pipelineName}</Text>
        </View>
        <View style={ FormJSS.forms.row }>
          <Text>Stage name: </Text>
          <Text>{this.state.stageName}</Text>
        </View>
        <View style={ FormJSS.forms.row }>
          <Text>Task name: </Text>
          <Text>{this.state.taskName}</Text>
        </View>
        <View style={ FormJSS.forms.row }>
          <Text>Approvers: </Text>
          <Text>{this.state.approvers}</Text>
        </View>
        <View style={ FormJSS.forms.row }>
          <Text>Gate Type: </Text>
          <Text>{this.state.gateType}</Text>
        </View>
        <View style={ FormJSS.forms.row }>
          <TextInput
              style={[ FormJSS.inputs.main, {height: 80} ]}
              placeholder={'Optional comment'}
              onChangeText={this.onChangeComment}
              value={this.state.commentChange}
            />
        </View>
        <View style={ FormJSS.forms.row }>
          <ButtonComponent
              onPress={this.onApprove}
              text={'Approve'}
              icon={'thumbs-up'}
              color={Colors.get('white')}
              backgroundColor={Colors.get('green')}
            />
        </View>
        <View style={ FormJSS.forms.row }>
            <ButtonComponent
              onPress={this.onReject}
              text={'Reject'}
              icon={'thumbs-down'}
              color={Colors.get('white')}
              backgroundColor={Colors.get('red')}
            />
        </View>
      </View>
    );
  }
});
