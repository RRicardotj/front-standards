import React, { Component } from 'react';

// Components
import { Route, withRouter } from 'react-router-dom';
import {
  Button,
  Spin,
  Layout,
  Menu,
  Popover,
  Icon as AntIcon,
} from 'antd';


// Custom Components
import Dashboard from 'scenes/Dashboard';
import Icon from 'components/Icon';

// Styles
import './Main.scss';

const { Sider } = Layout;
// const { SubMenu } = Menu;
const antIcon = <AntIcon type="loading" style={{ fontSize: 24 }} spin />;

class Main extends Component {
  constructor(props) {
    super(props);

    console.log('Dentro de Main');

    this.state = {
      menu: [],
      defaultSelectedKeys: [],
      defaultOpenKeys: [],
      siderCollapsed: true,
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleSiderButtonClick = this.handleSiderButtonClick.bind(this);
  }

  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('employeeId');
    this.props.onLogout(false);
  }

  handleSiderButtonClick() {
    this.setState(prevState => ({ siderCollapsed: !prevState.siderCollapsed }));
  }

  render() {
    if (!this.state.menu) {
      return (
        <div className="Main">
          <Spin indicator={antIcon} />
        </div>
      );
    }
    const userMenu = (
      <Menu>
        <Menu.Item
          key="1"
          className="Main-usermenu-menu"
          onClick={this.handleLogout}
        >
          <Icon icon="exit" />
          {'Cerrar Sesión'}
        </Menu.Item>
      </Menu>
    );
    const MenuItems = [];
    MenuItems.push((
      <Menu.Item key="/user-menu" className="Main-first-item">
        <div className="Main-userinfo">
          <Icon icon="userCircle" className="Main-userinfo-usericon" />
          <div className="Main-userinfo-text">
            <div>{window.localStorage.user}</div>
            <small>{window.localStorage.email}</small>
          </div>
          <Popover
            content={userMenu}
            trigger="focus"
            className="Main-usermenu"
          >
            <Button
              type="primary"
              className="Main-userinfo-logout"
            >
              <Icon icon="downArrow" className="Main-userinfo-logout-icon" />
            </Button>
          </Popover>

        </div>
      </Menu.Item>
    ));

    return (
      <div className="Main">
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            collapsed={this.state.siderCollapsed}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={this.state.defaultSelectedKeys}
              defaultOpenKeys={this.state.defaultOpenKeys}
              selectedKeys={[this.props.location.pathname]}
            >
              {MenuItems}
            </Menu>
          </Sider>
          <Layout>
            <Route
              exact
              path="/"
              render={props => (
                <Dashboard
                  {...props}
                  onLogoff={this.handleLogout}
                  onSiderButtonClick={this.handleSiderButtonClick}
                />
              )
              }
            />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(Main);
