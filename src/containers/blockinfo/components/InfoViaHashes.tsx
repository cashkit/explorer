import React from 'react';

export interface InfoViaHashesProps {
    hash: Uint8Array | string,
    previousBlock: Uint8Array | string,
    merkleRoot: Uint8Array | string,
    nextBlockHash: Uint8Array | string,
    onClickHash: (blockHash: Uint8Array | string) => void,
}

export const InfoViaHashes = ({ hash, previousBlock, merkleRoot, nextBlockHash, onClickHash }
    : InfoViaHashesProps) => {
  return(
    <>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left notification is-primary">
            <p className="is-size-4 has-text-weight-medium">Block Hash</p>
            <div className="content">{hash}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left  is-info">
            <p className="is-size-4 has-text-weight-medium">Previous Block</p>
            <a className="content" onClick={() => onClickHash(previousBlock)}>{previousBlock}</a>
          </article>
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left  is-info">
            <p className="is-size-4 has-text-weight-medium">Merkle Root</p>
            <div className="content">{merkleRoot}</div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box has-text-left  is-info">
            <p className="is-size-4 has-text-weight-medium">Next Block Hash</p>
            <a className="content" onClick={() => onClickHash(nextBlockHash)}>{nextBlockHash}</a>
          </article>
        </div>
      </div>
    </>
    )
  }