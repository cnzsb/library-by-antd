import React from 'react';
import { mount } from 'enzyme';
import Player from '..';

describe('Player', () => {
  describe('function test', () => {
    beforeAll(() => {
      jest.spyOn(window.HTMLMediaElement.prototype, 'play')
        .mockImplementation();

      jest.spyOn(window.HTMLMediaElement.prototype, 'pause')
        .mockImplementation();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    afterEach(async () => {
      jest.clearAllMocks();
    });

    const wrapper = mount(<Player src="http://url.video" />);
    const btn = wrapper.children().first(); // Icon
    const modal = wrapper.find('Modal');

    // 1st time open modal and not play the video
    it('should show the video modal when clicking the icon button', async () => {
      btn.simulate('click');
      wrapper.update();
      expect(wrapper.state('visible')).toBe(true);
      expect(wrapper.state('autoPaused')).toBe(false);
    });

    // 1st time close modal
    it('should automatically pause video when closing modal and open autoPaused switch if the video is not paused manually', async () => {
      modal.invoke('onCancel')();
      wrapper.update();
      expect(wrapper.state('visible')).toBe(false);
      expect(wrapper.state('autoPaused')).toBe(true);
      expect(window.HTMLMediaElement.prototype.pause).toBeCalled();
    });

    // 2nd time open modal
    it('should not continue playing when opening modal when not playing the video previously', async () => {
      btn.simulate('click');
      wrapper.update();
      expect(wrapper.state('visible')).toBe(true);
      // should not changing autoPaused because the video didn't played
      expect(wrapper.state('autoPaused')).toBe(true);
      expect(window.HTMLMediaElement.prototype.play).not.toBeCalled();
    });

    // 2nd time open modal, play the video, then close modal
    it('should automatically pause video when closing modal which video has been played', async () => {
      wrapper.find('video').simulate('play');
      wrapper.update();
      modal.invoke('onCancel')();
      wrapper.update();
      expect(wrapper.state('visible')).toBe(false);
      expect(wrapper.state('autoPaused')).toBe(true);
    });

    // 3rd time open modal
    it('should continue playing the video when opening modal', () => {
      btn.simulate('click');
      wrapper.update();
      expect(wrapper.state('visible')).toBe(true);
      expect(wrapper.state('autoPaused')).toBe(false);
      expect(window.HTMLMediaElement.prototype.play).toBeCalled();
    });

    // 3rd time open modal, pause the video, then 3rd time close modal
    it('should not automatically pause the video if user paused the video manually', () => {
      wrapper.find('video').simulate('pause');
      wrapper.update();
      modal.invoke('onCancel')();
      wrapper.update();
      expect(wrapper.state('visible')).toBe(false);
      expect(wrapper.state('autoPaused')).toBe(false);
    });

    // 4th time open modal
    it('should not automatically play the video if user paused the video manually when opening modal last time', () => {
      btn.simulate('click');
      wrapper.update();
      expect(wrapper.state('visible')).toBe(true);
      expect(wrapper.state('autoPaused')).toBe(false);
      expect(window.HTMLMediaElement.prototype.play).not.toBeCalled();
    });
  });

  describe('[Function] test', () => {
    it('should show modal when call showModal without parameters', () => {
      const wrapper = mount(<Player />);
      wrapper.instance().showModal();
      wrapper.update();
      expect(wrapper.state('visible')).toBe(true);
    });
  });
});
