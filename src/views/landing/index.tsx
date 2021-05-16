import React, { lazy, Profiler } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from '../../ErrorBoundary';

import { createNewClient } from '../../redux';
import * as bchrpc from '../../protos/BchrpcServiceClientPb';


const BlockchainInfo = lazy(() => import("../../containers/blockchaininfo"));
const Mempool = lazy(() => import("../../containers/mempool"));
const Transactions = lazy(() => import("../../containers/transactions"));



interface AppProps {
  client: bchrpc.bchrpcClient,
  client_error: string | null,
  createNewClient: Function
}

interface AppState {
  client_error: string | null
}

class Landing extends React.Component<AppProps, AppState>{
    constructor(props){
      super(props);
      this.state = {
        client_error: this.props.client_error
      }
    }

    componentDidMount(){
      this.props.createNewClient();
    }

    renderError = () => {
      const { client_error } = this.props;
      if (client_error !== null) {
        return (
          <h5 style={{ backgroundColor: 'rgb(255, 100, 100)', margin: 0}}>
            Error: {client_error}
          </h5>
        )
      }
      return undefined
    }
    
    renderMempoolInfo = () => {
      const { client_error } = this.props;
      if (client_error !== null){
          return undefined 
      }
      return (
        <ErrorBoundary>
          <Mempool/>
        </ErrorBoundary>
      )
    }

    renderBlockchainInfo = () => {
      const { client_error } = this.props;
      if (client_error !== null){
          return undefined 
      }
      return (
        <ErrorBoundary>
          <BlockchainInfo/>
        </ErrorBoundary>
      )
    }

    renderTransactionsInfo = () => {
      const { client_error } = this.props;
      if (client_error !== null){
          return undefined 
      }
      return (
        <ErrorBoundary>
          <Transactions/>
        </ErrorBoundary>
      )
    }

    /**
     * @param id - the "id" prop of the Profiler tree that has just committed.
     * @param phase - either "mount" (if the tree just mounted) or "update" (if it re-rendered).
     * @param actualDuration - time spent rendering the committed update
     * @param baseDuration - estimated time to render the entire subtree without memoization
     * @param startTime - when React began rendering this update
     * @param commitTime - when React committed this update
     * @param interactions - the Set of interactions belonging to this update
     */
    onRenderBlockchainInfoCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
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
     * According to the Docs, React Strict mode currently helps with:
     * - Identifying components with unsafe lifecycles
     * - Warning about legacy string ref API usage
     * - Warning about deprecated findDOMNode usage
     * - Detecting unexpected side effects
     * - Detecting legacy context API
     */
    render(){
      return (
        <div className="App">
          <React.StrictMode>
            <header className="App-header" style={{display: 'flex', alignItems: 'stretch'}}>
              {this.renderError()}
              <h1>
                Cash Kit
              </h1>
            </header>
            <div>
              <Profiler id="BlockchainInfo" onRender={this.onRenderBlockchainInfoCallback}>
              {this.renderBlockchainInfo()}
              </Profiler>
              {this.renderTransactionsInfo()}
              {this.renderMempoolInfo()}
            </div>
          </React.StrictMode>
        </div>
      )
    }
}


const mapDispatchToProps = dispatch => {
	return {
    createNewClient: () => {
      dispatch(createNewClient());
    },
  };
};

const mapStateToProps = state => {
	return {
    client: state.AppReducer.client,
		client_error: state.AppReducer.client_error,
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Landing);