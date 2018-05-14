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
import PropertyPage from './PropertyPage';
import Client from '../containers/Client';
import { isUndef } from '../utility';

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
    client.setEvent('ADD_PROP', (data) => {
      if (!isUndef(data)) {
        props.actions.addProp(data);
      }
    });
    client.setEvent('PROPS', (data) => {
      if (!isUndef(data)) {
        props.actions.applyProps(data);
      }
    });
    props.actions.addClient(client);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={ getMuiTheme(lightBaseTheme) }>
        <div>
          <div style={ Styles.Contents }>
            <div style={ Styles.Hierarchy }>
              <ObjectHierarchy />
            </div>
            <div style={ Styles.Detail }>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <NameForm />
                <MessageForm />
              </div>
              <div style={ Styles.MessageList }>
                <MessageList />
              </div>
              <div>
                <PropertyPage />
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
    justifyContent: 'left',
  },
  Hierarchy: {
    backgroundColor: '#abc',
    minWidth: HierarchyWidth,
    maxWidth: '35%',
    height: `calc(100vh - ${FooterHeight})`,
    overflow: 'auto',
    resize: 'horizontal',
  },
  Detail: {
    height: `calc(100vh - ${FooterHeight})`,
    flexGrow: '1',
    overflow: 'auto',
  },
  Footer: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: FooterHeight,
  }
};
