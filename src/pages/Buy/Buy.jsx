import React, { Component } from 'react';
import BrandDisplay from './components/BrandDisplay';

export default class Buy extends Component {
  static displayName = 'Buy';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="buy-page">
        <BrandDisplay />
      </div>
    );
  }
}
