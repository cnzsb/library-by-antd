/* eslint-disable */
import React from 'react';
import reactDom from 'react-dom';
// import { Button, Alert } from '../dist/lba';
import {
  ConfigProvider,
  LocaleProvider,
  DatePicker,
  Icon,
  List,
  Anchor,
  Button,
  Alert,
  Popover,
  Modal,
  Select,
  Tabs,
} from 'lba';
// import '../components/style/themes.less';
// import '../dist/lba.css';
// import '../lib/popconfirm/style';
// import '../lib/message/style/index.less';
// import './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class App extends React.Component {
  state = {
    locale: '',
    visible: false,
  };

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
    const { locale } = this.state;

    return (
      <LocaleProvider locale={locale}>
        <ConfigProvider>
          <div style={{ height: 3000 }}>
            <h2>Test</h2>

            <Tabs size="small" defaultActiveKey="1">
              <TabPane tab="Tab 1" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>

            <Select style={{ width: 200 }} onChange={l => this.setState({ locale: l })}>
              {['en', 'es', 'fr', 'nl', 'zh', 'zh-hans', 'zh-hant', 'pt', 'de', 'it'].map(l =>
                <Option key={l}>{l}</Option>,
              )}
            </Select>
            <br />
            <RangePicker onChange={(m, s) => console.log(s)} />
            <br />

            <Icon type="sl-icon-view-report-outlined-sl" />
            <Icon type="sliders" />

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
      </LocaleProvider>
    );
  }
}

reactDom.render(<App />, document.getElementById('root'));
