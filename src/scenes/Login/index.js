import React from 'react';

// Components

// Custom Components
import LoginForm from './LoginForm';
// Styles
import './Login.scss';

// Images
// import logo from './images/logo.png';

const Login = props => (
  <div className="Login">
    <div className="Login-Main">
      <div className="Login-Pic">
        <div className="Login-Pic-Logo">
          <div className="Login-Pic-Text" />
        </div>
      </div>
      <div className="Login-Form">
        <LoginForm onLogin={props.onLogin} />
      </div>
    </div>
  </div>
);

export default Login;
