import React, { lazy, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

import { ErrorBoundary } from '../../common';
import { checkClient } from '../../redux';
import { InfoBar } from '../../common';
import { useDispatch } from 'react-redux';

const NodeInfo = lazy(() => import("../../containers/nodeinfo"));
const Transactions = lazy(() => import("../../containers/transactions"));
const BlockInfo = lazy(() => import("../../containers/blockinfo"));
const TxInfo = lazy(() => import("../../containers/txn"));


const Landing = () => {

  const txInfoRef = useRef<any>(null);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkClient())
  // eslint-disable-next-line
  }, [])

  /**
   * Usage:
   *  <Profiler id="TxInfo" onRender={this.onRenderProfilerCallback}>
   *      <Component/>
   * </Profile>
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

  const executeScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="App">
        <Helmet
          titleTemplate="%s - CashWeb"
          defaultTitle="CashWeb"
        >
          <meta name="description" content="Dashboard: A CashWeb application" />
        </Helmet>
        <InfoBar/>

        <div className="section">            
          <div className="columns">
            <div className="column">
              <ErrorBoundary>
                <NodeInfo/>
              </ErrorBoundary>
            </div>
            <div className="column">
              <ErrorBoundary>
                <Transactions scrollToTransactionDetails={() => executeScroll(txInfoRef)}/>
              </ErrorBoundary>
            </div>
          </div>
        </div>

        <div className="section">            
          <ErrorBoundary>
            <BlockInfo/>
          </ErrorBoundary>
        </div>

        <div className="section" ref={txInfoRef}>            
          <ErrorBoundary>
            <TxInfo/>
          </ErrorBoundary>
        </div>
        
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Cashkit</strong> by <a href="https://github.com/kiok46">Kuldeep</a>. The source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
            </p>
          </div>
        </footer>
    </div>
  )
}

export default Landing