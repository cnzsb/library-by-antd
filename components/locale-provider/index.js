import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntLocaleProvider from 'antd/lib/locale-provider';
import moment from 'moment';
import LOCALE from './locale';
import LocaleReceiver from './LocaleReceiver';
import { withLocale } from './withLocale';

const defaultLocale = 'en';

class LocaleProvider extends Component {
  static propTypes = {
    locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  static defaultProps = {
    locale: LOCALE[defaultLocale][0], // default locale
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

  importLocale = async (locale = defaultLocale) => {
    let localeConfig = null;

    if (typeof locale === 'object') {
      // original antd config
      localeConfig = locale;
    } else {
      // customized config
      try {
        const { default: data } = await import(
          /* webpackInclude: /\.js$/ */
          /* webpackExclude: /(index|LocaleReceiver)\.js$|style/ */
          /* webpackChunkName: "locales/ui/[request]" */
          `antd/lib/locale-provider/${LOCALE[locale]?.[0] || 'en_US'}.js` // eslint-disable-line comma-dangle
        );
        localeConfig = data;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Locale for "${locale}" has not been supported yet, please check all supported locales`);
        return;
      }
    }

    if (localeConfig) {
      const momentLocale = LOCALE[locale]?.[1] || 'en';
      if (momentLocale !== 'en') {
        try {
          await import(
            /* webpackChunkName: "locales/moment/[request]" */
            `moment/locale/${momentLocale}.js` // eslint-disable-line comma-dangle
          );
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(`Locale "${locale}" for moment.js has not been supported yet, please check all supported locales`);
        }
      }
      moment.locale(locale);

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
