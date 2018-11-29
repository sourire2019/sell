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
      num : '',
      price : '',
      description : ''
    };
    this.namechange = this.namechange.bind(this);
    this.numchange = this.numchange.bind(this);
    this.pricechange = this.pricechange.bind(this);
    this.descriptionchange = this.descriptionchange.bind(this);
  }
 
  async componentWillMount () {
    let result = await compile(this.state.id);
    this.setState({
      name : result.name,
      num : result.num,
      price : result.price,
      description : result.description,
      value : {}
    })

  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = async() => {
    let value = this.state.value;
    let uploadValue = {
      id : this.state.id,
      value : value
    }
    let result = await upload(uploadValue)
    if(result.message =="success"){
    
       window.location.href = window.location.origin + '#/page5'
    }else{
      alert("添加失败")
    }
  };
  close = () => {
    window.location.href = window.location.origin + '#/page5'
  }
  namechange (e) {
    this.setState({
      name : e
    })
  }
  numchange (e) {
    this.setState({
      num : e
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
  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
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
                  商品数量 ：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="num" required max={10} message="必填">
                    <Input type="string" name="num" min="1" max="999" size="large" value = {this.state.num} onChange = {this.numchange}/>
                  </IceFormBinder>
                  <IceFormError name="num" />
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
