// REACT
import React from 'react';
import ReactDOM from 'react-dom';

// REDUX
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// import { fetchCatalog } from './actions/catalog';

// STYLES
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Vis from 'vis/dist/vis.min.css';
import styles from './styles/style.css';

// COMPONENTS
import App from './components/App.jsx';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);