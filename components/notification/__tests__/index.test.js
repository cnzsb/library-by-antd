import notification from '..';
import { THEME_PREFIX } from '../../config-provider';

const prefixCls = `${THEME_PREFIX}-notification`;

describe('notification', () => {
  it('should have prefix classname', () => {
    expect(document.querySelector('body').childNodes).toHaveLength(0);
    notification.success('success');
    expect(document.querySelector(`.${prefixCls}`)).not.toBeNull();
  });
});
