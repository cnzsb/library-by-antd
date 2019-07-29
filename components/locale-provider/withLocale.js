import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import LocaleReceiver from './LocaleReceiver';

export default function withLocale(WrappedComponent) {
  const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  const Component = props => (
    <LocaleReceiver componentName={name}>
      {(uiLocale, locale) => (
        <WrappedComponent locale={locale} uiLocale={uiLocale} {...props} />
      )}
    </LocaleReceiver>
  );
  Component.displayName = `withLocale(${name})`;

  return hoistStatics(Component, WrappedComponent);
}
