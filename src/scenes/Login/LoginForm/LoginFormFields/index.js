import React, { Component } from 'react';

// Components
import {
  Form,
  Icon,
  Input,
  Button,
} from 'antd';

// Services
import AuthService from 'services/AuthService';

// Custom Components
import './LoginFormFields.scss';

const FormItem = Form.Item;

class LoginFormFields extends Component {
  constructor(props) {
    super(props);
    this.state = { isProcessing: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const model = values;
        model.captchaResponse = this.state.captchaResponse;

        this.setState({ isProcessing: true });
        AuthService
          .signin(model)
          .then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.user);
            localStorage.setItem('email', response.data.email);
            this.props.onLogin(true);
          })
          .catch(() => {
            this.setState({ isProcessing: false });
            this.props.form.resetFields();
          });
      } else {
        this.setState({ isProcessing: false });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="LoginFormFields"
      >
        <FormItem label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Este campo es obligatorio' },
              { type: 'email', message: 'Escriba una dirección de correo válida' },
            ],
          })(<Input
            disabled={this.state.isProcessing}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="correo@dominio.com"
          />)
          }
        </FormItem>
        <FormItem label="Contraseña">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Este campo es obligatorio' }],
          })(<Input
            disabled={this.state.isProcessing}
            prefix={<Icon type="ellipsis" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Contraseña"
          />)
          }
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.state.isProcessing}
            className="LoginFormFields-button full-width"
          >
            {'Iniciar Sesión'}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginFormFields);
