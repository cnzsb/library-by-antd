import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntLocaleProvider from 'antd/lib/locale-provider';
import moment from 'moment';
import LOCALE from './locale';
import LocaleReceiver from './LocaleReceiver';
import withLocale from './withLocale';

const defaultLocale = 'en';

class LocaleProvider extends Component {
  static propTypes = {
    locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  static defaultProps = {
    locale: defaultLocale, // default locale
  };

  state = {
    localeConfig: null,
  };

  componentDidMount() {
    const { locale } = this.props;
    this.importLocale(locale);
  }

  componentDidUpdate({ locale: prevLocale }) {
    const { locale } = this.props;
    if (locale !== prevLocale) this.importLocale(locale);
  }

  importLocale = async (locale) => {
    let localeConfig = null;

    if (typeof locale === 'object') {
      // original antd config
      localeConfig = locale;
    } else if (locale) {
      // customized config
      const localeFile = LOCALE[locale]?.[0];
      try {
        const { default: data } = await import(
          /* webpackMode: "eager" */
          /* webpackInclude: /\.js$/ */
          /* webpackExclude: /(index|LocaleReceiver)\.js$|style/ */
          `antd/lib/locale-provider/${localeFile}.js` // eslint-disable-line comma-dangle
        );
        localeConfig = data;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Locale for "${locale}" has not been supported yet, please confirm all supported locales`);
        return;
      }
    } else {
      // if locale is an empty string, should do nothing
      return;
    }

    if (localeConfig) {
      const momentLocale = LOCALE[locale]?.[1] || 'en';
      if (momentLocale !== 'en') {
        try {
          await import(/* webpackMode: "eager" */ `moment/locale/${momentLocale}.js`);
        } catch (e) {
          // should confirm LOCALE file to match moment's locales at all time
          // if catching errors, moment.locale will be called with 'en'
        }
      }
      moment.locale(momentLocale);

      this.setState({ localeConfig });
    }
  };

  render() {
    const { localeConfig } = this.state;
    const { locale, ...restProps } = this.props;
    return <AntLocaleProvider {...restProps} locale={localeConfig} />;
  }
}

export default LocaleProvider;
LocaleProvider.LocaleReceiver = LocaleReceiver;
LocaleProvider.withLocale = withLocale;
