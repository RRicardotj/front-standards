import React from 'react';

import Icon from 'components/Icon';

const IsEnabledIcon = props => (
  <Icon
    className={props.className}
    icon="circle"
    color={props.enabled ? '#52c41a' : 'red'}
    size={props.size || 10}
  />
);

export default IsEnabledIcon;
