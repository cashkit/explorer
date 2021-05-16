import React, { lazy } from 'react';
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

    render(){
      return (
        <div className="App">
          <header className="App-header" style={{display: 'flex', alignItems: 'stretch'}}>
            {this.renderError()}
            <h1>
              Cash Kit
            </h1>
          </header>
          <div>
            {this.renderBlockchainInfo()}
            {this.renderMempoolInfo()}
            {this.renderTransactionsInfo()}
          </div>
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