import React from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import { updateErrorState } from '../../redux';
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

function InfoViaHashes({ hash, previousBlock, merkleRoot, nextBlockHash }
  : {  hash: Uint8Array | string | undefined,
    previousBlock: Uint8Array | string | undefined,
    merkleRoot: Uint8Array | string | undefined,
    nextBlockHash: Uint8Array | string | undefined
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
          <div className="content">{previousBlock}</div>
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
          <div className="content">{nextBlockHash}</div>
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
   client_error: string | null
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
  searchHashVal: string | undefined
}


class BlockchainInfo extends React.PureComponent<BlockInfoProps, BlockInfoState>{

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
      searchHashVal: ""
    }
  }

  componentDidMount(){
    this.fetchBlockDetails({ hashHex: null })
  }

  fetchBlockDetails = ({ hashHex }) => {
    const { client, updateErrorState } = this.props;
    // 000000000000000001de837b02cdd96e4632eb42059fcb041441a8c32ffc342c
    console.log(hashHex)
    client && hashHex && client.getBlock({ hashHex }).then((res) => {
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
        console.log(err)
        updateErrorState({client_error: JSON.stringify(err)})
      })
  }

  onSearchBlock = () => {
    const ref = this.searchBlockInputRef.current
    this.fetchBlockDetails({ hashHex: ref.value })
  }

  onChangeSearchVal = (event) => {
    const {value}  = event.target
    this.setState(() => {return { searchHashVal: value }})
  }

  renderSearch = () => {
    return(
      <div className="mb-4">
        <h1 className="title">Block Information</h1>
        <div className="field has-addons is-12">
          <div className="control is-expanded">
            <input value={this.state.searchHashVal} onChange={this.onChangeSearchVal} ref={this.searchBlockInputRef} className="input is-rounded is-large" type="text" placeholder="block hash"/>
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

  // Need to perform the check for `client_error` because once the component is rendered,
  // react tries to rerender/perform life cycles when any(the one component listens to) prop updates
  // and in the parent component we have added a statement to render undefined/some other 
  // component when the value of `client_error` changes. If you remove the check you might see
  // a warning like this:
  // Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  render(){
    // const { client_error } = this.props;
    // if (client_error !== null){
    //   return <div></div>
    // }
    return (
      <div className="box">
        {this.renderSearch()}
        <div className="columns">
          <div className="column ">
            <MemoizedInfoComponent {...this.state} />
          </div>
        </div>
          <MemoizedInfoViaHashesComponent {...this.state} />
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
