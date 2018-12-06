import React, { Component } from 'react';
import Img from '@icedesign/img';
import { Grid } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';

import Operations from "../../../../api/api";

import Web3 from 'web3';
import TruffleContract from "truffle-contract";

import Coin from '../../../../../build/contracts/Coin.json'

import Dialog from 'react-bootstrap-dialog';

import src from './img/logo.png';
const detail = Operations.detail;

const { Row, Col } = Grid;

export default class BrandDisplay extends Component {
  static displayName = 'BrandDisplay';

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      dataSource : {},
      id : window.location.hash.split("=")[1] || "0",
      web3Provider : null,
      contracts : {},
      url : '',
      req : {},
      value : 1,
      picture : null,
      display : "none",
      left : 0,
      top  : 0
    };
    this.lastX = null;
    this.lastY = null;
    this.handleMin = this.handleMin.bind(this)
    this.handleMax = this.handleMax.bind(this)
    this.valuechange = this.valuechange.bind(this)
    this.move = this.move.bind(this)
  }

  componentWillMount = async() => {
    let result = await detail(this.state.id)
    this.setState({dataSource : result, picture : result.picture[0]})
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    }
    this.setState({
      web3Provider : web3.currentProvider,
      web3 : web3
    })
    this.initContract();
  }

  initContract = () => {

    let Purchase = TruffleContract(Coin);
    this.setState({Purchase : TruffleContract(Coin)})
       this.state.Purchase.setProvider(this.state.web3Provider);
  }
  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  buy =() => {
    var purchaseInstance;
    let athis = this;
    this.state.web3.eth.getAccounts(function(err,accounts){
      if(err){
        console.log(err)
      }else{
        athis.state.Purchase.deployed().then(function(instance){
          let purchaseInstance = instance;
          let str = '0xf245074E0C708c9D06070FB8248f5e38bfCf9375'
          let price = JSON.parse(athis.state.dataSource.price)*athis.state.value
          athis.setState({price : price})
          return purchaseInstance.transfer(str,price*1e2, {from : accounts[0]});
        }).then(function(result) {
          let value = {};
          value.txHash = result.tx;
          value.blockNumber = result.receipt.blockNumber;
          athis.state.Purchase.deployed().then(function(ins){
            return ins.getMessage.call();
          }).then(function(res){
            value.userId = res;

            athis.dialog.show({
              title : '购买成功',
              body:<div>
                <div>
                  <span>购买产品 :</span> {athis.state.dataSource.name}
                </div>
                <div>
                  <span>付款金额 :</span> {athis.state.price}
                </div>
              </div>,
              bsSize: 'medium',
              onHide: (dialog) => {
                dialog.hide()
              }
            })
          })
        }) 
      }
    })
  }

  handleMin =() => {
    if(this.state.value <= 1){
      this.setState({
        value : 1
      })
    }else{
      this.setState({
        value : this.state.value -1
      })
    }
  }

  handleMax = () => {
    if(this.state.value >= this.state.dataSource.surplusstock){
      this.setState({
        value : this.state.dataSource.surplusstock
      })
    }else{
      this.setState({
        value : this.state.value +1
      })
    }
  }

  valuechange = (e) => {
    if(e.target.value <=1){
      this.setState({
        value : 1
      })
      }else if(e.target.value >= this.state.dataSource.surplusstock){
        this.setState({
          value : this.state.dataSource.surplusstock
        })
    }else {
      let reg = /^[1-9]+?[0-9]*$/;
      if(reg.test(e.target.value)){
        this.setState({
          value : e.target.value
        })
      }else{
        this.setState({
          value : 1
        })
      }
     
  }
  }
  click = (src) => {
    this.setState ({
      picture : src
    })
  }

  move = (e) =>{

    let x = e.clientX - this.div.offsetWidth;
    let y = e.clientY - this.div.offsetHeight;
      if(x <=0){
        x =0
      }else if( x >= this.div.offsetWidth -this.movediv.offsetWidth ){
          x = this.div.offsetWidth - this.movediv.offsetWidth 
      }

      if(y <=0){
          y = 0
      }else if(y >= this.div.offsetHeight - this.movediv.offsetHeight){
          y = this.div.offsetHeight -this.movediv.offsetHeight
      }

      this.setState ({
          top : y + 'px',
          left : x +'px',
          display  : 'block'
      })
  }

  leave = () => {
      this.setState ({
        display : "none"
    })
  }
  render() {
    const { isMobile } = this.state;
    const logoWidth = isMobile ? 150 : 195;
    const logoHeight = isMobile ? 150 : 175;
    return (
      <div className="brand-display" style={styles.container}>
          <div style={styles.brandHeader}>
            <h1 className="text-center" style={{fontSize: '36px', marginBottom: '10px', marginTop: '20px'}}>商品详情页面</h1>
            <hr/>
            <br/>
          </div>
          <a href="/" style={{position: 'absolute', top: '18%', right: '0' }}>返回首页</a>
          <Row>
            <Col xxs="24" s="24" l="12">
              <div style={{border: '1px solid', position : 'relative'}} ref={(el) => { this.div = el }}>
                <img alt="140*140" 
                  className="img-rounded img-center" style={{width: '100%', height  : '300px'}} 
                  src={this.state.picture == null ? ("") : (this.state.picture)}
                 />
                <div style = {{height : '100px', width : '100px', background :"red", position : "absolute", display : this.state.display, opacity : '0.3',left : this.state.left, top : this.state.top  }} ref={(el) => { this.movediv = el }}></div>
              </div>
              <Row>
                <Col xxs="8" s="8" l="8" onClick = {() => {this.click (this.state.dataSource  .picture[0])}} style = {{float : 'left', marginTop : '10px'}}>
                  <img src={this.state.dataSource.picture == undefined ? ("") : (this.state.dataSource.picture[0])}
                  style={{width: '100%', height : '100px'}}/>
                </Col>
                <Col xxs="8" s="8" l="8" onClick = {() => {this.click (this.state.dataSource  .picture[1])}} style = {{float : 'left' , marginTop : '10px'}}>
                  <img src={this.state.dataSource.picture == undefined ? ("") : (this.state.dataSource.picture[1])}
                  style={{width: '100%', height : '100px'}}/>
                </Col>
                <Col xxs="8" s="8" l="8" onClick = {() => {this.click (this.state.dataSource  .picture[2])}} style = {{float : 'left', marginTop : '10px'}}>
                  <img src={this.state.dataSource.picture == undefined ? ("") : (this.state.dataSource.picture[2])}
                  style={{width: '100%', height : '100px'}}/>
                </Col>
              </Row>
            </Col>
            <Col xxs="24" s="24" l="10" style = {{marginLeft : '100px', marginTop : '80px'}}>
              <h1 className ="panel-title" style={{lineHeight: '1', fontSize: '16px', fontWeight: '700', fontFamily: 'microsoft yahei'}} >{this.state.dataSource.name}</h1>
              <br />
              <ul>
                <li>
                  <strong>品牌&nbsp;</strong>:&nbsp;<span className="part-breed">{this.state.dataSource.brand}</span><br/>
                  <br />
                </li>
                <li>
                  <strong>产地&nbsp;</strong>:&nbsp;<span className="part-location">{this.state.dataSource.location}</span><br/><br />
                </li>
                <li>
                  <strong>购买数量&nbsp;</strong>:&nbsp;<input className="min" name="" type="button" value="-" onClick = {() => {this.handleMin()}}/>
                  <input className="text_box" name="goodnum" type="text" value= {this.state.value} style={{width:'40px', margin: '0', padding: '0' }} onChange = {this.valuechange}/>
                  <input className="add" name="" type="button" value="+" onClick = {() => {this.handleMax()}}/>
                  （剩余库存: <span className="part-quantity">{this.state.dataSource.surplusstock}</span>）
                  <br/><br/>
                </li>
                <li>
                  <strong>价格&nbsp;</strong>:&nbsp;<span className="part-price">{this.state.dataSource.price}</span>
                </li>
              </ul>
              <button className="btn-adopt" style={{width: '50%', marginLeft: '25%',backgroundColor: '#ffeded', border: '1px solid #FF0036', color: '#FF0036',  fontFamily: 'microsoft yahei', height: '38px', lineHeight: '38px', textAlign: 'center', fontSize: '16px'}} onClick= {() => {this.buy()}}>立即购买</button>
            </Col>
          </Row>
          <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 20px',
  },
  brandHeader: {
    position: 'relative',
    textAlign: 'center',
  },
  brandTitle: {
    marginBottom: '40px',
    fontSize: '20px',
    color: '#333333',
  },
  brandItem: {
    height: '175px',
    background: '#fff',
    display: 'inline-block',
    verticalAlign: 'top',
    marginBottom: '30px',
    overflow: 'hidden',
  },
  brandItemContent: {
    display: 'flex',
  },

  caseContent: {},
  caseSubject: {
    margin: '0 10px 0',
    lineHeight: '60px',
    height: '60px',
  },
  subjectImage: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
  },
  subjectDesc: {
    fontSize: '16px',
    color: '#333333',
    height: '60px',
    verticalAlign: 'top',
    marginLeft: '12px',
  },
  caseDetail: {
    marginTop: 0,
    fontSize: '12px',
    color: '#666666',
    padding: '0 16px',
    textAlign: 'left',
  },
};
