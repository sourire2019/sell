import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Balloon, Icon } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';
import IceImg from '@icedesign/img';
import Logo from '../Logo';
import './Header.scss';
import cookie from 'react-cookies'

@withRouter
export default class Header extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    
  }

  drop = () => {
    cookie.remove("login")
  }
  render() {
    return (
      <div className="header-container">
        <div className="header-content">
          <Logo isDark />
          {
            cookie.load("login")==undefined ? ("") :(
              <Balloon
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <IceImg
                  height={40}
                  width={40}
                  src={require('./images/logo.png')}
                  style = {{background : 'white'}}
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    个人
                  </span>
                  <br />
                  <span className="user-department">中心</span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <Link to="/home">
                  <FoundationSymbol type="person" size="small" />
                  我的主页
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/add">
                  <FoundationSymbol type="repair" size="small" />
                  添加商品
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/login" onClick = {this.drop}>
                  <FoundationSymbol type="compass" size="small" />
                  退出
                </Link>
              </li>
            </ul>
          </Balloon>
            )
          }
          
        </div>
      </div>
    );
  }
}
