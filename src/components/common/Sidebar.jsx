import React from 'react';
import {
  Layout,
  Menu,
  Icon
} from 'antd';
import {
  Link
} from 'react-router-dom';
import {
  LOGO_PATH,
  LOGO_SMALL_PATH
} from '../../constants/file_paths';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import t from '../../constants/language';

const { Sider } = Layout;
var currentLanguage = 0;
export default class Sidebar extends React.Component {
  constructor() {
    super();

    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  componentWillMount() {
    if (this.props.multiLanguage.currentLanguage != null) {
      currentLanguage = this.props.multiLanguage.currentLanguage;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.multiLanguage.currentLanguage != null) {
      currentLanguage = nextProps.multiLanguage.currentLanguage;
    }
  }
  render() {
    return (
      <Sider className="cssSider" collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse} >
        {this.state.collapsed
          ? <img src={LOGO_SMALL_PATH} style={{ width: '65%', height: 'auto', margin: 8 }} alt="" />
          : <img src={LOGO_PATH} style={{ width: '75%', height: 'auto', margin: '10px auto', display: 'block' }} alt="" />
        }
        <Menu defaultSelectedKeys={['sub1']} mode="inline">
          <Menu.Item key="sub1" >
            <Link to="/overview/dashboard">
              <Icon type="home" /> {this.state.collapsed ? '' : t[currentLanguage].LEFT_MENU_HOME_PAGE}
            </Link>
          </Menu.Item>
          <Menu.Item key="sub2" >
            <Link to="/visualization/overview">
              <Icon type="tool" /> {this.state.collapsed ? '' : t[currentLanguage].LEFT_MENU_SERVICE}
            </Link>
          </Menu.Item>
          <Menu.Item key="sub3" >
            <Link to="/visualization/overview">
              <Icon type="ie" /> {this.state.collapsed ? '' : t[currentLanguage].LEFT_MENU_E_COMMERCE}
            </Link>
          </Menu.Item>
          <Menu.Item key="sub4" >
            <Link to="/visualization/overview">
              <Icon type="user" /> {this.state.collapsed ? '' : t[currentLanguage].LEFT_MENU_USER}
            </Link>
          </Menu.Item>
          <Menu.Item key="sub5" >
            <Link to="/visualization/overview">
              <Icon type="fund" /> {this.state.collapsed ? '' : t[currentLanguage].LEFT_MENU_REPORT}
            </Link>
          </Menu.Item>
          <Menu.Item key="sub6" >
            <Link to="/visualization/overview">
              <Icon type="setting" /> {this.state.collapsed ? '' : t[currentLanguage].LEFT_MENU_CONFIG}
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
