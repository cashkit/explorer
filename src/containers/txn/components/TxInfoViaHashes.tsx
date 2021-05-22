import React from 'react';


export interface TxInfoViaHashesProps {
    hash: Uint8Array | string,
    blockHash: Uint8Array | string,
    onClickHash: (txHash: Uint8Array | string) => void,
}

export const TxInfoViaHashes = ({
    hash,
    blockHash,
    onClickHash, }
    : TxInfoViaHashesProps) => {
  return(
    <>
      <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left notification is-primary">
        <p className="is-size-4 has-text-weight-medium">Tx Hash</p>
        <div className="content">{hash}</div>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left  is-info">
        <p className="is-size-4 has-text-weight-medium">Block Hash</p>
        <a className="content" onClick={() => onClickHash(blockHash)}>{blockHash}</a>
        </article>
      </div>
      </div>
    </>
  )
}
          
          
  