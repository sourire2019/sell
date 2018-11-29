import React, { Component } from 'react';
import SettingsForm from './components/SettingsForm';

export default class Add extends Component {
  static displayName = 'Add';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page4-page">
        <SettingsForm />
      </div>
    );
  }
}
