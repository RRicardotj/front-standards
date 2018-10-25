import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'antd';

import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow'; // eslint-disable-line

const itemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); // eslint-disable-line

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.onMoveWidget(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex; // eslint-disable-line no-param-reassign
  },
};

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class WidgetDraggable extends Component {
  render() {
    const {
      isDragging,
      connectDragSource,
      connectDropTarget,
      editMode,
      comp: WidgetComponent,
      code,// eslint-disable-line
      data,
    } = this.props;

    const Widget = <WidgetComponent code={code} data={data} />;

    return (!editMode ? Widget : connectDragSource(connectDropTarget(<div style={{ position: 'relative', opacity: isDragging ? 0.3 : 1, cursor: 'pointer' }}>
      <Button
        className="ui-button-danger"
        style={{ position: 'absolute', transform: 'scale(.8)' }}
        onClick={() => this.props.onClickRemove(this.props.index)}
      />
      {Widget}
    </div>))); // eslint-disable-line
  }
}

export default {
  getWidget(code) {
    return flow(
      DragSource(code, itemSource, collect),
      DropTarget(code, itemTarget, collectTarget),
    )(WidgetDraggable);
  },
};
