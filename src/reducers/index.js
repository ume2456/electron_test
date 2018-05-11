import { isUndef } from '../utility';

const initialState = {
  name: '',
  id: 0,
  messages: [],
  client: null,
  type_map: {},
  object_map: {},
  object_list: [],
  selected_instance_id: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case 'SUBMIT_NAME':
    return {
      ...state,
      name: action.name,
    };
  case 'SUBMIT_MESSAGE':
    return {
      ...state,
      id: ++state.id,
      messages: [
        ...state.messages,
        {
          name: state.name,
          id: state.id,
          message: action.message,
        }
      ],
    };
  case 'APPLY_MESSAGE':
    return {
      ...state,
      id: ++state.id,
      messages: [
        ...state.messages,
        {
          name: action.name,
          id: state.id,
          message: action.message,
        }
      ],
    };
  case 'ADD_CLIENT':
    return {
      ...state,
      client: action.client,
    };
  case 'ADD_TYPE':
    if (isUndef(action.object) || isUndef(action.object.id)) {
      return state;
    }
    return {
      ...state,
      type_map: {
        ...state.type_map,
        [action.object.id]: action.object,
      }
    };
  case 'ADD_OBJECT':
    if (isUndef(action.object) || isUndef(action.object.id)) {
      return state;
    }
    return {
      ...state,
      object_list: [
        ...state.object_list,
        {
          id: action.object.id,
          parent: action.object.parent,
          type_id: action.object.type_id,
        },
      ],
      object_map: {
        ...state.object_map,
        [action.object.id]: action.object,
      },
    };
  case 'SELECT_INSTANCE':
    return {
      ...state,
      selected_instance_id: action.id,
    }
  default: break;
  }
  return state;
};
