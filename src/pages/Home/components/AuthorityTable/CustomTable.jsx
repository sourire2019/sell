import React, { Component } from 'react';
import { Table, Pagination, Balloon, Icon , Button} from '@icedesign/base';


import Web3 from 'web3';
import TruffleContract from "truffle-contract";

import Sell from '../../../../../build/contracts/Sell.json'




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
    if (typeof web3 !== 'undefined') {
      web3 =await new Web3(web3.currentProvider);
    } else {
      web3 = await new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    }
    let Purchase = await TruffleContract(Sell);
    Purchase.setProvider(web3.currentProvider);
    let athis = this;
    web3.eth.getAccounts(function(err,accounts){
      if(err){
        console.log(err)
      }else{
        
        Purchase.deployed().then( instance => {
          return instance.getTotal()
        }).then(result => {
          athis.setState({
            dataSource : result
          })
        })

      }
    })

  }
  handlePagination = (current) => {
    this.setState({
      current,
    });
  };

  click = (index) => {
    let id = this.state.dataSource[index].id
    window.location.href = window.location.origin + '#/upload?id=' + id
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
            title="序列号"
            dataIndex="id"
            align="center"
          />
          <Table.Column
            width={100}
            title="商品名称"
            dataIndex="name"
            align="center"
          />
          <Table.Column
            width={100}
            title="商品价格"
            dataIndex="price"
            align="center"
          />
          <Table.Column
            width={100}
            title="商品品种"
            dataIndex="breed"
            align="center"
          />
          <Table.Column
            width={100}
            title="商品状态"
            dataIndex="status"
            cell = { row => (
              row == 0 ? ("养殖场") : ("其他")
            )

            }
            align="center"
          />
          <Table.Column
            width={100}
            title="商品描述"
            dataIndex="description"
            align="center"
          />
          <Table.Column
            width={100}
            title="商品数量"
            cell = {<span>1</span>}
            align="center"
          />
          <Table.Column
            width={100}
            title="剩余商品数量"
            dataIndex="num"
            align="center"
          />
          <Table.Column
            width={100}
            title="操作"
            cell={this.renderOper}
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
