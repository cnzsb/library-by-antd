import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import LocaleProvider from '..';
import withLocale from '../withLocale';

describe('LocaleProvider.withLocale', () => {
  const Comp = () => (
    <div>Test Component</div>
  );
  const WithLocaleComp = withLocale(Comp);
  const App = ({ children }) => (
    <LocaleProvider>
      <div>
        <h3>App</h3>
        <WithLocaleComp />
        {children}
      </div>
    </LocaleProvider>
  );
  App.propTypes = {
    children: PropTypes.node,
  };

  it('should show display name as withLocale(WrappedComponentName) or withLocale(Component)', () => {
    const wrapper = mount(<App />);
    const withLocaleCompWrapper = wrapper.find(WithLocaleComp);
    expect(withLocaleCompWrapper.name()).toBe('withLocale(Comp)');

    const WithLocaleAnonymousComp = withLocale(() => (
      <div>Anonymous Component</div>
    ));
    wrapper.setProps({
      children: <WithLocaleAnonymousComp />,
    });
    wrapper.update();
    const withLocaleAnonymousCompWrapper = wrapper.find(WithLocaleAnonymousComp);
    expect(withLocaleAnonymousCompWrapper.name()).toBe('withLocale(Component)');
  });

  it('should pass locale and uiLocale to the wrapped component', () => {
    const wrapper = mount(<App />);
    const compWrapper = wrapper.find(Comp);
    expect(compWrapper.prop('locale')).toBeDefined();
    expect(typeof compWrapper.prop('uiLocale') === 'object').toBeTruthy();
  });
});
