import React from 'react';
import ReactDOM from 'react-dom';

import Gmap from './components/Gmap.jsx';

const App = () => {
  return (
    <Gmap />
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);