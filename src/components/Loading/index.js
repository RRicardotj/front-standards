import React from 'react';
// Components
import { Spin, Icon } from 'antd';
// Styles
import './Loading.scss';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const Loading = () => (
  <div className="Loading">
    <Spin indicator={antIcon} tip="Cargando..." size="large" />
  </div>
);
export default Loading;
