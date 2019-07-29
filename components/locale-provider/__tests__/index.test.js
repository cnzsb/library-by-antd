import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import tick from 'test/util/tick';
import LOCALE from '../locale';
import LocaleProvider from '..';
import Modal from '../../modal';

describe('LocaleProvider', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn')
      .mockImplementation();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const wrapper = mount(
    <LocaleProvider>
      <Modal title="locale modal" visible />
    </LocaleProvider>,
  );
  let localeConfig = wrapper.state('localeConfig');

  it('should render default locale', () => {
    expect(wrapper.state('localeConfig')).not.toBeNull();
  });

  it('should change i18n translations and moment locale when changing locale', async () => {
    localeConfig = wrapper.state('localeConfig');

    const locale = 'zh';
    wrapper.setProps({ locale });
    await tick();
    wrapper.update();
    expect(wrapper.state('localeConfig')).not.toMatchObject(localeConfig);
    expect(moment.locale()).toBe(LOCALE[locale]?.[1]);
  });

  it('should keep previous locale, throw warnings and not change moment locale if locale is not supported yet', async () => {
    jest.clearAllMocks();
    localeConfig = wrapper.state('localeConfig');

    const locale = 'test-locale-which-will-never-exist-because-the-string-is-soooooooo-looooooong';
    wrapper.setProps({ locale });
    await tick();
    wrapper.update();
    expect(wrapper.state('localeConfig')).toMatchObject(localeConfig);
    // eslint-disable-next-line no-console
    expect(console.warn).toBeCalled();
  });

  it('could pass an object locale for original LocaleProvider', async () => {
    const locale = { locale: 'test' };
    wrapper.setProps({ locale });
    await tick();
    wrapper.update();
    expect(wrapper.state('localeConfig')).toMatchObject(locale);
  });

  it('should keep previous locale if not finding a useful locale config or passing an empty locale string', async () => {
    localeConfig = wrapper.state('localeConfig');

    const locale = null;
    wrapper.setProps({ locale });
    await tick();
    wrapper.update();
    expect(wrapper.state('localeConfig')).toMatchObject(localeConfig);

    wrapper.setProps({ locale: '' });
    await tick();
    wrapper.update();
    expect(wrapper.state('localeConfig')).toMatchObject(localeConfig);
  });
});
