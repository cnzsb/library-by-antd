import React, { Component } from 'react';
import AntConfigProvider from 'antd/lib/config-provider';
import Empty from '../empty';

const THEME_PREFIX = 'lba';

class ConfigProvider extends Component {
  render() {
    return (
      <AntConfigProvider
        prefixCls={THEME_PREFIX}
        renderEmpty={() => <Empty />}
        {...this.props}
      />
    );
  }
}

export * from 'antd/lib/config-provider';
export default ConfigProvider;
