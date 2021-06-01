import React from 'react';
import renderer from 'react-test-renderer';
import { TxnDisplay, TxnDisplayInterface } from './TxnDisplay';

const props: TxnDisplayInterface = {
    transaction: "",
    onClickTx: () => {}
}

it('<TxnDisplay/> renders correctly', () => {
    const tree = renderer
        .create(<TxnDisplay {...props}></TxnDisplay>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});