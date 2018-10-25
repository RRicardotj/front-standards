import React, { Component } from 'react';
import { Modal } from 'antd';

import './AlertDialog.scss';

export default class AlertDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };

    this.resolveWith = this.resolveWith.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  confirm(text) {
    const q = new Promise((resolve) => { this.resolve = resolve; });

    this.setState({ message: text });

    return q;
  }

  resolveWith(value) {
    this.setState({ message: null });
    this.resolve(value);
  }

  render() {
    return (
      <Modal
        visible={!!this.state.message}
        maskClosable={false}
        closable={false}
        className="AlertDialog"
        title="Confirme"
        onOk={() => this.resolveWith(true)}
        onCancel={() => this.resolveWith(false)}
        okText="Ok"
        cancelText="Cancelar"
      >
        <div className="AlertDialog-text">{this.state.message}</div>
      </Modal>
    );
  }
}
