import * as AntConfigProvider from 'antd/lib/config-provider';

const THEME_PREFIX = 'lba';

class ConfigProvider extends AntConfigProvider.default {
  getPrefixCls = (suffixCls, customizePrefixCls) => {
    const { prefixCls = THEME_PREFIX } = this.props;

    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  };

  render() {
    return super.render();
  }
}

export * from 'antd/lib/config-provider';
export default ConfigProvider;
