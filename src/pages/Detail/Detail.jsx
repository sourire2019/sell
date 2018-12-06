import React, { Component } from 'react';
import BrandDisplay from './components/BrandDisplay';
import BasicDetailInfo from './components/BasicDetailInfo';

export default class Detail extends Component {
  static displayName = 'Detail';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="detail-page">
        <BrandDisplay />
        {/*<BasicDetailInfo /> */}
      </div>
    );
  }
}
