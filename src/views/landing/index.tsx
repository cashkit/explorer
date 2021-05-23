import React, { lazy, Profiler } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import ErrorBoundary from '../../ErrorBoundary';
import { checkClient } from '../../redux';
import { InfoBar } from '../../common';

import * as bchrpc from '../../protos/BchrpcServiceClientPb';

const NodeInfo = lazy(() => import("../../containers/nodeinfo"));
const Transactions = lazy(() => import("../../containers/transactions"));
const BlockInfo = lazy(() => import("../../containers/blockinfo"));
const TxInfo = lazy(() => import("../../containers/txn"));


interface AppProps {
  client: bchrpc.bchrpcClient,
  clientError: string | null,
  checkClient: Function
}

interface AppState {
  clientError: string | null,
  hide_error: boolean
}

class Landing extends React.Component<AppProps, AppState>{
    txInfoRef: React.RefObject<any>;

    constructor(props){
      super(props);
      this.txInfoRef = React.createRef();
      this.state = {
        clientError: this.props.clientError,
        hide_error: false
      }
    }

    componentDidMount(){
      this.props.checkClient();
    }

    renderInfoBar = () => {
      const { clientError } = this.props;
      return (
        <InfoBar content={clientError}></InfoBar>
      )
    }

    renderBlockchainInfo = () => {
      return (
        <ErrorBoundary>
          <NodeInfo/>
        </ErrorBoundary>
      )
    }

    renderTransactionsInfo = () => {
      return (
        <ErrorBoundary>
          <Transactions scrollToTransactionDetails={() => this.executeScroll(this.txInfoRef)}/>
        </ErrorBoundary>
      )
    }

    renderBlockInfo = () => {
      return (
        <ErrorBoundary>
          <BlockInfo/>
        </ErrorBoundary>
      )
    }

    renderTxInfo = () => {
      return (
        <ErrorBoundary>
          <TxInfo/>
        </ErrorBoundary>
      )
    }

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
    onRenderProfilerCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
      console.log(`[INFO] PROFILER: ID: ${id}
        PHASE: ${phase}
        ACTUAL_DURATION: ${actualDuration}, 
        BASE_DURATION: ${baseDuration}
        START_TIME: ${startTime}
        COMMIT_TIME: ${commitTime}
        INTERACTIONS: ${interactions.size}`
      )
    }

    executeScroll = (ref) => {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    render(){
      return (
        <div className="App">
            <Helmet
              titleTemplate="%s - CashWeb"
              defaultTitle="CashWeb"
            >
              <meta name="description" content="Dashboard: A CashWeb application" />
            </Helmet>
            {this.renderInfoBar()}

            <div className="section">            
              <div className="columns">
                <div className="column">
                    {this.renderBlockchainInfo()}
                </div>
                <div className="column">
                    {this.renderTransactionsInfo()}
                </div>
              </div>
            </div>

            <div className="section">            
                {this.renderBlockInfo()}
            </div>

            <div className="section" ref={this.txInfoRef}>            
                {this.renderTxInfo()}
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
}


const mapDispatchToProps = dispatch => {
	return {
    checkClient: () => {
      dispatch(checkClient());
    },
  };
};

const mapStateToProps = state => {
	return {
    client: state.AppReducer.client,
		clientError: state.AppReducer.clientError,
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Landing);