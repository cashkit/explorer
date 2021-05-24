import React from 'react';

export interface BlockInfoProps {
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

export const BlockInfo = ({ height, version, timestamp, bits, nonce,
    confirmations, difficulty, size, medianTime, transactions }
    :  BlockInfoProps) => {
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

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  if (prevProps.height == nextProps.height){
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
export const MemoizedInfoComponent = React.memo(BlockInfo, areEqual);
