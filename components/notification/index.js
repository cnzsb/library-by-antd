import notification from 'antd/lib/notification';
import { THEME_PREFIX } from '../config-provider';

const originalNotification = { ...notification };

['success', 'error', 'info', 'warn', 'warning', 'open'].forEach((type) => {
  notification[type] = ({ prefixCls = `${THEME_PREFIX}-notification`, ...opts }) => {
    originalNotification[type]({ prefixCls, ...opts });
  };
});

export default notification;
