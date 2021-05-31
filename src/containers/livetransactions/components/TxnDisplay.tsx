import React, { Profiler } from 'react';

export interface TxnDisplayInterface {
  transaction: string,
  onClickMetaData: Function
}

/**
 * Use the profiler to check for rerenders.
 * Usage:
 *  <Profiler id={transaction} onRender={onRenderProfilerCallback}>
 *    <p key={transaction}>
 *       transaction: <a onClick={() => onClickMetaData(transaction)} className="content">{transaction}</a>
 *    </p>
 *  </Profiler>
 * 
 * @param id - the "id" prop of the Profiler tree that has just committed.
 * @param phase - either "mount" (if the tree just mounted) or "update" (if it re-rendered).
 * @param actualDuration - time spent rendering the committed update
 * @param baseDuration - estimated time to render the entire subtree without memoization
 * @param startTime - when React began rendering this update
 * @param commitTime - when React committed this update
 * @param interactions - the Set of interactions belonging to this update
 */
  const onRenderProfilerCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
  console.log(`[INFO] PROFILER: ID: ${id}
    PHASE: ${phase}
    ACTUAL_DURATION: ${actualDuration}, 
    BASE_DURATION: ${baseDuration}
    START_TIME: ${startTime}
    COMMIT_TIME: ${commitTime}
    INTERACTIONS: ${interactions.size}`
  )
}

/**
 * @param transaction: Transaction hash
 * @param onClickMetaData: Callback function for click event on transaction hash.
 * @returns 
*/
export const TxnDisplay = ({transaction, onClickMetaData}: TxnDisplayInterface ) => {
  return (
      <p key={transaction}>
        transaction: <a onClick={() => onClickMetaData(transaction)} className="content">{transaction}</a>
      </p>
  )
}

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
 if (prevProps.transaction == nextProps.transaction){
   return true
 }
 return false
}

export const MemoizedTxnDisplay = React.memo(TxnDisplay, areEqual);
