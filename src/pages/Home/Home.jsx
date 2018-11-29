import React, { Component } from 'react';
import AuthorityTable from './components/AuthorityTable';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page5-page">
        <AuthorityTable />
      </div>
    );
  }
}
