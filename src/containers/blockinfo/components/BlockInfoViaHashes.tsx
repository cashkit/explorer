import React from 'react';

export interface BlockInfoViaHashesProps {
    hash: Uint8Array | string,
    previousBlock: Uint8Array | string,
    merkleRoot: Uint8Array | string,
    nextBlockHash: Uint8Array | string,
    onClickHash: (blockHash: Uint8Array | string) => void,
}

export const BlockInfoViaHashes = ({ hash, previousBlock, merkleRoot, nextBlockHash, onClickHash }
    : BlockInfoViaHashesProps) => {
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


function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  if (prevProps.hash == nextProps.hash){
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
export const MemoizedInfoViaHashesComponent = React.memo(BlockInfoViaHashes, areEqual);
