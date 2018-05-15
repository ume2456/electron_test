import React from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  MenuItem
} from 'material-ui';
import Home from 'material-ui/svg-icons/action/home';

const PropertyPage = (props) => {
  return (
    <Menu>
      <MenuItem leftIcon={<Home />} />
    </Menu>
  );
};

const mapStateToProps = state => ({
  selected_instance_id: state.selected_instance_id,
  object_map: state.object_map,
});

export default connect(mapStateToProps, null)(PropertyPage);
