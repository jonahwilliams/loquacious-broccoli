'use strict';

import * as React from 'react';
import api from '../../util/api';
import CrimeList from './crimeList';
import Loading from '../common/loadingSlot';




class CrimePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crime: [],
      loading: true
    };
  }
  componentDidMount() {
    api.near()
      .then(data => {
        return data;
      })
      .then(data => this.setState({
        crime: data,
        loading: false
      }));
  }
  render() {
    return (
      <div>
          <CrimeList crime={this.state.crime}></CrimeList>
      </div>
    );
  }
}


export default CrimePage;
