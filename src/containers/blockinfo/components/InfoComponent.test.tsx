import React from 'react';
import { render } from '@testing-library/react'
import {InfoComponent, InfoComponentProps} from './InfoComponent';

describe('<InfoComponent />', () => {
  it('renders empty InfoComponent', () => {
    const props: InfoComponentProps = {
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
    const component = render(<InfoComponent {...props}></InfoComponent>)
    expect(component).toBeTruthy()
  })
})
