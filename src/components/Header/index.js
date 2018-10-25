import React, { Component } from 'react';

// Components
import { Button, Layout, Tooltip } from 'antd';

// Custom Components
import Icon from 'components/Icon';

// Styles
import './Header.scss';

const AntHeader = Layout.Header;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siderCollapsed: false,
    };
    this.handleClickSiderButton = this.handleClickSiderButton.bind(this);
  }

  handleClickSiderButton() {
    this.props.onSiderButtonClick();
  }

  render() {
    return (
      <AntHeader
        style={{ padding: 0 }}
        key={1}
        className="Header"
      >
        <div className="Header-siderButton">
          <Button
            type="primary"
            onClick={this.handleClickSiderButton}
          >
            <Icon
              icon="burgerMenu"
              size={24}
              className={this.state.siderCollapsed ? 'Header-siderButton-collapsed' : 'Header-siderButton-noCollapsed'}
            />
          </Button>
        </div>
        <div className="Header-title">
          {this.props.title ? `${this.props.title}` : 'My App'}
        </div>
        {this.props.onAction && (
          <Tooltip
            title={this.props.tooltip}
            placement="left"
          >
            <div className="Header-action">
              <Button
                type="primary"
                onClick={this.props.onAction}
              >
                <Icon icon={this.props.icon || 'plus'} />
              </Button>
            </div>
          </Tooltip>)}
      </AntHeader>
    );
  }
}
