import React from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import { updateErrorState, updateBlockHash } from '../../redux';
import { GetBlockchainInfoResponse } from '../../protos/bchrpc_pb';
import { base64toU8, u8toHex } from '../../utils';
import { BlockchainInfo } from './components';

/**
 * From React Docs:
 * If your component renders the same result given the same props,
 * you can wrap it in a call to React.memo for a performance boost
 * in some cases by memoizing the result. This means that React will
 * skip rendering the component, and reuse the last rendered result.
 */
const MemoizedInfoComponent = React.memo(BlockchainInfo);


interface BlockchainInfoProps {
   client: GrpcManager,
   updateErrorState: ({}) => void,
   updateBlockHash: ({}) => void,
   clientError: string | null
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
  // Requires a Separate call.
  mempoolSize: number,
}


class NodeInfo extends React.PureComponent<BlockchainInfoProps, BlockchainInfoState>{

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
      slpIndex: false,
      // Requires a Separate call
      mempoolSize: 0,
    }
  }

  componentDidMount(){
    const { client, updateErrorState } = this.props;
    client && client.getBlockchainInfo().then((res) => {
        // Convert the blockhash from base64 to hex.
        const base_tx = res.getBestBlockHash_asB64()
        const b2u = base64toU8(base_tx).reverse()
        const block_hash = u8toHex(b2u)

        // Set block hash on redux store as well.
        this.props.updateBlockHash({ block_hash })
        // Use spread operator on the entire response and later override specific values.
        this.setState({ ...res.toObject(), bestBlockHash: block_hash})
      }).catch((err) => {
        console.log("[ERR] getBlockchainInfo: ", err)
        updateErrorState({clientError: JSON.stringify(err)})
      })

    client && client.getMempoolInfo().then((res) => {
        this.setState({
          mempoolSize: res.getSize()
        })
    }).catch((err) => {
        console.log("[ERR] getMempoolInfo: ", err)
        updateErrorState({clientError: JSON.stringify(err)})
    })
  }

  // Need to perform the check for `clientError` because once the component is rendered,
  // react tries to rerender/perform life cycles when any(the one component listens to) prop updates
  // and in the parent component we have added a statement to render undefined/some other 
  // component when the value of `clientError` changes. If you remove the check you might see
  // a warning like this:
  // Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  render(){
    return (
      <>
        <h1 className="title">Node Information</h1>
        <MemoizedInfoComponent {...this.state} />
      </>
    );
    
  }
}

const mapDispatchToProps = dispatch => {
	return {
    updateErrorState: (args) => {
      dispatch(updateErrorState(args));
    },
    updateBlockHash: (args) => {
      dispatch(updateBlockHash(args));
    }
  };
};

const mapStateToProps = state => {
	return {
    client: state.AppReducer.client,
		clientError: state.AppReducer.clientError,
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NodeInfo);
