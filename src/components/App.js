import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toolbar } from 'material-ui';
import {
  MuiThemeProvider,
  getMuiTheme,
  lightBaseTheme
} from 'material-ui/styles';

import * as actions from '../actions';
import NameForm from './NameForm';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import ObjectHierarchy from './ObjectHierarchy';
import Client from '../containers/Client';
import { isUndef } from '../utility';
import { callbackify } from 'util';

const ADDRESS = 'localhost';
const PORT = '5000';

class App extends Component {
  constructor(props) {
    super(props);
    let client = new Client(ADDRESS, PORT);
    client.setEvent('MESSAGE', (data) => {
      if (!isUndef(data)) {
        props.actions.applyMessage(data.name, data.message);
      }
    });
    client.setEvent('ADD_OBJECT', (data) => {
      if (!isUndef(data)) {
        props.actions.addObject(data);
      }
    });
    props.actions.addClient(client);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={ getMuiTheme(lightBaseTheme) }>
        <div style={ Styles.Container }>
          <div style={ Styles.Contents }>
            <div> {/* HACK: flexなコンポーネントの直下にposition:fixedなコンポーネントは正しく追加されないので空のdivを挿入*/}
              <div style={ Styles.Hierarchy }>
                <ObjectHierarchy />
              </div>
            </div>
            <div style={ Styles.Detail }>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <NameForm />
                <MessageForm />
              </div>
              <div style={ Styles.MessageList }>
                <MessageList />
              </div>
            </div>
          </div>
          <Toolbar style={ Styles.Footer } />
        </div>
      </MuiThemeProvider>
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

const FooterHeight = '20px';
const HierarchyWidth = '200px';
const Styles = {
  Contents: {
    backgroundColor: '#0a0',
    display: 'flex',
  },
  Hierarchy: {
    backgroundColor: '#abc',
    position: 'fixed',
    width: HierarchyWidth,
    height: `calc(100vh - ${FooterHeight})`,
    overflow: 'auto',
  },
  Detail: {
    marginLeft: HierarchyWidth,
  },
  Footer: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: FooterHeight,
  }
};
