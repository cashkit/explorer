import React from 'react';

export interface InfoComponentProps {
    height: number,
    version: number,
    timestamp: number,
    bits: number,
    nonce: number,
    confirmations: number,
    difficulty: number,
    size: number,
    medianTime: number,
    transactions: number | false
}

export const InfoComponent = ({ height, version, timestamp, bits, nonce,
    confirmations, difficulty, size, medianTime, transactions }
    :  InfoComponentProps) => {
  return(
    <>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Height</p>
            <div className="content">{height}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Version</p>
            <div className="content">{version}</div>
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
            <p className="is-size-4 has-text-weight-medium">Timestamp</p>
            <div className="content">{timestamp}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Bits</p>
            <div className="content">{bits}</div>
          </article>
        </div>
      </div>
  
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Nonce</p>
            <div className="content">{nonce}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Confirmations</p>
            <div className="content">{confirmations}</div>
          </article>
        </div>
  
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Size</p>
            <div className="content">{size}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Median Time</p>
            <div className="content">{medianTime}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Total Transactions</p>
            <div className="content">{transactions}</div>
          </article>
        </div>
      </div>
      </>
    )
}
