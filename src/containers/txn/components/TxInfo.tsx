import React from 'react';


export interface TxInfoProps {
    version: number,
    lockTime: number,
    size: number,
    timestamp: number,
    confirmations: number,
    blockHeight: number,
}

export const TxInfo = ({
    blockHeight,
    confirmations,
    lockTime,
    size,
    timestamp,
    version, }
    : TxInfoProps) => {
  return(
    <>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Version</p>
            <div className="content">{version}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Block Height</p>
            <div className="content">{blockHeight}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">Timestamp</p>
            <div className="content">{timestamp}</div>
          </article>
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left">
            <p className="is-size-4 has-text-weight-medium">LockTime</p>
            <div className="content">{lockTime}</div>
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
      </div>
    </>
  )
}
