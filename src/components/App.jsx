import React, { Component } from 'react';

import Cmap from './Cmap.jsx';

class App extends Component {
  render() {

    const style = {
      width: '100vw',
      height: '50vh'
    };

    return (
      <div className='app'>

        <nav className="navbar navbar-default" style={{borderRadius: 0}}>
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
                <div style={style}>
                  <Cmap />
                </div>
              </div>
              <div className='row'>
                <h1>Timeline here</h1>
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