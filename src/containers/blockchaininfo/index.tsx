import React from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import {updateErrorState} from '../../redux';
import styled from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`

interface BlockchainInfoProps {
   client: GrpcManager
   updateErrorState: Function,
   client_error: string | null
}

interface BlockchainInfoState {
  height: number,

}


class BlockchainInfo extends React.Component<BlockchainInfoProps, BlockchainInfoState>{

  constructor(props: any){
    super(props)
    this.state ={
      height: 0
    }
  }

  componentDidMount(){

    this.props.client.getBlockchainInfo().then((res) => {
        this.setState({
          height: res.toObject().bestHeight,
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
    const { height } = this.state;
    const {client_error} = this.props;
    if (client_error !== null){
      return <div></div>
    }
    return (
      <div>
          <Button>
              Height: <code>{height}</code>
          </Button>
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
)(BlockchainInfo);
