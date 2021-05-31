import React from 'react';
import renderer from 'react-test-renderer';

import { AddressTxInfo, AddressTxInfoProps } from './AddressTxInfo';

const props: AddressTxInfoProps = {
  conf: [],
  unconf: [],
  onClickMetaData: () => {}
}

it('<AddressTxInfo/> renders correctly', () => {
  const tree = renderer
    .create(<AddressTxInfo {...props}></AddressTxInfo>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});