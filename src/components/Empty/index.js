import React from 'react';

import Icon from 'components/Icon';

import './Empty.scss';

const Empty = props => (
  <div className="Empty">
    <Icon className="Empty-icon" size={props.size || 80} icon={props.icon || 'ungroup'} />
    <div className="Empty-text">
      <div className="Empty-title">{props.title || 'No hay elementos'}</div>
    </div>
  </div>
);

export default Empty;
