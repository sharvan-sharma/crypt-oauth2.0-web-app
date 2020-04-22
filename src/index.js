import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter,Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import history from './history'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <App />
      </Router>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);


