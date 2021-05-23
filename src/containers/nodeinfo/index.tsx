import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import { BlockchainInfo } from './components/BlockchainInfo';

import { updateErrorState, updateBlockHash, RootState } from '../../redux';
import { GetBlockchainInfoResponse } from '../../protos/bchrpc_pb';
import { base64toU8, u8toHex } from '../../utils';
import { GrpcManager } from '../../managers';

/**
 * From React Docs:
 * If your component renders the same result given the same props,
 * you can wrap it in a call to React.memo for a performance boost
 * in some cases by memoizing the result. This means that React will
 * skip rendering the component, and reuse the last rendered result.
 */
const MemoizedInfoComponent = React.memo(BlockchainInfo);

// Initial States

const initialState = {
  bitcoinNet: GetBlockchainInfoResponse.BitcoinNet.MAINNET,
  bestHeight: 0,
  bestBlockHash: '',
  difficulty: 0,
  medianTime: 0,
  txIndex: false,
  addrIndex: false,
  slpIndex: false,
}

const initialMempoolState = {
  mempoolSize: 0,
}

// Custom selector

// const selectClient= createSelector(
//     (state: RootState) => state.AppReducer,
//     AppReducer => AppReducer.client
// )

// Custom hooks

const useBlockchainInfoHook = () => {
  const [blockchainState, setBlockchainInfoState] = useState(initialState)
  // const client = useSelector(selectClient)
  const dispatch = useDispatch()
  useEffect(() => {
    GrpcManager.Instance.getBlockchainInfo().then((res) => {
      // Convert the blockhash from base64 to hex.
      const base_tx = res.getBestBlockHash_asB64()
      const b2u = base64toU8(base_tx).reverse()
      const blockHash = u8toHex(b2u)

      // Set block hash on redux store as well.
      dispatch(updateBlockHash({ blockHash }))
      // Use spread operator on the entire response and later override specific values.
      setBlockchainInfoState({ ...res.toObject(), bestBlockHash: blockHash})
    }).catch((err) => {
      console.log("[ERR] getBlockchainInfo: ", err)
      dispatch(updateErrorState({ clientError: JSON.stringify(err) }))
    })
  }, [dispatch])

  return blockchainState
}

const useMempoolInfoHook = () => {
  const [mempoolState, setLocalMempoolState] = useState(initialMempoolState)
  // const client = useSelector(selectClient)
  const dispatch = useDispatch()

  useEffect(() => {
    GrpcManager.Instance.getMempoolInfo().then((res) => {
      setLocalMempoolState({ mempoolSize: res.getSize() })
    }).catch((err) => {
        console.log("[ERR] getMempoolInfo: ", err)
        dispatch(updateErrorState({ clientError: JSON.stringify(err) }))
    }) 
  }, [dispatch])

  return mempoolState
}


const NodeInfo = () => {
  const blockchainState = useBlockchainInfoHook()
  const mempoolState = useMempoolInfoHook()

  return (
    <>
      <h1 className="title">Node Information</h1>
      <MemoizedInfoComponent {...blockchainState} {...mempoolState} />
    </>
  )
}

export default NodeInfo