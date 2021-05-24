import React, { useState, useEffect } from 'react';
import { useDispatch,  } from 'react-redux';

import { MemoizedInfoComponent } from './components/BlockchainInfo';

import { updateErrorState, updateBlockHash } from '../../redux';
import { GetBlockchainInfoResponse } from '../../protos/bchrpc_pb';
import { base64toU8, u8toHex } from '../../utils';
import { GrpcManager } from '../../managers';


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

// Custom hooks

const useBlockchainInfoHook = () => {
  const [blockchainState, setBlockchainInfoState] = useState(initialState)
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
  // eslint-disable-next-line
  }, [])

  return blockchainState
}

const useMempoolInfoHook = () => {
  const [mempoolState, setLocalMempoolState] = useState(initialMempoolState)
  const dispatch = useDispatch()

  useEffect(() => {
    GrpcManager.Instance.getMempoolInfo().then((res) => {
      setLocalMempoolState({ mempoolSize: res.getSize() })
    }).catch((err) => {
        console.log("[ERR] getMempoolInfo: ", err)
        dispatch(updateErrorState({ clientError: JSON.stringify(err) }))
    })
  // eslint-disable-next-line
  }, [])

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