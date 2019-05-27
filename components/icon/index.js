import React from 'react';
import AntIcon from 'antd/lib/icon';
import PropTypes from 'prop-types';

const customCache = new Set();
const iconfontPrefix = 'sl-';

function customizeIconFont () {
  if (!customCache.has(iconfontPrefix)) {
    customCache.add(iconfontPrefix);
    import('./iconfont.js');
  }
}

function Icon (props) {
  customizeIconFont();
  const { type, ...restProps } = props;
  return type.startsWith(iconfontPrefix) ? (
    <AntIcon {...restProps}>
      <use xlinkHref={`#${type}`} />
    </AntIcon>
  ) : (
    <AntIcon {...props} />
  );
}

Icon.propTypes = {
  type: PropTypes.string,
};

export default Icon;
