import React from 'react';
import renderer from 'react-test-renderer';

import { TxInfoViaHashes, TxInfoViaHashesProps } from './TxInfoViaHashes';

const props: TxInfoViaHashesProps = {
    hash: "",
    blockHash: "",
    onClickMetaData: (txHash: Uint8Array | string) => {},
}

it('<TxInfoViaHashes/> renders correctly', () => {
  const tree = renderer
    .create(<TxInfoViaHashes {...props}></TxInfoViaHashes>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});