/* eslint-disable */
import React from 'react';
import reactDom from 'react-dom';
// import { Button, Alert } from '../dist/library-by-antd';
import { ConfigProvider, List, Anchor, Button, Alert, Popover, Modal } from 'library-by-antd';
// import '../components/style/themes.less';
// import '../dist/library-by-antd.css';
// import '../lib/popconfirm/style';
// import '../lib/message/style/index.less';
// import './style.less';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class App extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <ConfigProvider>
        <div style={{ height: 3000 }}>
          <h2>Test</h2>

          <List
            bordered
            dataSource={[] || data}
            renderItem={item => <List.Item>{item}</List.Item>}
          />


          <Popover content={<div>sdtwetsdfasdfsdfsdf</div>} title="Title">
            Hover me
          </Popover>

          <Anchor>
            <Button type="primary" onClick={this.showModal}>
              Open Modal
            </Button>
          </Anchor>

          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>

          {/* <Popconfirm
      title="Are you sure delete this task?"
      onConfirm={(e) => {
        console.log(e);
        message.success('Click on Yes');
      }}
      onCancel={(e) => {
        console.log(e);
        message.success('Click on No');
      }}
      okText="Yes"
      cancelText="No"
    >
      <a href="#">Delete</a>
    </Popconfirm> */}

          <Alert message="Success Text" type="success" />
          <Alert message="Info Text" type="info" />
          <Alert message="Warning Text" type="warning" />
          <Alert message="Error Text" type="error" />
          <Button type="primary">提交</Button>
          <Button>重置</Button>
        </div>
      </ConfigProvider>
    );
  }
}

reactDom.render(<App />, document.getElementById('root'));
