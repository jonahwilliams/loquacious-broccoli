'use strict';
import * as React from 'react';
import Addons from 'react/addons';

let ReactCSSTransitionGroup = Addons.CSSTransitionGroup;

class CrimeList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const createRow = (item, i) => {
      return (
        <tr key={i}>
          <td>{item.group}</td>
          <td>{item.reduction}</td>
        </tr>
      );
    };
    return (
      <div>
          <table className="table">
            <thead>
                <th>Category</th>
                <th>Count</th>
            </thead>
            <tbody>
                {this.props.crime.map(createRow, this)}
            </tbody>
          </table>
      </div>
    );
  }
}
export default CrimeList;
