/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SettingsForm.scss';

import ReactImageUploadComponent from './Upload';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;


function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onChange(info) {
  console.log('onChane callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}

export default class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        description: '',
        num : '',
        price : '',
        avatar : {}
      },
      pictures: []
    };
  }


  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = (e) => {
    this.refs.form.validateAll((errors, values) => {
    console.log(e.target)
      //console.log('errors', errors, 'values', values);
    });
  };

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
              <h2 style={styles.formTitle}>添加商品</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  商品名称 ：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required max={10} message="必填">
                    <Input size="large" />
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
                    <Input type="string" name="num" min="1" max="999" size="large"/>
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
                    <Input type="string" name="price" size="large"/>
                  </IceFormBinder>
                  <IceFormError name="price" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label} >
                  图片信息：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="picture">
                    <ReactImageUploadComponent style={{ maxWidth: '500px' }}
                    withPreview={true} 
                    name = "picture"
                    />
                   
                  </IceFormBinder>
                  <IceFormError name="picture" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  商品描述：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="description">
                    <Input size="large" multiple placeholder="请输入描述..." />
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
                提 交
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
