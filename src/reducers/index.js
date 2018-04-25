const initialState = {
  name: '',
  id: 0,
  messages: [],
  client: null,
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
  default: break;
  }
  return state;
};
