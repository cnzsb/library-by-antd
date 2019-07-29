import React from 'react';
import { render } from 'enzyme';
import Icon from '..';
import { customIcon, icon } from '../__mocks__';

describe('Icon', () => {
  it('should render original icon', () => {
    const wrapper = render(<Icon type={icon} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render custom icon', () => {
    const wrapper = render(<Icon type={customIcon} />);
    expect(wrapper).toMatchSnapshot();
  });
});
