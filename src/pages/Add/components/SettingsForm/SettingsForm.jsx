/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Grid, Upload } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SettingsForm.scss';
import './index.css'
import FlipMove from 'react-flip-move';
import Operations from "../../../../api/api";

const add = Operations.add

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const { ImageUpload } = Upload;

export default class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      files: [],
      value : {
        description : "",
        name : "",
        price : "",
        num : "",
        pictures : []
      }
    };
    this.inputElement = '';
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
    this.onDropFile = this.onDropFile.bind(this);
  }
  renderPreview() {
    return (
      <div className="uploadPicturesWrapper">
        <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles.renderPreview}>
          {this.renderPreviewPictures()}
        </FlipMove>
      </div>
    );
  }
  triggerFileUpload() {
    this.inputElement.click();
  }
  renderPreviewPictures() {
    return this.state.pictures.map((picture, index) => {
      return (
        <div key={index} style = {{width : "120px", height : '120px', marginTop : "10px"}}>
          <div className="deleteImage" onClick={() => this.removeImage(picture)} style = {{float : "right"}}>X</div>
          <img src={picture} className="uploadPicture" alt="preview" style = {{width : '100px', height : '100px'}}/>         
        </div>
      );
    });
  }


  onDropFile(e) {
    const files = e.target.files;
    const allFilePromises = [];
    for (let i = 0; i < files.length; i++) {
      let f = files[i];

      allFilePromises.push(this.readFile(f));
    }
    Promise.all(allFilePromises).then(newFilesData => {
      const dataURLs = this.state.pictures.slice();
      const files = this.state.files.slice();

      newFilesData.forEach(newFileData => {
        dataURLs.push(newFileData.dataURL);
        files.push(newFileData.file);
      });
      const {name , price , num, description} = this.state.value
      this.setState({
        pictures: dataURLs, 
        files: files, 
        value :{
          pictures : dataURLs,
          description : description,
          name : name,
          num : num,
          price : price
        }
      });
    });
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
       
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({file, dataURL});
      };

      reader.readAsDataURL(file);
    });
  }

  removeImage(picture) {
    const removeIndex = this.state.pictures.findIndex(e => e === picture);
    const filteredPictures = this.state.pictures.filter((e, index) => index !== removeIndex);
    const filteredFiles = this.state.files.filter((e, index) => index !== removeIndex);

    this.setState({pictures: filteredPictures, files: filteredFiles});
  }

  validateAllFormField = async(e) => {
    let result = await add(this.state.value)
    if(result.message =="success"){
    
       window.location.href = window.location.origin + '#/home'
    }else{
      alert("添加失败")
    }
  };
  formChange = (value) => {
    this.setState({
      value,
    });
  };
  close = () => {
    window.location.href = window.location.origin + '#/home'
  }
  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            ref="form"
            onChange={this.formChange}
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
                  <div>
                    <div className="next-upload-select next-upload-drop next-upload-select-picture-card" onClick = {this.triggerFileUpload}>
                      <span role="upload" tabIndex="0" action="" className="next-upload-select-inner" name="file">
                        <input type="file" accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp" style={{display: 'none'}}  
                        ref={input => this.inputElement = input}
                        onChange={this.onDropFile}
                        />
                        <i className="next-icon next-icon-add next-icon-large"></i>
                        <div className="next-upload-text">上传图片</div>
                      </span>
                    </div>
                    {this.renderPreview()}
                  </div>
                  
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
  renderPreview : {
    display: "flex",
    alignItems: "left",
    justifyContent: "left",
    flexWrap: "wrap",
    width: "100%",
  }
};
