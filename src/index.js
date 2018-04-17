import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  )}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
