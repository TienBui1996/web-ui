import { Card, Col, Row } from 'antd';
import React from 'react';
var currentLanguage = 0;
export default class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      collapsed: false,
    };
  }

  componentWillMount() {
    if (this.props.multiLanguage.currentLanguage != null) {
      currentLanguage = this.props.multiLanguage.currentLanguage;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.multiLanguage.currentLanguage != null) {
      currentLanguage = nextProps.multiLanguage.currentLanguage;
    }
  }
  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  </div>
    );
  }
}
