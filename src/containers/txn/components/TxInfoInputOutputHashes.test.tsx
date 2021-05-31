import React from 'react';
import renderer from 'react-test-renderer';
import { TxInfoInputOutputHashes, TxInfoInputOutputHashesProps } from './TxInfoInputOutputHashes';

const props: TxInfoInputOutputHashesProps = {
    inputsList: [],
    outputsList: [],
    onClickMetaData: (txHash: Uint8Array | string) => {},
}

it('<TxInfoInputOutputHashes/> renders correctly', () => {
  const tree = renderer
    .create(<TxInfoInputOutputHashes {...props}></TxInfoInputOutputHashes>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});