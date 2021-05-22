import React from 'react';
import renderer from 'react-test-renderer';
import {BlockInfoViaHashes, BlockInfoViaHashesProps} from './BlockInfoViaHashes';


const props: BlockInfoViaHashesProps = {
  hash: "",
  previousBlock: "",
  merkleRoot: "",
  nextBlockHash: "",
  onClickHash: () => {},
}

it('<BlockInfoViaHashes/> renders correctly', () => {
  const tree = renderer
    .create(<BlockInfoViaHashes {...props}></BlockInfoViaHashes>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});