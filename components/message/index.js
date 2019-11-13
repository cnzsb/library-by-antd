import message from 'antd/lib/message';
import { THEME_PREFIX } from '../config-provider';

message.config({ prefixCls: `${THEME_PREFIX}-message` });

export default message;
