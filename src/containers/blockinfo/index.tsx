import React from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import { updateErrorState, updateBlockHash } from '../../redux';
import { base64toU8, u8toHex } from '../../utils';


function InfoComponent({ height, version, timestamp, bits, nonce,
  confirmations, difficulty, size, medianTime, transactions }
  :  { height: number | undefined | undefined,
  version: number | undefined,
  timestamp: number | undefined,
  bits: number | undefined,
  nonce: number | undefined,
  confirmations: number | undefined,
  difficulty: number | undefined,
  size: number | undefined,
  medianTime: number | undefined,
  transactions: number | false | undefined
 }) {
return(
  <>
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left">
          <p className="is-size-4 has-text-weight-medium">Height</p>
          <div className="content">{height}</div>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left">
          <p className="is-size-4 has-text-weight-medium">Version</p>
          <div className="content">{version}</div>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left">
          <p className="is-size-4 has-text-weight-medium">Difficulty</p>
          <div className="content">{difficulty}</div>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left">
          <p className="is-size-4 has-text-weight-medium">Timestamp</p>
          <div className="content">{timestamp}</div>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left">
          <p className="is-size-4 has-text-weight-medium">Bits</p>
          <div className="content">{bits}</div>
        </article>
      </div>
    </div>

    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left">
          <p className="is-size-4 has-text-weight-medium">Nonce</p>
          <div className="content">{nonce}</div>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left">
          <p className="is-size-4 has-text-weight-medium">Confirmations</p>
          <div className="content">{confirmations}</div>
        </article>
      </div>

      <div className="tile is-parent">
        <article className="tile is-child box has-text-left">
          <p className="is-size-4 has-text-weight-medium">Size</p>
          <div className="content">{size}</div>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left">
          <p className="is-size-4 has-text-weight-medium">Median Time</p>
          <div className="content">{medianTime}</div>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left">
          <p className="is-size-4 has-text-weight-medium">Total Transactions</p>
          <div className="content">{transactions}</div>
        </article>
      </div>
    </div>
    </>
  )
}

function InfoViaHashes({ hash, previousBlock, merkleRoot, nextBlockHash, onClickHash }
  : {  hash: Uint8Array | string | undefined,
    previousBlock: Uint8Array | string | undefined,
    merkleRoot: Uint8Array | string | undefined,
    nextBlockHash: Uint8Array | string | undefined,
    onClickHash: (blockHash: Uint8Array | string | undefined) => void,
  }) {
return(
  <>
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left  is-info">
          <p className="is-size-4 has-text-weight-medium">Block Hash</p>
          <div className="content">{hash}</div>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left  is-info">
          <p className="is-size-4 has-text-weight-medium">Previous Block</p>
          <a className="content" onClick={() => onClickHash(previousBlock)}>{previousBlock}</a>
        </article>
      </div>
    </div>
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left  is-info">
          <p className="is-size-4 has-text-weight-medium">Merkle Root</p>
          <div className="content">{merkleRoot}</div>
        </article>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box has-text-left  is-info">
          <p className="is-size-4 has-text-weight-medium">Next Block Hash</p>
          <a className="content" onClick={() => onClickHash(nextBlockHash)}>{nextBlockHash}</a>
        </article>
      </div>
    </div>
  </>
  )
}

/**
 * From React Docs:
 * If your component renders the same result given the same props,
 * you can wrap it in a call to React.memo for a performance boost
 * in some cases by memoizing the result. This means that React will
 * skip rendering the component, and reuse the last rendered result.
 */
const MemoizedInfoComponent = React.memo(InfoComponent);
const MemoizedInfoViaHashesComponent = React.memo(InfoViaHashes);


interface BlockInfoProps {
   client: GrpcManager,
   updateErrorState: ({}) => void,
   updateBlockHash: ({}) => void,
   blockHash: string | null,
   clientError: string | null
}

interface BlockInfoState {
  hash: Uint8Array | string | undefined,
  height: number | undefined | undefined,
  version: number | undefined,
  previousBlock: Uint8Array | string | undefined,
  merkleRoot: Uint8Array | string | undefined,
  timestamp: number | undefined,
  bits: number | undefined,
  nonce: number | undefined,
  confirmations: number | undefined,
  difficulty: number | undefined,
  nextBlockHash: Uint8Array | string | undefined,
  size: number | undefined,
  medianTime: number | undefined,
  transactions: number | false | undefined,
  blockHash: string | undefined
}


class BlockInfo extends React.PureComponent<BlockInfoProps, BlockInfoState>{

  searchBlockInputRef: React.RefObject<any>;

  constructor(props: BlockInfoProps){
    super(props)
    this.searchBlockInputRef = React.createRef();
    // Setting default values
    this.state ={
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
    }
  }

  componentDidMount(){
    this.fetchBlockDetails({ blockHash: null })
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

  fetchBlockDetails = ({ blockHash }) => {
    const { client, updateErrorState } = this.props;
    client && blockHash && client.getBlock({ hashHex: blockHash }).then((res) => {
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
            height: block.info?.height,
            hash: blockHash,
            version: block.info?.version,
            previousBlock: previousBlock,
            merkleRoot: merkleRoot,
            timestamp: block.info?.timestamp,
            bits: block.info?.bits,
            nonce: block.info?.nonce,
            confirmations: block.info?.confirmations,
            difficulty: block.info?.difficulty,
            nextBlockHash: nextBlockHash,
            size: block.info?.size,
            medianTime: block.info?.medianTime,
            transactions: transactions
          })
        }
      }).catch((err) => {
        console.log("[ERR] fetchBlockDetails: ", err)
        updateErrorState({clientError: JSON.stringify(err)})
      })
  }

  onSearchBlock = () => {
    const ref = this.searchBlockInputRef.current
    this.fetchBlockDetails({ blockHash: ref.value })
    this.props.updateBlockHash({ blockHash: ref.value })
  }

  onChangeSearchVal = (event) => {
    const {value}  = event.target
    this.setState(() => {return { blockHash: value }})
  }

  getAndUpdateBlockHash = (blockHash) => {
    this.fetchBlockDetails({ blockHash: blockHash })
  }

  renderSearch = () => {
    return(
      <div className="mb-4">
        <h1 className="title">Block Information</h1>
        <div className="field has-addons is-12">
          <div className="control is-expanded">
            <input value={this.state.blockHash}
              onChange={this.onChangeSearchVal}
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

  // Need to perform the check for `clientError` because once the component is rendered,
  // react tries to rerender/perform life cycles when any(the one component listens to) prop updates
  // and in the parent component we have added a statement to render undefined/some other 
  // component when the value of `clientError` changes. If you remove the check you might see
  // a warning like this:
  // Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
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
    client: state.AppReducer.client,
    blockHash: state.BlockReducer.blockHash,
		clientError: state.AppReducer.clientError,
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BlockInfo);
