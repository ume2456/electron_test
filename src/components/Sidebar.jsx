import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Icons from 'react-icons/lib/fa';

import * as actions from '../actions'

const BeerItem = ({props, id}) => {
  return (
    <div
      onMouseEnter={() => {props.actions.enterIcon(id);}}
      onMouseLeave={() => {props.actions.leaveIcon(id);}}
    >
      <Icons.FaBeer
        style={iconStyleGenerator(id === props.hoverId)}
      />
    </div>
  );
};

const BeerList = ({props}) => {
  var list = [];
  for (var i = 0; i < 5; ++i) {
    list.push(
      <BeerItem props={props} id={i} key={i} />
    );
  }
  return list;
};

const Sidebar = (props) => {
  return (
    <BeerList props={props} />
  );
};

const mapStateToProps = state => ({
  hoverId: state.hoverId,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

const iconStyleGenerator = (isHover) => ({
  fontSize: isHover ? '40px' : '32px',
  color: '#ccc',
  align: 'center',
  padding: isHover ? '8px' : '12px',
  margin: '0',
});
