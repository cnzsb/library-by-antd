import message from '..';
import { THEME_PREFIX } from '../../config-provider';

const prefixCls = `${THEME_PREFIX}-message`;

describe('message', () => {
  it('should have prefix classname', () => {
    expect(document.querySelector('body').childNodes).toHaveLength(0);
    message.success('success');
    expect(document.querySelector(`.${prefixCls}`)).not.toBeNull();
  });
});
