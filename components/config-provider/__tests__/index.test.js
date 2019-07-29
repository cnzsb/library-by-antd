import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import List from '../../list';
import Empty from '../../empty';
import { themePrefixCls } from '../../../build/config';

describe('ConfigProvider', () => {
  const wrapper = mount(
    <ConfigProvider>
      <List />
    </ConfigProvider>,
  );

  it('should have a custom prefix class name', () => {
    expect(wrapper.exists(`[className*='${themePrefixCls}-']`)).toBeTruthy();
  });

  it('should render custom empty by default', () => {
    expect(wrapper.exists(Empty)).toBeTruthy();
  });
});
