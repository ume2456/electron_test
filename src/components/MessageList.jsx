import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  List,
  ListItem
} from 'material-ui';

import * as actions from '../actions/index';

const getMessageLi = (message) => {
  return (
    <ListItem key={message.id} style={{display: "flex"}}>
      <div>{message.name} : {message.message}</div>
    </ListItem>
  );
};

const MessageList = (props) => {
  return (
    <List>
    {
      props.messages.map(message => getMessageLi(message))
    }
    </List>
  );
};

const mapStateToProps = state => ({
  name: state.name,
  messages: state.messages,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
