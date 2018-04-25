import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  MuiThemeProvider,
  getMuiTheme,
  lightBaseTheme
} from 'material-ui/styles';

import * as actions from '../actions';
import NameForm from './NameForm';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import Client from '../containers/Client';

const ADDRESS = 'localhost';
const PORT = '5000';

class App extends Component {
  constructor(props) {
    super(props);
    let client = new Client(ADDRESS, PORT);
    client.setEvent('MESSAGE', (data) => {
      if (typeof(data) !== "undefined") {
        props.actions.applyMessage(data.name, data.message);
      }
    });
    props.actions.addClient(client);
  }
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={ getMuiTheme(lightBaseTheme) }>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <NameForm />
              <MessageForm />
            </div>
            <MessageList />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
