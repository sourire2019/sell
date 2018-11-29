import React, { Component } from 'react';
import SettingsForm from './components/SettingsForm';

export default class Page6 extends Component {
  static displayName = 'Page6';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page6-page">
        <SettingsForm />
      </div>
    );
  }
}
