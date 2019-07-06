import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AntLocaleProvider from 'antd/lib/locale-provider';
import LOCALE from './locale';

const { en: defaultLocale } = LOCALE;

class LocaleProvider extends PureComponent {
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
          /* webpackChunkName: "locales/[request]" */
          `antd/lib/locale-provider/${LOCALE[locale] || defaultLocale}.js` // eslint-disable-line comma-dangle
        );
        localeConfig = data;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Locale for "${locale}" has not been supported yet, please check all supported locales`);
        return;
      }
    }
    if (localeConfig) this.setState({ localeConfig });
  };

  render() {
    const { localeConfig } = this.state;
    const { locale, ...restProps } = this.props;
    return <AntLocaleProvider {...restProps} locale={localeConfig} />;
  }
}

export default LocaleProvider;
