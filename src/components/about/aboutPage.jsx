'use strict';

import * as React from 'react';

class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>
          This application uses the following technologies
          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Flux</li>
            <li>Node</li>
            <li>Gulp</li>
            <li>Babel</li>
            <li>Browserify</li>
            <li>Bootstrap</li>
          </ul>
        </p>
      </div>
    );
  }
}

export default About;
