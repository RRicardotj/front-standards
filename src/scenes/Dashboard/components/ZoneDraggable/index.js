import React, { Component } from 'react';

import { Button } from 'antd';

import WidgetDraggable from './components/WidgetDraggable';
import WidgetAddModal from './components/WidgetAddModal';

import './ZoneDraggable.scss';

export default class ZoneDraggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      widgets: (this.props.widgets || []).slice(),
    };

    this.moveWidget = this.moveWidget.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleClickAddWidget = this.handleClickAddWidget.bind(this);
    this.getItems = this.getItems.bind(this);
    this.handleClickHide = this.handleClickHide.bind(this);
    this.handleEnableWidget = this.handleEnableWidget.bind(this);
  }

  getItems() {
    const { widgets } = this.state;
    return widgets.map((item, index) => ({
      isEnabled: item.isEnabled,
      position: index,
      id: item.id,
    }));
  }

  handleClickAddWidget() {
    this.setState((prevState) => {
      let availables = prevState.widgets;
      availables = availables.filter(item => !item.isEnabled);
      return { availables };
    });
  }


  handleRemove(index) {
    const { widgets } = this.state;
    widgets[index].isEnabled = false;
    this.setState({ widgets });
  }

  moveWidget(dragIndex, hoverIndex) {
    // let { widgets } = this.props.widgets.slice();
    const { widgets } = this.state;
    // Swap position values
    [widgets[dragIndex].position, widgets[hoverIndex].position] = [widgets[hoverIndex]
      .position, widgets[dragIndex].position];
    // Swap position into the array
    [widgets[dragIndex], widgets[hoverIndex]] = [widgets[hoverIndex], widgets[dragIndex]];
    this.setState({ widgets });
  }

  handleClickHide() {
    this.setState({ availables: null });
  }

  handleEnableWidget(item) {
    const { widgets } = this.state;
    for (let i = 0; i < widgets.length; i += 1) {
      if (widgets[i].code === item.code) {
        widgets[i].isEnabled = true;
        break;
      }
    }
    this.setState({ widgets });
  }

  render() {
    // if (!this.props.widgets) return null;

    const Widget = WidgetDraggable.getWidget(this.props.zone);
    return (
      <div className={`ZoneDraggable ${this.props.horizontal ? 'horizontal' : ''}`}>
        {this.state.widgets.map((widget, index) => (!widget.isEnabled ? null : (
          <Widget
            id={widget.id}
            key={widget.code}
            index={index}
            comp={widget.component}
            code={widget.code}
            data={widget.data}
            editMode={this.props.editMode}
            onMoveWidget={this.moveWidget}
            onClickRemove={this.handleRemove}
          />)))}
        {this.props.editMode && (
          <Button
            className="ZoneDraggable-Add ui-button-success"
            onClick={this.handleClickAddWidget}
          />
        )}
        {this.state.availables && (
          <WidgetAddModal
            widgets={this.state.availables}
            onAddWidget={this.handleEnableWidget}
            onHide={this.handleClickHide}
          />
        )}
      </div>
    );
  }
}
