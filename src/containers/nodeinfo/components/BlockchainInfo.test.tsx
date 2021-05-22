import React from 'react';
import renderer from 'react-test-renderer';
import { BlockchainInfo, BlockchainInfoProps } from './BlockchainInfo';

const props: BlockchainInfoProps = {
    bitcoinNet: 0,
    bestHeight: 0,
    bestBlockHash: "",
    difficulty: 0,
    medianTime: 0,
    txIndex: false,
    addrIndex: false,
    slpIndex: false,
    mempoolSize: 0
}

it('<BlockchainInfo/> renders correctly', () => {
    const tree = renderer
        .create(<BlockchainInfo {...props}></BlockchainInfo>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});