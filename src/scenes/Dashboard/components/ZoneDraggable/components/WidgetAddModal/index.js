import React, { Component } from 'react';

import { Modal, Button } from 'antd';

import './WidgetAddModal.scss';

export default class WidgetAddModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      widgets: (this.props.widgets || []).slice(),
    };
  }

  handleClickAdd(index) {
    const { widgets } = this.state;
    this.props.onAddWidget(widgets.splice(index, 1)[0]);
    this.setState({ widgets });
  }

  render() {
    return (
      <Modal
        title="Agregar widget"
        visible
        className="WidgetAddModal"
        footer={null}
      >
        {!this.state.widgets.length && <div className="WidgetAddModal-Empty">No tiene widgets por habilitar en esta zona</div>}
        {this.state.widgets.map(item => (
          <div className="WidgetAddModal-Row" key={item.code}>
            <div className="WidgetAddModal-Title" key={item.code}>{item.title}</div>
            <Button onClick={index => this.handleClickAdd(index)} />
          </div>
        ))}
      </Modal>
    );
  }
}
