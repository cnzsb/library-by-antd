import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';

export default class Video extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    withRef: PropTypes.func,
    className: PropTypes.string,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,

    src: PropTypes.string,
    autoplay: PropTypes.bool,
    controls: PropTypes.bool,
    preload: PropTypes.oneOf(['auto', 'meta', 'none']),
  };

  static defaultProps = {
    autoplay: false,
    controls: true,
    preload: 'meta',
  };

  state = {
    played: false,
    playing: false,
    pausing: false,
  };

  getVideoRef = (video) => {
    this.video = video;

    const { withRef } = this.props;
    if (withRef) withRef(video);
  };

  canPlay = () => {
    const { src } = this.props;
    return !!src;
  };

  onPlay = () => {
    if (!this.canPlay()) return;

    this.setState({
      played: true,
      playing: true,
      pausing: false,
    }, () => {
      const { onPlay } = this.props;
      if (onPlay) onPlay(this.state);
    });
  };

  onPause = () => {
    if (!this.canPlay()) return;

    this.setState({
      playing: false,
      pausing: true,
    }, () => {
      const { onPause } = this.props;
      if (onPause) onPause(this.state);
    });
  };

  renderVideo = ({ getPrefixCls }) => {
    const {
      withRef,
      prefixCls: customizePrefixCls,
      className,
      src,
      autoplay,
      controls,
      preload,
      ...restProps
    } = this.props;
    const prefixCls = getPrefixCls('video', customizePrefixCls);

    return (
      <video
        ref={this.getVideoRef}
        className={classNames(prefixCls, className)}
        src={src}
        autoPlay={autoplay}
        controls={controls}
        preload={preload}
        {...restProps}
        onPlay={this.onPlay}
        onPause={this.onPause}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderVideo}</ConfigConsumer>;
  }
}
