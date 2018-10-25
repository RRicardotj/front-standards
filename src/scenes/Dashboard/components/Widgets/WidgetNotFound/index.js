import React from 'react';

import './WidgetNotFound.scss';

const WidgetNotFound = props => (
  <div className="Widget WidgetNotFound">
    {'No encontrado'}
    <div className="WidgetNotFound-Code">
      {props.code}
    </div>
  </div>);

export default WidgetNotFound;
