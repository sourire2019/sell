import React, { Component } from 'react';
import { Button, Input, Select } from '@icedesign/base';

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  constructor(props) {
    super(props);
    this.state = {};
  }
  add = () => {
    window.location.href = window.location.origin + '#/add'
  }

  render() {
    return (
      <div style={styles.tableFilter}>
        <div style={styles.title}>商品展示</div>
        <div style={styles.filter}>
          <Button
            size="large"
            type="primary"
            style={{ width: 100 }}
            onClick = {this.add}
          >
            添加商品
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  tableFilter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    marginBottom: '20px',
    background: '#fff',
  },
  title: {
    height: '20px',
    lineHeight: '20px',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    paddingLeft: '12px',
    borderLeft: '4px solid #666',
  },
  filter: {
    display: 'flex',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  filterLabel: {
    fontWeight: '500',
    color: '#999',
  },
  submitButton: {
    marginLeft: '20px',
  },
};
