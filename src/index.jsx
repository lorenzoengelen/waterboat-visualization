// REACT
import React from 'react';
import ReactDOM from 'react-dom';

// ROUTER
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
const browserHistory = createBrowserHistory();

// REDUX
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { fetchWaterboats } from './actions/waterboats';

// STYLES
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Vis from 'vis/dist/vis.min.css';
import styles from './styles/style.css';

// COMPONENTS
import App from './components/App.jsx';

// REDUX STORE
const middleware = [thunk];
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);
store.dispatch(fetchWaterboats());


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);