import React from 'react';

// Components
import { List } from 'antd';

// Styles
import './SimpleList.scss';

const SimpleList = (props) => {
  const classes = ['SimpleList'];
  if (props.className) {
    classes.push(props.className);
  }
  classes.join(' ');
  return (
    <List
      bordered={props.bordered}
      className={classes}
      dataSource={props.items}
      renderItem={
        item => (
          <div
            role="presentation"
            onClick={() => props.onClick(item)}
            className={(props.itemActive && props.itemActive.id === item.id) ? 'SimpleList-item active' : 'SimpleList-item'}
            key={item.id}
          >
            {item[props.propPromt || 'name']}
          </div>
        )
      }
    />
  );
};

export default SimpleList;
