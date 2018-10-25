import React, { Component } from 'react';

// Components
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import {
  Spin,
  Button,
  Icon as AntIcon,
  Layout,
} from 'antd';

// Services
import WidgetService from 'services/WidgetService';

// Custom Components
import Header from 'components/Header';
import ZoneDraggable from './components/ZoneDraggable';
import WidgetNotFound from './components/Widgets/WidgetNotFound';
import Widgets from './components/Widgets';

// Styles
import './Dashboard.scss';

const { Content } = Layout;
const antIcon = <AntIcon type="loading" style={{ fontSize: 24 }} spin />;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { editMode: false, widgets: [] };

    this.handleChangeWidgetOrder = this.handleChangeWidgetOrder.bind(this);
    this.showWidgetsConfig = this.showWidgetsConfig.bind(this);
  }

  componentDidMount() {
    WidgetService.index()
      .then((res) => {
        const widgets = res.data.reduce((stackVal, itemVal) => {
          const item = itemVal;
          const stack = stackVal;
          const zone = `zone${item.zone}`;

          if (!stack[zone]) stack[zone] = [];

          item.component = Widgets[item.code] ? Widgets[item.code] : WidgetNotFound;
          stack[zone].push(item);

          return stack;
        }, {});

        this.setState({ widgets });
      })
      .catch(() => { });
  }

  showWidgetsConfig() {
    const { editMode } = !this.state;
    this.setState({ editMode });

    if (!editMode) {
      const newOrder = this.zoneA.getItems().concat(this.zoneB.getItems(), this.zoneC.getItems());
      WidgetService.order(newOrder);
    }
  }

  handleChangeWidgetOrder(widgets) {
    this.setState({ widgets });
  }

  render() {
    if (!this.state.widgets) {
      return (
        <div className="Dashboard">
          <Spin indicator={antIcon} />
        </div>
      );
    }

    return [
      <Header
        title="Dashboard"
        key="Header"
        onSiderButtonClick={this.props.onSiderButtonClick}
      />,
      <Content style={{ margin: '24px 16px 0' }} key="Content">
        <div className="Dashboard">
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div className={`Dashboard-Content ${this.state.editMode ? 'edit' : ''}`}>
              <div className="Dashboard-Content-Top">
                <ZoneDraggable
                  widgets={this.state.widgets.zoneA}
                  editMode={this.state.editMode}
                  horizontal
                  zone="A"
                  ref={(_c) => {
                    this.zoneA = _c;
                  }}
                />
              </div>
              <div className="Dashboard-Content-Bottom-Left">
                <ZoneDraggable
                  widgets={this.state.widgets.zoneB}
                  editMode={this.state.editMode}
                  zone="B"
                  ref={(_c) => {
                    this.zoneB = _c;
                  }}
                />
              </div>
              <div className="Dashboard-Content-Bottom-Right">
                <ZoneDraggable
                  widgets={this.state.widgets.zoneC}
                  editMode={this.state.editMode}
                  zone="C"
                  ref={(_c) => {
                    this.zoneC = _c;
                  }}
                />
              </div>
              <div className={`Dashboard-Content-Config-Button ${this.state.editMode ? 'EditMode' : ''}`}>
                <Button onClick={this.showWidgetsConfig}>Config.</Button>
              </div>
            </div>
          </div>
        </div>
      </Content>,
    ];
  }
}

export default DragDropContext(HTML5Backend)(Dashboard);
