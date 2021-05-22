import React from 'react';
import { render } from '@testing-library/react'
import {InfoViaHashes, InfoViaHashesProps} from './InfoViaHashes';

describe('<InfoViaHashes />', () => {
  it('renders empty InfoViaHashes', () => {
    const props: InfoViaHashesProps = {
        hash: "",
        previousBlock: "",
        merkleRoot: "",
        nextBlockHash: "",
        onClickHash: () => {},
    }
    const component = render(<InfoViaHashes {...props}></InfoViaHashes>)
    expect(component).toBeTruthy()
  })
})
