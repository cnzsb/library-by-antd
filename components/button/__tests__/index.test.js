import React from 'react';
import { mount } from 'enzyme';
import Button from '..';
import { customIcon } from '../../icon/__mocks__';

describe('Button', () => {
  it('should render custom icon in button', () => {
    const wrapper = mount(<Button icon={customIcon}>button</Button>);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setProps({ loading: true });
    wrapper.update();
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.exists({ type: 'loading' })).toBeTruthy();
    expect(wrapper.exists({ type: customIcon })).toBeFalsy();
  });

  it('should render button correctly within only icon', () => {
    const wrapper = mount(<Button icon={customIcon} />);
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.exists('[className*="icon-only"]')).toBeTruthy();
    wrapper.setProps({ loading: true });
    wrapper.update();
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.exists({ type: 'loading' })).toBeTruthy();
    expect(wrapper.exists({ type: customIcon })).toBeFalsy();
  });
});
