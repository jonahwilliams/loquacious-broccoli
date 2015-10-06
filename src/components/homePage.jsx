'use strict';

import * as React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div className="jumbotron">
          <h1>Crime Buddy</h1>
          <p>See where nearby crime has occured</p>
          <p>POC for geospatial application built on React, Node, and Rethinkdb</p>
      </div>
    );
  }
}

export default Home;
