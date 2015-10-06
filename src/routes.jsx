'use strict';

import * as React from 'react';
import * as Router from 'react-router';
import About from './components/about/aboutPage';
import Home from './components/homePage';
import App from './components/app';
import CrimePage from './components/accidents/crimePage';

const DefaultRoute = Router.DefaultRoute;
const Route = Router.Route;
const routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Home} />
    // <Route name="crime" handler={CrimePage} />
    <Route name="about" handler={About} />
  </Route>
);

export default routes;
