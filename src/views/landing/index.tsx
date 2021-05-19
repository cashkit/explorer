import React, { lazy, Profiler } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import ErrorBoundary from '../../ErrorBoundary';

import { createNewClient } from '../../redux';
import * as bchrpc from '../../protos/BchrpcServiceClientPb';

const BlockchainInfo = lazy(() => import("../../containers/blockchaininfo"));
const Transactions = lazy(() => import("../../containers/transactions"));
const BlockInfo = lazy(() => import("../../containers/blockinfo"));


interface AppProps {
  client: bchrpc.bchrpcClient,
  client_error: string | null,
  createNewClient: Function
}

interface AppState {
  client_error: string | null,
  hide_error: boolean
}

class Landing extends React.Component<AppProps, AppState>{
    constructor(props){
      super(props);
      this.state = {
        client_error: this.props.client_error,
        hide_error: false
      }
    }

    componentDidMount(){
      this.props.createNewClient();
    }

    dismissError = () => {
      this.setState({ hide_error: true })
    }

    renderError = () => {
      const { client_error } = this.props;
      const { hide_error } = this.state;
      if (client_error !== null && !hide_error) {
        return (
          <div className="notification is-danger">
            <button className="delete" onClick={this.dismissError}></button>
            {client_error}
          </div>
        )
      }
      return undefined
    }

    renderBlockchainInfo = () => {
      return (
        <ErrorBoundary>
          <BlockchainInfo/>
        </ErrorBoundary>
      )
    }

    renderTransactionsInfo = () => {
      return (
        <ErrorBoundary>
          <Transactions/>
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
            <Helmet
              titleTemplate="%s - CashWeb"
              defaultTitle="CashWeb"
            >
              <meta name="description" content="Dashboard: A CashWeb application" />
            </Helmet>
            
            <header className="App-header">
              {this.renderError()}
            </header>

            <div className="section">            
              <div className="columns">
                <div className="column">
                  <Profiler id="BlockchainInfo" onRender={this.onRenderBlockchainInfoCallback}>
                    {this.renderBlockchainInfo()}
                  </Profiler>
                </div>
                <div className="column">
                    {this.renderTransactionsInfo()}
                </div>
              </div>
            </div>

            <div className="section">            
              {this.renderBlockInfo()}
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