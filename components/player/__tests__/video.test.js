import React from 'react';
import { mount } from 'enzyme';
import Video from '../video';

const src = 'http://url.video';

describe('Player.Video', () => {
  it('can not play and pause if video can not play', () => {
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const wrapper = mount(<Video onPlay={onPlay} onPause={onPause} />);
    wrapper.simulate('play');
    expect(onPlay).not.toBeCalled();
    wrapper.simulate('pause');
    expect(onPause).not.toBeCalled();
  });

  it('can play and pause if video can play', () => {
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const wrapper = mount(<Video src={src} onPlay={onPlay} onPause={onPause} />);
    wrapper.simulate('play');
    expect(onPlay).toBeCalledWith(expect.objectContaining({ played: true, playing: true }));
    wrapper.simulate('pause');
    expect(onPause).toBeCalledWith(expect.objectContaining({ played: true, pausing: true, playing: false }));

    jest.clearAllMocks();
    wrapper.setProps({ onPlay: undefined, onPause: undefined });
    wrapper.simulate('play');
    expect(onPlay).not.toBeCalled();
    wrapper.simulate('pause');
    expect(onPause).not.toBeCalled();
  });

  it('should pass ref by withRef', () => {
    let video = null;
    const withRef = jest.fn((v) => { video = v; });
    const onPlay = jest.fn();
    mount(<Video withRef={withRef} onPlay={onPlay} />);
    expect(withRef).toBeCalled();
    expect(video).not.toBeNull();
  });
});
