import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { AppState } from '../../store/app-state';

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super();
    this.changeName = this.changeName.bind(this);
  }
  componentDidMount() {
    // do sonething here
  }

  changeName(event) {
    this.props.appState.changeName(event.target.value);
  }

  render() {
    return (
      <div>
        <h2>{this.props.appState.msg}</h2>
        <input type="text" onChange={this.changeName} />
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};
