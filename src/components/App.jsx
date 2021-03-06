import React, { Component } from 'react';

import Cmap from './Cmap.jsx';
import Timeline from './Timeline.jsx';

class App extends Component {
  render() {
    const navStyle = {
      borderRadius: 0,
      marginBottom: 0
    };

    return (
      <div className='app'>

        <nav className="navbar navbar-default" style={navStyle}>
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Waterboat Visualization
              </a> 
            </div>
          </div>
        </nav>

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-8'>
              <div className='row'>
                <div>
                  <Cmap />
                </div>
              </div>
              <div className='row'>
                <Timeline />
              </div>
            </div>
            <div className='col-xs-4'>
              <h1>col-xs-5</h1>
            </div>
          </div>
        </div>

      </div>
    );
  }
};

export default App;