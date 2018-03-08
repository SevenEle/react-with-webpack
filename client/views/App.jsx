import React from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';//eslint-disable-line
import Routers from '../config/routers';

class App extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return (
      <div>
        <Link to="/list">列表页</Link>
        <br />
        <Link to="/detail">详情页</Link>
        <hr />
        <Routers />
      </div>
    );
  }
}
export default hot(module)(App);
