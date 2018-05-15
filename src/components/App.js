import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Toolbar } from 'material-ui';
import {
  MuiThemeProvider,
  getMuiTheme,
  lightBaseTheme
} from 'material-ui/styles';

import * as actions from '../actions';
import SideMenu from './SideMenu';
import ObjectHierarchy from './ObjectHierarchy';
import PropertyPage from './PropertyPage';
import Client from '../containers/Client';
import { isUndef } from '../utility';

import './SideMenu.css';

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
    client.setEvent('APPLY_PROP', (data) => {
      if (!isUndef(data)) {
        props.actions.applyProp(data);
      }
    });
    props.actions.addClient(client);
    this.state = { sideMenuVisible: true };
  }

  onHandleSideMenuContextClick(e, data) {
    switch(data.item) {
    case 'hide':
      this.setState(({ sideMenuVisible }) => ({
        sideMenuVisible: false,
      }));
      break;
    default: break;
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ getMuiTheme(lightBaseTheme) }>
        <div>
          <div
            style={ Styles.Contents }
            onContextMenu = { (e) => e.preventDefault() }
          >
            <ContextMenuTrigger id='side_menu_context_menu_id'>
            <div style={ SideMenuStyle(this.state.sideMenuVisible) }>
              <SideMenu />
            </div>
            </ContextMenuTrigger>
            <ContextMenu id='side_menu_context_menu_id'>
              <MenuItem onClick={ (e, data) => this.onHandleSideMenuContextClick(e, data) } data={{ item: 'hide' } }>Hide side menu</MenuItem>
            </ContextMenu>
            <div style={ Styles.Hierarchy }>
              <ObjectHierarchy />
            </div>
            <div style={ Styles.Detail }>
              <PropertyPage />
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
const Styles = {
  Contents: {
    display: 'flex',
  },
  SideMenu: {
    backgroundColor: '#444',
    width: '64px',
    height: `calc(100vh - ${FooterHeight})`,
    overflow: 'auto',
  },
  Hierarchy: {
    backgroundColor: '#777',
    minWidth: '200px',
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
const SideMenuStyle = (visible) => {
  let props = {
    backgroundColor: '#444',
    width: '64px',
    height: `calc(100vh - ${FooterHeight})`,
    overflow: 'auto',
  };
  if (!visible) {
    console.log(visible);
    props = {
      ...props,
      display: 'none',
    };
  }
  return props;
}
