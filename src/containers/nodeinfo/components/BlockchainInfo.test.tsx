import React from 'react';
import renderer from 'react-test-renderer';
import { BlockchainInfo, BlockchainInfoInterface } from './BlockchainInfo';


const props: BlockchainInfoInterface = {
    bitcoinNet: 0,
    bestHeight: 0,
    bestBlockHash: "",
    difficulty: 0,
    medianTime: 0,
    txIndex: false,
    addrIndex: false,
    slpIndex: false,
    mempoolSize: 0,
    onClickBlockHash: () => {}
}

it('<BlockchainInfo/> renders correctly', () => {
    const tree = renderer
        .create(<BlockchainInfo {...props}></BlockchainInfo>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});