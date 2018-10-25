import React, { Component } from 'react';

// Custom Components
import Main from 'scenes/Main';
import Login from 'scenes/Login';
import Loading from 'components/Loading';
import AlertDialog from 'components/AlertDialog';
import { BrowserRouter as Router } from 'react-router-dom';

// Services
import AuthService from 'services/AuthService';
import Toolkit from 'services/Toolkit';

// Styles
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasToken: localStorage.getItem('token') ? undefined : false,
    };
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  componentDidMount() {
    document.addEventListener('httpError', e => Toolkit.showNotification('error', 'Error', e.detail));
    document.addEventListener('httpSuccess', e => Toolkit.showNotification('success', 'Información', e.detail));
    document.addEventListener('apiOffline', e => Toolkit.showNotification('info', 'API desconectada', e.detail));
    document.addEventListener('httpInfo', e => Toolkit.showNotification('info', 'Información', e.detail));
    document.addEventListener('tokenError', () => {
      if (localStorage.token) {
        delete localStorage.token;
        delete localStorage.user;
        delete localStorage.email;
        Toolkit.showNotification('error', 'Sesión Terminada', 'Por favor, inicie sesión nuevamente para continuar.');
        this.setState({
          hasToken: false,
        });
      }
    });
    if (this.state.hasToken === undefined) {
      AuthService.check()
        .then((response) => {
          this.setState({ hasToken: response.data.isValid });
          Toolkit.registerDialog(this.alertDialog);
        });
    }
  }

  isAuthenticated(isAuthenticated) {
    this.setState({ hasToken: isAuthenticated });
  }

  render() {
    console.log(this.state.hasToken);
    if (!this.state.hasToken === undefined) {
      return (
        <div className="App">
          <div className="App-loading">
            <Loading />
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        {this.state.hasToken ? (
          <Router>
            <Main onLogout={this.isAuthenticated} />
          </Router>
        )
          : <Login onLogin={this.isAuthenticated} />
        }
        <AlertDialog ref={(_c) => { this.alertDialog = _c; }} />
      </div>
    );
  }
}

export default App;
