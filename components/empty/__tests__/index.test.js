import React from 'react';
import { mount } from 'enzyme';
import Empty from '..';

describe('Empty', () => {
  const wrapper = mount(<Empty />);

  it('should render', () => {
    // inner render img
    const img = wrapper.find('img').prop('src');
    // passing image
    const image = wrapper.find('[image]').prop('image');
    expect(img).toBe(image);
  });
});
