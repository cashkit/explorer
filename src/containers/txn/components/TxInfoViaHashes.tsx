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
export const MemoizedInfoViaHashesComponent = React.memo(TxInfoViaHashes, areEqual);

          
  