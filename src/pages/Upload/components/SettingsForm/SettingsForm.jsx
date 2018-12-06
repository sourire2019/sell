/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Upload, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SettingsForm.scss';

import Web3 from 'web3';
import TruffleContract from "truffle-contract";

import Sell from '../../../../../build/contracts/Sell.json'

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

import Operations from "../../../../api/api";
const upload = Operations.upload

const compile = Operations.compile

export default class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this.state = {
      id : window.location.hash.split("=")[1] || "0",
      name : '',
      price : '',
      description : '',
      picture : [],
      web3Provider : null,
      status : 0,
      breed : ''
    };
    this.namechange = this.namechange.bind(this);
    this.pricechange = this.pricechange.bind(this);
    this.descriptionchange = this.descriptionchange.bind(this);
    this.breedchange = this.breedchange.bind(this);
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
          return instance.select(athis.state.id)
        }).then(result => {
          athis.setState({
            name : result.name,
            price : result.price,
            description : result.description,
            status : result.status,
            breed : result.breed,
            web3Provider : web3.currentProvider,
            web3 : web3,
            Purchase : Purchase
          })
        })

      }
    })

  }


  validateAllFormField = async() => {

    let athis = this;
    this.state.web3.eth.getAccounts(function(err,accounts){
      if(err){
        console.log(err)
      }else{
        athis.state.Purchase.deployed().then(function(instance){
        return instance.upload(athis.state.id, athis.state.name, athis.state.price, athis.state.description, athis.state.status, athis.state.breed, {from : accounts[0]});
        }).then( result => {
          window.location.href = window.location.origin + '#/home'
        })
      }
    })
  };
  close = () => {
    window.location.href = window.location.origin + '#/home'
  }
  namechange (e) {
    this.setState({
      name : e
    })
  }

  pricechange (e) {
    this.setState({
      price : e
    })
  }
  descriptionchange (e) {
    this.setState({
      description : e
    })
  }
  breedchange (e) {
    this.setState({
      breed : e
    })
  }
  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>更改商品信息</h2>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  商品名称 ：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required max={10} message="必填">
                    <Input size="large" name = "name" value = {this.state.name} onChange = {this.namechange} />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  商品价格 ：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="price" required max={10} message="必填">
                    <Input type="string" name="price" size="large" value = {this.state.price} onChange = {this.pricechange}/>
                  </IceFormBinder>
                  <IceFormError name="price" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  商品品种 ：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="breed" required max={10} message="必填">
                    <Input type="string" name="breed" size="large" value = {this.state.breed} onChange = {this.breedchange}/>
                  </IceFormBinder>
                  <IceFormError name="breed" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  商品描述：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="description">
                    <Input size="large" multiple value = {this.state.description} onChange = {this.descriptionchange} />
                  </IceFormBinder>
                  <IceFormError name="description" />
                </Col>
              </Row>
            </div>

          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
                onClick={this.validateAllFormField}
              >
                更 改
              </Button>
              <Button
                size="large"
                type="primary"
                style={{ width: 100 , marginLeft : '10px'}}
                onClick={this.close}
              >
                取 消
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
