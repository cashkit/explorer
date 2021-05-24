import React from 'react';
import { GetBlockchainInfoResponse } from '../../../protos/bchrpc_pb';

export interface BlockchainInfoInterface {
    bitcoinNet?: GetBlockchainInfoResponse.BitcoinNet,
    bestHeight: number,
    bestBlockHash: Uint8Array | string,
    difficulty: number,
    medianTime: number,
    txIndex: boolean,
    addrIndex: boolean,
    slpIndex: boolean,
    mempoolSize: number
}

const getNetworkName = (networkCode) => {
  if (networkCode == GetBlockchainInfoResponse.BitcoinNet.MAINNET) { return "MAINNET" }
  else if (networkCode == GetBlockchainInfoResponse.BitcoinNet.REGTEST) { return "REGTEST" }
  else if (networkCode == GetBlockchainInfoResponse.BitcoinNet.TESTNET3) { return "TESTNET3" }
  else if (networkCode == GetBlockchainInfoResponse.BitcoinNet.SIMNET) { return "SIMNET" }
  return "UNKNOWN"
}

export const BlockchainInfo = ({ bitcoinNet, bestHeight, bestBlockHash,
    difficulty, medianTime, txIndex, addrIndex, slpIndex, mempoolSize }
    : BlockchainInfoInterface) => {
  
  const networkName = getNetworkName(bitcoinNet)
  return(
    
    <>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium"> Network</p>
            <div className="content">{networkName}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Difficulty</p>
            <div className="content">{difficulty}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Best Height</p>
            <div className="content">{bestHeight}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Median Time</p>
            <p className="content">{medianTime}</p>
          </article>
        </div>
      </div>

      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Transaction Index</p>
            <div className="content">{txIndex ? 'True' : 'False'}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">SLP Index</p>
            <div className="content">{slpIndex ? 'True' : 'False'}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Address Index</p>
            <div className="content">{addrIndex ? 'True' : 'False'}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Mempool Size</p>
            <div className="content">{mempoolSize}</div>
          </article>
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left notification is-primary">
            <p className="is-size-4 has-text-weight-medium">Best Block Hash</p>
            <div className="content">
              {bestBlockHash}
            </div>
          </article>
        </div>
      </div>
    </>
  )
}

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  if (prevProps.bestBlockHash == nextProps.bestBlockHash &&
    prevProps.mempoolSize == nextProps.mempoolSize){
    return true
  }
  return false
}

/**
 * From React Docs:
 * If your component renders the same result given the same props,
 * you can wrap it in a call to React.memo for a performance boost
 * in some cases by memoizing the result. This means that React will
 * skip rendering the component, and reuse the last rendered result.
 */
export const MemoizedInfoComponent = React.memo(BlockchainInfo, areEqual);
