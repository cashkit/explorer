import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, } from 'react-redux';
import * as grpcWeb from 'grpc-web';

import { TxnDisplay } from './components/TxnDisplay';

import { updateErrorState, updateTxHash } from '../../redux';
import { TransactionNotification } from '../../protos/bchrpc_pb'
import { GrpcManager } from '../../managers';
import { base64toU8, u8toHex } from '../../utils';

// Memoized Component
const MemoizedTxnDisplay = React.memo(TxnDisplay);

// Interfaces

interface TransactionsProps {
   scrollToTransactionDetails: () => void,
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
const useAsyncHook = () => {
  // Acting as ComponentDidMount
  const dispatch = useDispatch()
  const [ transaction, setTransaction ] = useState<string>("")
  const [ txns, setTxns ] = useState<string[]>([])
  // Keeping a reference to cancel when component unmounts.
  const link = useRef<grpcWeb.ClientReadableStream<TransactionNotification>>()

  /**
   * Subscribe to the transactions.
   */
  useEffect(() => {
    async function subscribe() {
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

    // Just a security check, this condition should never be false.
    if (!link.current) {
      subscribe()
    }

    return () => {
      link.current && link.current.cancel()
    }
  // eslint-disable-next-line
  }, [])

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
 * @param props : scrollToTransactionDetails: expects a callback function to be called then onClick event
 * occurs on the transaction hash.
 */
const Transactions = (props: TransactionsProps) => {
  const dispatch = useDispatch()
  const transactions = useAsyncHook()

  /**
   * - Update the transaction hash in the redux store.
   * - Scroll directly to the transaction's detail section.
   * @param hashHex: Expects transaction hash.
   */
  const onClickTransaction = (hashHex) => {
    dispatch(updateTxHash({txHash: hashHex}))
    props.scrollToTransactionDetails()
  }

  return (
    <>
      <h1 className="title">Live Transactions</h1>
      {transactions.map((transaction) => {
        return <MemoizedTxnDisplay
          key={transaction}
          transaction={transaction}
          onClickTransaction={() => onClickTransaction(transaction)}
        />
      })}
    </>
  )
}

export default Transactions;