import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntButton from 'antd/lib/button';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';
import Icon from '../icon';

class Button extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.string,
    loading: PropTypes.bool,
    children: PropTypes.node,
  };

  renderButton = ({ getPrefixCls }) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      icon,
      loading,
      children,
    } = this.props;

    const prefixCls = getPrefixCls('btn', customizePrefixCls);
    const classes = classNames(className, {
      [`${prefixCls}-icon-only`]: !children && (children !== 0) && icon,
    });

    const iconNode = (icon && !loading) && <Icon type={icon} />;

    const restProps = omit(this.props, ['className', 'icon']);

    return (
      <AntButton
        className={classes}
        {...restProps}
      >
        {iconNode}
        {(typeof children === 'string') ? <span>{children}</span> : children}
      </AntButton>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderButton}</ConfigConsumer>;
  }
}

export default Button;
