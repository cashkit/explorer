/**
 * File not being used.
 * Using Blockchain Info for displaying Mempool Size.
 */

import React, { Fragment, Profiler } from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import {updateErrorState} from '../../redux';

interface MempoolProps {
   client: GrpcManager,
   updateErrorState: ({}) => void,
   client_error: string | null
}

interface MempoolState {
  mempool: Array<any>
}

class Mempool extends React.Component<MempoolProps, MempoolState>{

  constructor(props: any){
    super(props)
    this.state ={
      mempool: []
    }
  }

  componentDidMount(){
    const { client, updateErrorState } = this.props;

    client && client.getMempool({ fullTransactions: false }).then((res) => {
      this.setState({
        mempool: res.toObject().transactionDataList
      })
    }).catch((err) => {
      console.log(err)
      updateErrorState({client_error: JSON.stringify(err)})
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
  onRenderMempoolCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
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
   * Don't feel like that there is any need to show the entire mempool to the user.
   * Make sure the key is very unique.
   */
  renderMempool = () => {
    
    return <div>
      {this.state.mempool.map((txn, transactionHash) => {
        return <div key={transactionHash}>{JSON.stringify(txn)}</div>
      })}
    </div>
  }

  /**
   * Need to perform the check for `client_error` because once the component is rendered,
   * react tries to rerender/perform life cycles when any(the one component listens to) prop updates
   * and in the parent component we have added a statement to render undefined/some other 
   * component when the value of `client_error` changes. If you remove the check you might see
   *  a warning like this:
   * Warning: Can't perform a React state update on an unmounted component.
   * This is a no-op, but it indicates a memory leak in your application.
   */
  render(){
    // const {client_error} = this.props;
    // if (client_error !== null){
    //   return <div></div>
    // }
    return (
      <Profiler id="Mempool" onRender={this.onRenderMempoolCallback}>
        {this.renderMempool()}
      </Profiler>
    );
  }
}

const mapDispatchToProps = dispatch => {
	return {
    updateErrorState: (args) => {
      dispatch(updateErrorState(args));
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
)(Mempool);
