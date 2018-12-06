import React, { Component } from 'react';
import Img from '@icedesign/img';
import { Grid } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import './main.css'
import src from './img/1.jpg'
import src1 from './img/2.jpg'
import src2 from './img/3.jpg'
import src3 from './img/4.jpg'
import Web3 from 'web3';
import TruffleContract from "truffle-contract";

import Sell from '../../../../../build/contracts/Sell.json';

const { Row, Col } = Grid;

export default class BrandDisplay extends Component {
  static displayName = 'BrandDisplay';

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      id : window.location.hash.split("=")[1] || "0",
      imgsrc : src,
      name : '',
      price : '',
      description : '',
      status : 0,
      breed : ''
    };
    this.move = this.move.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.changeimg = this.changeimg.bind(this);
    this.buy = this.buy.bind(this);
    this.changetab = this.changetab.bind(this);
    this.clearColor = this.clearColor.bind(this);
  }

  componentWillMount = async() => {
    
    if(typeof web3 !== 'undefined') {
      web3 =await new Web3(web3.currentProvider);
    }else {
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
          athis.show.style.background="#efefef";
          athis.show.style.fontWeight="bolder";
          athis.show.style.color="black";
          athis.show2.style.background="#efefef";
          athis.show2.style.fontWeight="bolder";
          athis.show2.style.color="black";
        })
      }
    })
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
  move = (e) => {
    this.mask.style.display = 'block';
    this.fangda.style.display = 'block';
    var x=e.clientX;
    var y=e.clientY;
    var maskl=x-this.maxbox.offsetLeft-this.mask.offsetWidth/2;
    var maskt=y-this.maxbox.offsetTop+this.mask.offsetHeight/2;
    if(maskl<=0){
      maskl=0;
    }else if(maskl>=this.maxbox.offsetWidth-this.mask.offsetWidth){
      maskl=this.maxbox.offsetWidth-this.mask.offsetWidth;
    }
    if(maskt<=0){
      maskt=0;
    }else if(maskt>=this.maxbox.offsetHeight-this.mask.offsetHeight){
      maskt=this.maxbox.offsetHeight-this.mask.offsetHeight;        
    }
    this.mask.style.left=maskl+"px";
    this.mask.style.top=maskt+"px";
    var w=this.fangdaimg.offsetWidth/this.maximg.offsetWidth;
    var h=this.fangdaimg.offsetHeight/this.maximg.offsetHeight;
    this.fangda.scrollLeft=maskl*w;
    this.fangda.scrollTop=maskt*h;
  }

  mouseout = () => {
    this.mask.style.display = 'none';
    this.fangda.style.display = 'none';
  }

  changeimg = (url) => {
    this.setState({
      imgsrc : url
    })
  }

  clearColor = () => {
    this.show.style.background = '';
    this.show.style.fontWeight = '';
    this.flow.style.background = '';
    this.flow.style.fontWeight = '';
    this.assess.style.background = '';
    this.assess.style.fontWeight = '';
    this.service.style.background = '';
    this.service.style.fontWeight = '';
    this.show2.style.background = '';
    this.show2.style.fontWeight = '';
    this.flow2.style.background = '';
    this.flow2.style.fontWeight = '';
    this.assess2.style.background = '';
    this.assess2.style.fontWeight = '';
    this.service2.style.background = '';
    this.service2.style.fontWeight = '';
    this.showdiv.style.display = 'none';
    this.flowdiv.style.display = 'none';
    this.assessdiv.style.display = 'none';
    this.servicediv.style.display = 'none';
  }
  changetab = (id) => {
    this.clearColor()
    if(id ==0 ) {
      this.show.style.background="#efefef";
      this.show.style.fontWeight="bolder";
      this.show.style.color="black";
      this.show2.style.background="#efefef";
      this.show2.style.fontWeight="bolder";
      this.show2.style.color="black";
      this.showdiv.style.display = 'block';
    }else if (id == 1) {
      this.flow.style.background="#efefef";
      this.flow.style.fontWeight="bolder";
      this.flow.style.color="black";
      this.flow2.style.background="#efefef";
      this.flow2.style.fontWeight="bolder";
      this.flow2.style.color="black";
      this.flowdiv.style.display = 'block';
    }else if(id ==2) {
      this.assess.style.background="#efefef";
      this.assess.style.fontWeight="bolder";
      this.assess.style.color="black";
      this.assess2.style.background="#efefef";
      this.assess2.style.fontWeight="bolder";
      this.assess2.style.color="black";
      this.assessdiv.style.display = 'block';
    }else if (id == 3) {
      this.service.style.background="#efefef";
      this.service.style.fontWeight="bolder";
      this.service.style.color="black";
      this.service2.style.background="#efefef";
      this.service2.style.fontWeight="bolder";
      this.service2.style.color="black";
      this.servicediv.style.display = 'block';
    }
    
  }

  buy = () => {
    let athis = this;
    this.state.web3.eth.getAccounts((err, accounts) => {
      if(err){
        console.error(err)
      }else {
        athis.state.Purchase.deployed().then(instance => {
          let str = '0xf245074E0C708c9D06070FB8248f5e38bfCf9375';
          return instance.transfer(str, athis.state.price,  {from : accounts[0]})
        }).then(result => {
          console.log(result)
          alert("购买成功")
        })
      }
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
        <div id= 'table' >
          <div className = 'topl'>
            <div id= 'maximg' onMouseMove = {this.move} onMouseOut = {this.mouseout} ref={el => this.maxbox = el}>
              <img src = {this.state.imgsrc} ref={el => this.maximg = el}/>
              <div id="mask" ref={el => this.mask = el}></div>
            </div>
            <div id="minimg">
              <ul>
                <li>
                  <img src={src} onClick = { () => this.changeimg(src)}/>
                </li>
                <li>
                  <img src={src1} onClick = { () => this.changeimg(src1)}/>
                </li>
                <li>
                  <img src={src2} onClick = { () => this.changeimg(src2)}/>
                </li>
                <li>
                  <img src={src3} onClick = { () => this.changeimg(src3)}/>
                </li>
              </ul>
            </div>
          </div>
          <div id="fangda" ref={el => this.fangda = el}>
            <img src={this.state.imgsrc} ref={el => this.fangdaimg = el}/>
          </div>
          <div className = 'topr'>
            <div style = {{marginLeft : '20px'}}>
              <div className="tittle1">{this.state.name}</div>
              <br />
              <div className = 'topr-div'>
                <strong>品种 ： </strong> <span> {this.state.breed}</span>
              </div>
              <br />
              <div className = 'topr-div'>
                <strong> 状态 ： </strong> <span> {this.state.status ==0 ? ("养殖场") : ("其他")} </span>
              </div>
              <br />
              <div className = 'topr-div'>
                <strong>价格 ： </strong><span>{this.state.price}</span>
              </div>
              <br />
              <div className = 'topr-div'>
                <strong>描述 ： </strong><span>{this.state.description}</span>
              </div>
              <br />
              <div style={{overflow: 'hidden',position : 'absolute', bottom : 0, width : '300px', marginBottom : '20px'}} onClick = {this.buy}>
                <a id="dinggou1"><input type="button" value="立即订购" id="dinggou"/></a>
              </div>
            </div>
          </div>
        </div>
        <div className = 't1' id = 'daohang1'>
          <a onClick = {() => {this.changetab(0)}}><span className="t2" style={{background: '#efefef', fontWeight: 'bolder'}} ref={el => this.show = el} >商品展示</span></a>
          <a onClick = {() => {this.changetab(1)}}><span className="t2" ref={el => this.flow = el}>配镜流程</span></a>
          <a onClick = {() => {this.changetab(2)}}><span className="t2" ref={el => this.assess = el}>用户评价</span></a>
          <a onClick = {() => {this.changetab(3)}}><span className="t2" ref={el => this.service = el}>售后服务</span></a>
        </div>
        <div ref={el => this.showdiv = el}>
          <div id="shangpin">商品细节</div>
          <div id="xijie">
            <ul>
              <li>
                <img src={src} />
              </li>
              <li>
                <img src={src1} />
              </li>
              <li>
                <img src={src2} />
              </li>
            </ul>
          </div>
        </div>
        <div ref={el => this.flowdiv = el} style = {{display : 'none'}} >
          <div id="shangpin">配镜流程</div>
        </div>
        <div ref={el => this.assessdiv = el} style = {{display : 'none'}}>
          <div id="shangpin">用户评价</div>
        </div>
        <div ref={el => this.servicediv = el} style = {{display : 'none'}}>
          <div id="shangpin">售后服务</div>
        </div>
        <div className="t1" style={{marginTop: '40px'}} id="daohang2">
          <a onClick = {() => {this.changetab(0)}}><span className="t2" style={{background: '#efefef', fontWeight: 'bolder'}} ref={el => this.show2 = el} >商品展示</span></a>
          <a onClick = {() => {this.changetab(1)}}><span className="t2" ref={el => this.flow2 = el}>配镜流程</span></a>
          <a onClick = {() => {this.changetab(2)}}><span className="t2" ref={el => this.assess2 = el}>用户评价</span></a>
          <a onClick = {() => {this.changetab(3)}}><span className="t2" ref={el => this.service2 = el}>售后服务</span></a>
        </div>
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
  }
}