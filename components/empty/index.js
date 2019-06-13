import React from 'react';
import AntEmpty from 'antd/lib/empty';
import EMPTY from './empty.svg';

export default function Empty(props) {
  return <AntEmpty image={EMPTY} {...props} />;
}
