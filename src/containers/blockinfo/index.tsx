import React from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import { updateErrorState, updateBlockHash } from '../../redux';
import { base64toU8, u8toHex } from '../../utils';

import { BlockInfo, BlockInfoViaHashes } from './components';

/**
 * From React Docs:
 * If your component renders the same result given the same props,
 * you can wrap it in a call to React.memo for a performance boost
 * in some cases by memoizing the result. This means that React will
 * skip rendering the component, and reuse the last rendered result.
 */
 const MemoizedInfoComponent = React.memo(BlockInfo);
 const MemoizedInfoViaHashesComponent = React.memo(BlockInfoViaHashes);

interface BlockInfoProps {
   updateErrorState: ({}) => void,
   updateBlockHash: ({}) => void,
   blockHash: string | null,
   clientError: string | null
}

interface BlockInfoState {
  hash: Uint8Array | string,
  height: number,
  version: number,
  previousBlock: Uint8Array | string,
  merkleRoot: Uint8Array | string,
  timestamp: number,
  bits: number,
  nonce: number,
  confirmations: number,
  difficulty: number,
  nextBlockHash: Uint8Array | string,
  size: number,
  medianTime: number,
  transactions: number | false,
  blockHash: string
}


class Block extends React.PureComponent<BlockInfoProps, BlockInfoState>{

  searchBlockInputRef: React.RefObject<any>;
  initialState: BlockInfoState;

  constructor(props: BlockInfoProps){
    super(props)
    this.searchBlockInputRef = React.createRef();
    // Setting default values
    this.initialState = {
      hash: "",
      height: 0,
      version: 0,
      previousBlock: "",
      merkleRoot: "",
      timestamp: 0,
      bits: 0,
      nonce: 0,
      confirmations: 0,
      difficulty: 0,
      nextBlockHash: "",
      size: 0,
      medianTime: 0,
      transactions: 0,
      blockHash: ""
    };
    this.state = { ...this.initialState }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // If the new hash is different forom the old one.
    // return the snapshot to be compared later.
    if (prevProps.blockHash !== this.props.blockHash) {
      return this.props.blockHash
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      this.setState({ blockHash: snapshot }, () => {
        this.fetchBlockDetails({ blockHash: snapshot })
      })
    }
  }

  /**
   * 
   * @param params{BlockHash}: Expects a blockHash and makes an RPC call to update the details
   * using the setState method which later updates children components.
   */
  fetchBlockDetails = ({ blockHash }) => {
    const { updateErrorState } = this.props;
    blockHash && GrpcManager.Instance.getBlock({ hashHex: blockHash }).then((res) => {
        // Convert the blockhash from base64 to hex.
        const block = res.hasBlock() && res.getBlock()?.toObject()
        const transactions = res.hasBlock() && res.getBlock()?.getTransactionDataList().length

        if (block){
          let hash64 = res.getBlock()?.getInfo()?.getHash_asB64()
          // @ts-ignore
          let b2u = base64toU8(hash64).reverse()
          const blockHash = u8toHex(b2u)

          hash64 = res.getBlock()?.getInfo()?.getPreviousBlock_asB64()
          // @ts-ignore
          b2u = base64toU8(hash64).reverse()
          const previousBlock = u8toHex(b2u)

          hash64 = res.getBlock()?.getInfo()?.getMerkleRoot_asB64()
          // @ts-ignore
          b2u = base64toU8(hash64).reverse()
          const merkleRoot = u8toHex(b2u)

          hash64 = res.getBlock()?.getInfo()?.getNextBlockHash_asB64()
          // @ts-ignore
          b2u = base64toU8(hash64).reverse()
          const nextBlockHash = u8toHex(b2u)

          this.setState({
            height: block.info?.height || this.initialState.height,
            hash: blockHash || this.initialState.hash,
            version: block.info?.version || this.initialState.version,
            previousBlock: previousBlock || this.initialState.previousBlock,
            merkleRoot: merkleRoot || this.initialState.merkleRoot,
            timestamp: block.info?.timestamp || this.initialState.timestamp,
            bits: block.info?.bits || this.initialState.bits,
            nonce: block.info?.nonce || this.initialState.nonce,
            confirmations: block.info?.confirmations || this.initialState.confirmations,
            difficulty: block.info?.difficulty || this.initialState.difficulty,
            nextBlockHash: nextBlockHash || this.initialState.nextBlockHash,
            size: block.info?.size || this.initialState.size,
            medianTime: block.info?.medianTime || this.initialState.medianTime,
            transactions: transactions || this.initialState.transactions
          })
        }
      }).catch((err) => {
        console.log("[ERR] fetchBlockDetails: ", err)
        this.setState({ ...this.initialState })
        updateErrorState({clientError: JSON.stringify(err)})
      })
  }

  /**
   * When search button is triggered, this method is responsible for updating the blockhash in the
   * redux store as well as fetching the details about the block.
   */
  onSearchBlock = () => {
    const ref = this.searchBlockInputRef.current
    this.fetchBlockDetails({ blockHash: ref.value })
    this.props.updateBlockHash({ blockHash: ref.value })
  }

  /**
   * Updates the state of blockHash and maintains a text on the searching area.
   * The value of `<input>` is derived from the blockHash state.
   * @param event : Default event handler.
   */
  onChangeSearchValue = (event) => {
    const {value}  = event.target
    this.setState(() => {
      return { blockHash: value }
    })
  }

  /**
   * 
   * @param blockHash : Expects a block hash and makes an RPC call from via the client.
   * The returned data is then used to update local state to be displayed later.
   */
  getAndUpdateBlockHash = (blockHash) => {
    this.fetchBlockDetails({ blockHash })
  }

  renderSearch = () => {
    return(
      <div className="mb-4">
        <h1 className="title">Block Information</h1>
        <div className="field has-addons is-12">
          <div className="control is-expanded">
            <input value={this.state.blockHash}
              onChange={this.onChangeSearchValue}
              ref={this.searchBlockInputRef}
              className="input is-rounded is-large"
              type="text"
              placeholder="block hash"
            />
          </div>
          <div className="control">
            <a className="button is-link is-large" onClick={this.onSearchBlock}>
              Search
            </a>
          </div>
        </div>
      </div>
    )
  }

  render(){
    return (
      <div className="box">
        {this.renderSearch()}
        <div className="columns">
          <div className="column">
            <MemoizedInfoComponent {...this.state} />
          </div>
        </div>
          <MemoizedInfoViaHashesComponent {...this.state} onClickHash={this.getAndUpdateBlockHash} />
      </div>      
    );
    
  }
}

const mapDispatchToProps = dispatch => {
	return {
    updateErrorState: (args) => {
      dispatch(updateErrorState(args));
    },
    updateBlockHash: (args) => {
      dispatch(updateBlockHash(args));
    },
  };
};

const mapStateToProps = state => {
	return {
    blockHash: state.BlockReducer.blockHash,
		clientError: state.AppReducer.clientError,
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Block);
