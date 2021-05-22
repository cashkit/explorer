import React from 'react';
import renderer from 'react-test-renderer';

import { TxInfo, TxInfoProps } from './TxInfo';

const props: TxInfoProps = {
    version: 0,
    lockTime: 0,
    size: 0,
    timestamp: 0,
    confirmations: 0,
    blockHeight: 0,
}

it('<TxInfo/> renders correctly', () => {
  const tree = renderer
    .create(<TxInfo {...props}></TxInfo>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});