import React, { Component } from 'react';

// Custom Components
import LoginFormFields from './LoginFormFields';

// Styles
import './LoginForm.scss';

export default class LoginForm extends Component {
  render() {
    return (
      <div className="LoginForm">
        <LoginFormFields
          ref={(ref) => { this.loginFormFields = ref; }}
          onLogin={this.props.onLogin}
        />
      </div>
    );
  }
}
