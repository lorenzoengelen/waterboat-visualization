import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-8'>
              <div className='row'>
                <h1>Google map here</h1>
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