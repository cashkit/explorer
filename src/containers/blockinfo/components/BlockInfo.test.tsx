import React from 'react';
import renderer from 'react-test-renderer';

import { BlockInfo, BlockInfoProps } from './BlockInfo';

const props: BlockInfoProps = {
  height: 0,
  version: 0,
  timestamp: 0,
  bits: 0,
  nonce: 0,
  confirmations: 0,
  difficulty: 0,
  size: 0,
  medianTime: 0,
  transactions: 0,
}

it('<BlockInfo/> renders correctly', () => {
  const tree = renderer
    .create(<BlockInfo {...props}></BlockInfo>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});