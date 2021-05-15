import React from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import {updateErrorState} from '../../redux';

interface MempoolProps {
   client: GrpcManager
   updateErrorState: Function,
   client_error: string | null
}

interface MempoolState {
  mempoolSize: number,
  mempool: string
}

class Mempool extends React.Component<MempoolProps, MempoolState>{

  constructor(props: any){
    super(props)
    this.state ={
      mempoolSize: 0,
      mempool: ''
    }
  }

  componentDidMount(){
    this.props.client.getMempoolInfo().then((res) => {
      this.setState({
        mempoolSize: res.getSize(),
      })
    }).catch((err) => {
      console.log(err)
      this.props.updateErrorState({client_error: JSON.stringify(err)})
    })

    this.props.client.getMempool({ fullTransactions: false }).then((res) => {
      this.setState({
        mempool: JSON.stringify(res.toObject()),
      })
    }).catch((err) => {
      console.log(err)
      this.props.updateErrorState({client_error: JSON.stringify(err)})
    })
  }
  
  
  // Need to perform the check for `client_error` because once the component is rendered,
  // react tries to rerender/perform life cycles when any(the one component listens to) prop updates
  // and in the parent component we have added a statement to render undefined/some other 
  // component when the value of `client_error` changes. If you remove the check you might see
  // a warning like this:
  // Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  render(){
    const { mempoolSize } = this.state;
    const {client_error} = this.props;
    if (client_error !== null){
      return <div></div>
    }
    return (
      <div>
          <p>
              Mempool Size: <code>{mempoolSize}</code>
          </p>

          {/* <p>
              Mempool: <code>{mempool}</code>
          </p> */}
      </div>
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
