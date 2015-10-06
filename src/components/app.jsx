'use strict';

import * as React from 'react';
import { RouteHandler } from 'react-router';
import Header from './common/header';
import CrimePage from './accidents/crimePage';

class App extends React.Component {
  render() {

    return (
      <div>
        <Header/>
        <div className="container-fluid">
          <RouteHandler/>
          <CrimePage/>
        </div>
      </div>
    );
  }
}

export default App;
