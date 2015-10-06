import * as React from 'react';


class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.show){
      return (
        <div>
          <span className="glyphicon glyphicon-repeat"></span>
        </div>
      );
    } else {
      return null;
    }

  }
}

export default Loading;
