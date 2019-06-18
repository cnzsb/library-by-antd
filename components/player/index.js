import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';
import Modal from '../modal';
import { ConfigConsumer } from '../config-provider';
import Video from './video';

class Player extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    videoClassName: PropTypes.string,
    closable: PropTypes.bool, // show close icon
    maskClosable: PropTypes.bool, // when clicking mask, if it's allowed to trigger onClose
    continuePlaying: PropTypes.bool, // when modal showing, if it should continue playing
    onShow: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    closable: true,
    maskClosable: true,
    continuePlaying: true,
  };

  state = {
    visible: false,
    autoPaused: false,
  };

  showModal = (visible = true, cb) => {
    this.setState({ visible }, cb);
  };

  onShow = () => {
    if (this.video) {
      const { state: { played } } = this.videoComponent;
      const { autoPaused } = this.state;
      // if been playing and been paused triggered by `onClose`, continue playing
      if (played && autoPaused) {
        this.video.play();
        this.setState({ autoPaused: false });
      }
    }
    const { onShow } = this.props;
    this.showModal(true, onShow);
  };

  onClose = () => {
    let autoPaused = false;
    const { state: { pausing } } = this.videoComponent;
    if (!pausing) autoPaused = true;
    // when closing Modal, pause the video
    this.video.pause();
    this.setState({ autoPaused });

    const { onClose } = this.props;
    this.showModal(false, onClose);
  };

  renderPlayer = ({ getPrefixCls }) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      videoClassName,
      closable,
      maskClosable,
      ...restProps
    } = this.props;
    const { visible } = this.state;
    const prefixCls = getPrefixCls('player', customizePrefixCls);
    const videoProps = omit(restProps, ['continuePlaying', 'onShow', 'onClose']);

    return (
      <Fragment>
        <Icon
          className={classNames(prefixCls, className)}
          type="sl-icon-filled-play"
          onClick={() => this.onShow()}
        />
        <Modal
          className={[`${prefixCls}-modal`]}
          centered
          visible={visible}
          onCancel={this.onClose}
          footer={false}
          bodyStyle={{ padding: 0, lineHeight: 0 }}
          closable={closable}
          maskClosable={maskClosable}
        >
          <Video
            ref={(videoComponent) => { this.videoComponent = videoComponent; }}
            withRef={(video) => { this.video = video; }}
            className={videoClassName}
            {...videoProps}
          />
        </Modal>
      </Fragment>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderPlayer}</ConfigConsumer>;
  }
}

export default Player;
Player.Video = Video;
