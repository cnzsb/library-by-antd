import React from 'react';
import AntConfigProvider, { ConfigConsumer } from 'antd/lib/config-provider';
import Empty from '../empty';

const THEME_PREFIX = 'lba';

function ConfigProvider(props) {
  return (
    <AntConfigProvider
      prefixCls={THEME_PREFIX}
      renderEmpty={() => <Empty />}
      {...props}
    />
  );
}

export default ConfigProvider;
export {
  ConfigConsumer,
};
