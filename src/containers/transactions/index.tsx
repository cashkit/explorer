import React, { Fragment, Profiler } from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import {updateErrorState, updateTxHash} from '../../redux';
import { base64toU8, u8toHex } from '../../utils';

interface TransactionsProps {
   client: GrpcManager,
   updateErrorState: ({}) => void,
   updateTxHash: ({}) => void,
   clientError: string | null,
   scrollToTransactionDetails: () => void,
}

interface TransactionsState {
    transactions: Array<string>
}

class Transactions extends React.Component<TransactionsProps, TransactionsState>{

  constructor(props: TransactionsProps){
    super(props)
    this.state ={
        transactions: []
    }
  }

  componentDidMount(){
    const that = this;
    const { client, updateErrorState} = this.props;
    client && client.subscribeTransactions({ includeMempoolAcceptance: true,
        includeBlockAcceptance: true,
        // includeSerializedTxn: true,
        }).then((res) => {
          res.on('data', function(response){
            const base_tx = response.getUnconfirmedTransaction()?.getTransaction()?.getHash_asB64()
            // @ts-ignore
            const b2u = base64toU8(base_tx).reverse()
            const tx_hash = u8toHex(b2u)
            const txs = [tx_hash, ...that.state.transactions]
            if (txs.length > 17){
              txs.pop()
            }
            that.setState({ transactions: txs})
        });

        res.on('error', function(response){
          console.log("On Error: ",  response)
        });

        res.on('status', function(response){
          console.log("On status: ",  response)
        });

        res.on('metadata', function(response){
          console.log("On metadata: ",  response)
        });

        res.on('end', function(){
          console.log("On end: Just ended without response.",)
        });
        // res.removeListener()
        // TODO: Remember to call the cancel actions to stop the stream.
        //res.cancel()
    }).catch((err) => {
        console.log(err)
        updateErrorState({clientError: JSON.stringify(err)})
    })
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
     onRenderTransactionsCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
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
   * Fetch a unique transaction.
   */
  onClickTransaction = (hashHex) => {
    console.log(hashHex)
    this.props.updateTxHash({txHash: hashHex})
    this.props.scrollToTransactionDetails()
  }

  renderTransactions = () => {
    const { transactions } = this.state;
    // Make sure the key is very unique.
    return (
      <Fragment>
        <h1 className="title">Live Transactions</h1>

        {transactions.map((transaction) => {
          return  <p key={transaction} onClick={() => this.onClickTransaction(transaction)}>
            transaction: <a className="content">{transaction}</a>
          </p>
        })}
      </Fragment>
    )
  }
  
  // Need to perform the check for `clientError` because once the component is rendered,
  // react tries to rerender/perform life cycles when any(the one component listens to) prop updates
  // and in the parent component we have added a statement to render undefined/some other 
  // component when the value of `clientError` changes. If you remove the check you might see
  // a warning like this:
  // Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  render(){
    return (
      <Fragment>
        <Profiler id="Transactions" onRender={this.onRenderTransactionsCallback}>
          {this.renderTransactions()}
        </Profiler>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
	return {
    updateErrorState: (args) => {
      dispatch(updateErrorState(args));
    },
    updateTxHash: (args) => {
      dispatch(updateTxHash(args));
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
)(Transactions);
