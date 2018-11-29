import React, { Component } from 'react';
import { Table, Pagination, Balloon, Icon } from '@icedesign/base';

import Operations from "../../../../api/api";

const select = Operations.select


export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      dataSource : []
    };
  }
  async componentWillMount () {
    let result = await select();
    this.setState({
      dataSource : result.data
    })

  }
  handlePagination = (current) => {
    this.setState({
      current,
    });
  };

  click = (index) => {
    let id = this.state.dataSource[index].id
    window.location.href = window.location.origin + '#/page6?id=' + id
  }
  renderOper = (record, index) => {
    return (
      <div style={styles.oper}>
        <Icon type="edit" size="small" style={styles.editIcon} onClick = {() => this.click (index)}/>
      </div>
    );
  };

  render() {
    
    return (
      <div style={styles.tableContainer}>
        <Table
          dataSource={this.state.dataSource}
          hasBorder={false}
          className="custom-table"
        >
          <Table.Column
            width={100}
            lock="left"
            title="序列号"
            dataIndex="id"
            align="center"
          />
          <Table.Column
            width={100}
            lock="left"
            title="商品名称"
            dataIndex="name"
            align="center"
          />
          <Table.Column
            width={100}
            lock="left"
            title="商品数量"
            dataIndex="num"
            align="center"
          />
          <Table.Column
            width={100}
            lock="left"
            title="商品价格"
            dataIndex="price"
            align="center"
          />
          <Table.Column
            width={100}
            lock="left"
            title="已售商品数量"
            dataIndex="sell"
            align="center"
          />
          <Table.Column
            width={100}
            lock="left"
            title="商品描述"
            dataIndex="description"
            align="center"
          />
          <Table.Column
            width={100}
            lock="left"
            title="第一次更新时间"
            dataIndex="time"
            align="center"
          />
          <Table.Column
            width={100}
            lock="left"
            title="最后一次更新时间"
            dataIndex="updatetime"
            align="center"
          />
          <Table.Column
            width={100}
            title="操作"
            cell={this.renderOper}
            lock="left"
            align="center"
          />
        </Table>
      </div>
    );
  }
}

const styles = {
  tableContainer: {
    background: '#fff',
    paddingBottom: '10px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
  editIcon: {
    color: '#999',
    cursor: 'pointer',
  },
  circle: {
    display: 'inline-block',
    background: '#28a745',
    width: '8px',
    height: '8px',
    borderRadius: '50px',
    marginRight: '4px',
  },
  stateText: {
    color: '#28a745',
  },
};
