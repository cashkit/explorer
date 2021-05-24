import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import { TxInfo } from './components/TxInfo';
import { MemoizedInfoViaHashesComponent } from './components/TxInfoViaHashes';
import { TxInfoInputOutputHashes } from './components/TxInfoInputOutputHashes';

import { GrpcManager } from '../../managers';
import { Transaction } from '../../protos/bchrpc_pb';
import { updateErrorState, updateTxHash, RootState } from '../../redux';
import { base64toU8, u8toHex } from '../../utils';


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
  // To be added soon
  // slpTransactionInfo?: SlpTransactionInfo.AsObject,
}

const initialState: TransactionInfoState = {
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
}

const initialTxHashState = {
  txHash: "",
};


/**
 * Fetch the value of txHash from the redux store.
 */
const txHashSelector = createSelector(
  (state: RootState) => state.TxReducer,
  TxReducer => TxReducer.txHash
)


const TransactionInfo = () => {
  const [txHashState, setLocalTxHash] = useState(initialTxHashState);
  const [txnState, setTxnState] = useState(initialState)
  const dispatch = useDispatch();
  const searchTxInputRef = useRef<any>(null);
  const resHash = useSelector(txHashSelector)

  /**
   * Acts as ComponentDidMount, tries to fetch blockdetails if resHash is defined.
   */
  useEffect(() => {
    resHash && fetchTxDetails({ txHash: resHash })
  // eslint-disable-next-line
  }, [])

  /**
   * Acts as ComponentWillReceiveProps, listens to changes to resHash and calls `fetchBlockDetails`
   * if the value is changed.
   */
  useEffect(() => {
    fetchTxDetails({ txHash: resHash })
  // eslint-disable-next-line
  }, [resHash])

  const fetchTxDetails = ({ txHash }) => {
    txHash && GrpcManager.Instance.getTransaction({ hashHex: txHash }).then((res) => {
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

        setTxnState({
          blockHash: blockHash || initialState.blockHash,
          blockHeight: txn.blockHeight || initialState.blockHeight,
          confirmations: txn.confirmations || initialState.confirmations,
          hash: txHash || initialState.hash,
          inputsList: txn.inputsList || initialState.inputsList,
          lockTime: txn.lockTime || initialState.lockTime,
          outputsList: txn.outputsList || initialState.outputsList,
          size: txn.size || initialState.size,
          // TODO: Complete the SLP INFO.
          // slpTransactionInfo: {slpAction: 10, validityJudgement: 0, parseError: "",
          // tokenId: "xA+Bdug1yiMGPZ90oFhJZIJos7nn3rhsbhkPw525lu0=", burnFlagsList: [], …}
          timestamp: txn.timestamp || initialState.timestamp,
          version: txn.version|| initialState.version,
        })

        setLocalTxHash({
          txHash: txHash || initialTxHashState.txHash,
        })
      }
    }).catch((err) => {
      console.log("[ERR] fetchTxDetails: ", err)
      // If error occured then reset the local component state to initial state i.e empty.
      setTxnState({ ...initialState })
      // Update the error state in the redux store.
      dispatch(updateErrorState({clientError: JSON.stringify(err)}))
    })
  }

  /**
   * When search button is triggered, this method is responsible for updating the txHash in the
   * redux store as well as fetching the details about the transaction.
   */
  const onSearchTxn = () => {
    const ref = searchTxInputRef.current
    if (ref?.value){
      fetchTxDetails({ txHash: ref.value })
      dispatch(updateTxHash({ txHash: ref.value }))
    }
  }

  /**
   * Updates the state of blockHash and maintains a text on the searching area.
   * The value of `<input>` is derived from the blockHash state.
   * @param event : Default event handler.
   */
  const onChangeSearchVal = (event) => {
    const {value}  = event.target
    setLocalTxHash({ txHash: value })
  }

  /**
   * 
   * @param txHash : Expects a transaction hash and makes an RPC call from via the client.
   * The returned data is then used to update local state to be displayed later.
   */
  const getAndUpdateTxHash = (txHash) => {
    fetchTxDetails({ txHash })
  }

  const renderSearch = () => {
    return(
      <div className="mb-4">
        <h1 className="title">Txn Information</h1>
        <div className="field has-addons is-12">
          <div className="control is-expanded">
            <input value={txHashState.txHash}
              onChange={onChangeSearchVal}
              ref={searchTxInputRef}
              className="input is-rounded is-large"
              type="text"
              placeholder="Txn hash"
            />
          </div>
          <div className="control">
            <a className="button is-link is-large" onClick={onSearchTxn}>
              Search
            </a>
          </div>
        </div>
      </div>
    )
  }

    return (
      <div className="box">
        {renderSearch()}
        <div className="columns">
          <div className="column ">
            <TxInfo {...txnState} />
          </div>
        </div>
          <MemoizedInfoViaHashesComponent
            {...txnState}
            onClickHash={getAndUpdateTxHash}
          />
          <TxInfoInputOutputHashes 
            {...txnState}
            onClickHash={getAndUpdateTxHash}
          />
      </div>
      
    );
}

export default TransactionInfo