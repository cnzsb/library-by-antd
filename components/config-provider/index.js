import * as AntConfigProvider from 'antd/lib/config-provider';
import config from '../../build/config';

class ConfigProvider extends AntConfigProvider.default {
  getPrefixCls = (suffixCls, customizePrefixCls) => {
    const { prefixCls = config.themePrefixCls } = this.props;

    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  };

  render() {
    return super.render();
  }
}

export * from 'antd/lib/config-provider';
export default ConfigProvider;
