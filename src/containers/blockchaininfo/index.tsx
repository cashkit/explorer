import React from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import {updateErrorState} from '../../redux';
import {GetBlockchainInfoResponse} from '../../protos/bchrpc_pb';
import { base64toU8, u8toHex } from '../../utils';

import styled from 'styled-components'

const Division = styled.div`
  background: transparent;
  border-radius: 2px;
  border: 1px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  text-align: left;
`

function InfoComponent(props) {
  return (<div>
    <Division>
      bitcoinNet: <code>{props.bitcoinNet}</code>
    </Division>
    <Division>
      bestHeight: <code>{props.bestHeight}</code>
    </Division>
    <Division>
      bestBlockHash: <code>{props.bestBlockHash}</code>
    </Division>
    <Division>
      difficulty: <code>{props.difficulty}</code>
    </Division>
    <Division>
      medianTime: <code>{props.medianTime}</code>
    </Division>
    <Division>
      txIndex: <code>{props.txIndex ? 'True' : 'False'}</code>
    </Division>
    <Division>
      addrIndex: <code>{props.addrIndex ? 'True' : 'False'}</code>
    </Division>
    <Division>
      slpIndex: <code>{props.slpIndex ? 'True' : 'False'}</code>
    </Division>
  </div>)
}

/**
 * From React Docs:
 * If your component renders the same result given the same props,
 * you can wrap it in a call to React.memo for a performance boost
 * in some cases by memoizing the result. This means that React will
 * skip rendering the component, and reuse the last rendered result.
 */
const MemoizedInfoComponent = React.memo(InfoComponent);


interface BlockchainInfoProps {
   client: GrpcManager
   updateErrorState: Function,
   client_error: string | null
}

interface BlockchainInfoState {
  bitcoinNet: GetBlockchainInfoResponse.BitcoinNet,
  bestHeight: number,
  bestBlockHash: Uint8Array | string,
  difficulty: number,
  medianTime: number,
  txIndex: boolean,
  addrIndex: boolean,
  slpIndex: boolean,

}


class BlockchainInfo extends React.PureComponent<BlockchainInfoProps, BlockchainInfoState>{

  constructor(props: BlockchainInfoProps){
    super(props)
    // Setting default values
    this.state ={
      bitcoinNet: GetBlockchainInfoResponse.BitcoinNet.MAINNET,
      bestHeight: 0,
      bestBlockHash: '',
      difficulty: 0,
      medianTime: 0,
      txIndex: false,
      addrIndex: false,
      slpIndex: false
    }
  }

  componentDidMount(){
    this.props.client.getBlockchainInfo().then((res) => {
        // Convert the blockhash from base64 to hex.
        let base_tx = res.getBestBlockHash_asB64()
        let b2u = base64toU8(base_tx).reverse()
        let tx_hash = u8toHex(b2u)

        // use spread operator on the entire response and later override specific values.
        this.setState({ ...res.toObject(), bestBlockHash: tx_hash})
      }).catch((err) => {
        console.log(err)
        this.props.updateErrorState({client_error: JSON.stringify(err)})
      })
  }

  // Need to perform the check for `client_error` because once the component is rendered,
  // react tries to rerender/perform life cycles when any(the one component listens to) prop updates
  // and in the parent component we have added a statement to render undefined/some other 
  // component when the value of `client_error` changes. If you remove the check you might see
  // a warning like this:
  // Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  render(){
    const { client_error } = this.props;
    if (client_error !== null){
      return <div></div>
    }
    return (
      <MemoizedInfoComponent {...this.state} />
    );
    
  }
}

const mapDispatchToProps = dispatch => {
	return {
    updateErrorState: (args) => {
      dispatch(updateErrorState(args));
    },
  };
};

const mapStateToProps = state => {
	return {
    client: state.AppReducer.client,
		client_error: state.AppReducer.client_error,
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BlockchainInfo);
