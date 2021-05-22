import React from 'react';
import { GetBlockchainInfoResponse } from '../../../protos/bchrpc_pb';

export interface BlockchainInfoProps {
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

export const BlockchainInfo = ({ bitcoinNet, bestHeight, bestBlockHash,
    difficulty, medianTime, txIndex, addrIndex, slpIndex, mempoolSize }
    : BlockchainInfoProps) => {
  return(
    <>
      <div className="tile is-ancestor">
          <div className="tile is-parent">
            <article className="tile is-child box has-text-left">
              <p className="is-size-4 has-text-weight-medium"> Network</p>
              <div className="content">{bitcoinNet}</div>
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