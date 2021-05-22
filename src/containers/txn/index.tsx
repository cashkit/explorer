import React from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import { Transaction } from '../../protos/bchrpc_pb';
import { updateErrorState, updateTxHash } from '../../redux';
import { base64toU8, u8toHex } from '../../utils';
import { TxInfo, TxInfoViaHashes, TxInfoInputOutputHashes } from './components';


/**
 * From React Docs:
 * If your component renders the same result given the same props,
 * you can wrap it in a call to React.memo for a performance boost
 * in some cases by memoizing the result. This means that React will
 * skip rendering the component, and reuse the last rendered result.
 */
const MemoizedInfoComponent = React.memo(TxInfo);
const MemoizedInfoViaHashesComponent = React.memo(TxInfoViaHashes);
const MemoizedInfoInputOutputHashes = React.memo(TxInfoInputOutputHashes);

interface TransactionInfoProps {
   client: GrpcManager,
   updateErrorState: ({}) => void,
   updateTxHash: ({}) => void,
   txHash: string | undefined,
   clientError: string | undefined
}

interface TransactionInfoState {
  hash: Uint8Array | string,
  version: number,
  inputsList: Array<Transaction.Input.AsObject>,
  outputsList: Array<Transaction.Output.AsObject>,
  lockTime: number,
  size: number,
  timestamp: number,
  confirmations: number,
  blockHeight: number,
  blockHash: Uint8Array | string,
  txHash: string,
  // To be added soon
  // slpTransactionInfo?: SlpTransactionInfo.AsObject,
}


class TransactionInfo extends React.PureComponent<TransactionInfoProps, TransactionInfoState>{

  searchTxInputRef: React.RefObject<any>;
  initialState: TransactionInfoState

  constructor(props: TransactionInfoProps){
    super(props)
    this.searchTxInputRef = React.createRef();
    // Setting default values
    this.initialState = {
      hash: "",
      version: 0,
      inputsList: [],
      outputsList: [],
      lockTime: 0,
      size: 0,
      timestamp: 0,
      confirmations: 0,
      blockHeight: 0,
      blockHash: "",
      txHash: ""
    }
    this.state = { ...this.initialState }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // If the new hash is different forom the old one.
    // return the snapshot to be compared later.
    if (prevProps.txHash !== this.props.txHash) {
      return this.props.txHash
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      console.log("snapshot", snapshot, this.state.txHash)
      this.setState({ txHash: snapshot }, () => {
        this.fetchTxDetails({ txHash: snapshot })
      })
    }
  }

  fetchTxDetails = ({ txHash }) => {
    const { client, updateErrorState } = this.props;
    if (client && txHash){
      client.getTransaction({ hashHex: txHash }).then((res) => {
          // Convert the blockhash from base64 to hex.
          const txn = res.hasTransaction() && res.getTransaction()?.toObject()

          if (txn){
            let hash64 = res.getTransaction()?.getHash_asB64()
            // @ts-ignore
            let b2u = base64toU8(hash64).reverse()
            const txHash = u8toHex(b2u)

            hash64 = res.getTransaction()?.getBlockHash_asB64()
            // @ts-ignore
            b2u = base64toU8(hash64).reverse()
            const blockHash = u8toHex(b2u)

            this.setState({
              blockHash: blockHash || this.initialState.blockHash,
              blockHeight: txn.blockHeight || this.initialState.blockHeight,
              confirmations: txn.confirmations || this.initialState.confirmations,
              hash: txHash || this.initialState.hash,
              inputsList: txn.inputsList || this.initialState.inputsList,
              lockTime: txn.lockTime || this.initialState.lockTime,
              outputsList: txn.outputsList || this.initialState.outputsList,
              size: txn.size || this.initialState.size,
              // TODO: Complete the SLP INFO.
              // slpTransactionInfo: {slpAction: 10, validityJudgement: 0, parseError: "",
              // tokenId: "xA+Bdug1yiMGPZ90oFhJZIJos7nn3rhsbhkPw525lu0=", burnFlagsList: [], …}
              timestamp: txn.timestamp || this.initialState.timestamp,
              version: txn.version|| this.initialState.version,
            })
          }
        }).catch((err) => {
          console.log("[ERR] fetchTxDetails: ", err)
          // If error occured then reset the local component state to initial state i.e empty.
          this.setState({ ...this.initialState })
          // Update the error state in the redux store.
          updateErrorState({clientError: JSON.stringify(err)})
      })
    }
  }

  /**
   * When search button is triggered, this method is responsible for updating the txHash in the
   * redux store as well as fetching the details about the transaction.
   */
  onSearchTxn = () => {
    const ref = this.searchTxInputRef.current
    this.fetchTxDetails({ txHash: ref.value })
    this.props.updateTxHash({ txHash: ref.value })
  }

  /**
   * Updates the state of blockHash and maintains a text on the searching area.
   * The value of `<input>` is derived from the blockHash state.
   * @param event : Default event handler.
   */
  onChangeSearchVal = (event) => {
    const {value}  = event.target
    this.setState(() => {
      return { txHash: value }
    })
  }

  /**
   * 
   * @param txHash : Expects a transaction hash and makes an RPC call from via the client.
   * The returned data is then used to update local state to be displayed later.
   */
  getAndUpdateTxHash = (txHash) => {
    this.fetchTxDetails({ txHash: txHash })
  }

  renderSearch = () => {
    return(
      <div className="mb-4">
        <h1 className="title">Txn Information</h1>
        <div className="field has-addons is-12">
          <div className="control is-expanded">
            <input value={this.state.txHash}
              onChange={this.onChangeSearchVal}
              ref={this.searchTxInputRef}
              className="input is-rounded is-large"
              type="text"
              placeholder="Txn hash"
            />
          </div>
          <div className="control">
            <a className="button is-link is-large" onClick={this.onSearchTxn}>
              Search
            </a>
          </div>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div className="box">
        {this.renderSearch()}
        <div className="columns">
          <div className="column ">
            <MemoizedInfoComponent {...this.state} />
          </div>
        </div>
          <MemoizedInfoViaHashesComponent
            {...this.state}
            onClickHash={this.getAndUpdateTxHash}
          />
          <MemoizedInfoInputOutputHashes 
            {...this.state}
            onClickHash={this.getAndUpdateTxHash}
          />
      </div>
      
    );
    
  }
}

const mapDispatchToProps = dispatch => {
	return {
    updateErrorState: (args) => {
      dispatch(updateErrorState(args));
    },
    updateTxHash: (args) => {
      dispatch(updateTxHash(args));
    },
  };
};

const mapStateToProps = state => {
	return {
    client: state.AppReducer.client,
    txHash: state.TxReducer.txHash,
		clientError: state.AppReducer.clientError,
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TransactionInfo);
