import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, } from 'react-redux';
import * as grpcWeb from 'grpc-web';

import { MemoizedTxnDisplay } from './components/TxnDisplay';

import { updateErrorState, updateTxHash } from '../../redux';
import { TransactionNotification } from '../../protos/bchrpc_pb'
import { GrpcManager } from '../../managers';
import { base64toU8, u8toHex } from '../../utils';


// Interfaces

interface LiveTransactionsProps {
  hidden: boolean,
  onClickTx: () => void,
}

// Hooks

/**
 * This function uses two useEffect methods.
 * - The first one runs once and extablishes a streaming connection with the server though
 * GrpcManager's client, it also updates the state with every new incoming transaction.
 * - The second method is responsible for looking at transaction change, whenever a new state is set
 * this method is called and it updated the state of transactions array(txns), which gets returned by the function.
 * @returns Transactions list.
 */
const useAsyncHook = (pause) => {
  const dispatch = useDispatch()
  const [ transaction, setTransaction ] = useState<string>("")
  const [ txns, setTxns ] = useState<string[]>([])
  // Keeping a reference to cancel when component unmounts.
  const link = useRef<grpcWeb.ClientReadableStream<TransactionNotification>>()

  /**
  * Unsubscribe to the transactions.
  */
  const Unsubscribe = () => {
    if (link.current) {
      link.current.removeListener("end", () => {})
      link.current.cancel()
    }
  }
  /**
  * Subscribe to the transactions.
  */
  const subscribe = async () => {
    try {
      const res = await GrpcManager.Instance.subscribeTransactions({ includeMempoolAcceptance: true,
        includeBlockAcceptance: true,
        // includeSerializedTxn: true,
      })
      link.current = res;
      link.current.on('data', function(response){
        const base_tx = response.getUnconfirmedTransaction()?.getTransaction()?.getHash_asB64()
        // @ts-ignore
        const b2u = base64toU8(base_tx).reverse()
        const tx_hash = u8toHex(b2u)
        setTransaction(tx_hash)
        
      });
      res.on('error', function(response){
        console.log("On Error: ",  response)
      });
      res.on('status', function(response){
        console.log("On status: ",  response)
      });
      res.on('metadata', function(response){
        console.log("On metadata: ",  response)
      });
      res.on('end', function(){
        console.log("On end: Just ended without response.",)
      });
    } catch (error) {
      dispatch(updateErrorState({clientError: JSON.stringify(error)}))
    }
  }

  /**
   *  Acting as ComponentDidMount
   */
  useEffect(() => {
    if (!pause) {
      subscribe()
    }

    return () => {
      Unsubscribe()
    }
  // eslint-disable-next-line
  }, [pause])

  /**
   * Listen to the changes to transaction state and update the transactions list.
   */
  useEffect(() => {
    if (transaction){
      const txs = [transaction, ...txns]
      if (txs.length > 17){
        txs.pop()
      }
      setTxns(txs)
    }
    
  // eslint-disable-next-line
  }, [transaction])

  return txns
}

/**
 * Main component that gets rendered
 * @param props : onTxClick: expects a callback function to be called then onClick event
 * occurs on the transaction hash.
 * @param props : onTxClick: expects a callback function to be called then onClick event
 */
const LiveTransactions = (props: LiveTransactionsProps) => {
  const dispatch = useDispatch()
  const [isPaused, setTxListenerState] = useState(false)
  const transactions = useAsyncHook(isPaused)

  /**
   * - Update the transaction hash in the redux store.
   * - Scroll directly to the transaction's detail section.
   * @param hashHex: Expects transaction hash.
   */
  const onClickTx = (hashHex) => {
    dispatch(updateTxHash({txHash: hashHex}))
    props.onClickTx()
  }

  const toggleSubscription = () => {
    isPaused ? setTxListenerState(false) : setTxListenerState(true)
  }

  // Probably the best way to persist local state. [No need for redux]
  if (props.hidden){ return <div/> }

  return (
    <div className="section">
      <div className="columns">
        <h1 className="title column">Live Transactions</h1>
        <a className="button is-primary" onClick={toggleSubscription}>{isPaused ? "Subscribe" : "Unsubscribe"}</a>
      </div>

      {transactions.map((transaction) => {
        return <MemoizedTxnDisplay
          key={transaction}
          transaction={transaction}
          onClickTx={() => onClickTx(transaction)}
        />
      })}
    </div>
  )
}

export default LiveTransactions;