import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import { GrpcManager } from '../../managers';
import { updateErrorState, updateBlockHash, RootState } from '../../redux';
import { base64toU8, u8toHex } from '../../utils';

import { MemoizedInfoComponent } from './components/BlockInfo';
import { MemoizedInfoViaHashesComponent } from './components/BlockInfoViaHashes';


const initialState = {
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
};

const initialBlockHashState = {
  blockHash: "",
};


/**
 * Fetch the value of blockHash from the redux store.
 */
const blockHashSelector = createSelector(
    (state: RootState) => state.BlockReducer,
    BlockReducer => BlockReducer.blockHash
)

interface BlockProps {
  hidden: boolean
}

const Block = (props: BlockProps) => {
  const [blockHashState, setLocalBlockHash] = useState(initialBlockHashState);
  const [blockState, setBlockState] = useState(initialState);
  const dispatch = useDispatch();
  const searchBlockInputRef = useRef<any>(null);
  const resHash = useSelector(blockHashSelector)

  /**
   * Acts as ComponentDidMount, tries to fetch blockdetails if resHash is defined.
   */
  useEffect(() => {
    resHash && fetchBlockDetails({ blockHash: resHash })
  // eslint-disable-next-line
  }, [])

  /**
   * Acts as ComponentWillReceiveProps, listens to changes to resHash and calls `fetchBlockDetails`
   * if the value is changed.
   */
  useEffect(() => {
    fetchBlockDetails({ blockHash: resHash })
  // eslint-disable-next-line
  }, [resHash])

  /**
   * 
   * @param params{BlockHash}: Expects a blockHash and makes an RPC call to update the details
   * using the setState method which later updates children components.
   */
  const fetchBlockDetails = ({ blockHash }) => {
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

        setBlockState({
          height: block.info?.height || initialState.height,
          hash: blockHash || initialState.hash,
          version: block.info?.version || initialState.version,
          previousBlock: previousBlock || initialState.previousBlock,
          merkleRoot: merkleRoot || initialState.merkleRoot,
          timestamp: block.info?.timestamp || initialState.timestamp,
          bits: block.info?.bits || initialState.bits,
          nonce: block.info?.nonce || initialState.nonce,
          confirmations: block.info?.confirmations || initialState.confirmations,
          difficulty: block.info?.difficulty || initialState.difficulty,
          nextBlockHash: nextBlockHash || initialState.nextBlockHash,
          size: block.info?.size || initialState.size,
          medianTime: block.info?.medianTime || initialState.medianTime,
          transactions: transactions || initialState.transactions,
        })
        setLocalBlockHash({
          blockHash: blockHash || initialState.hash,
        })

      }
    }).catch((err) => {
      console.log("[ERR] fetchBlockDetails: ", err)
      setBlockState({ ...initialState })
      dispatch(updateErrorState({clientError: JSON.stringify(err)}))
    })
  }


  /**
   * When search button is triggered, this method is responsible for updating the blockhash in the
   * redux store as well as fetching the details about the block.
   */
  const onSearchBlock = () => {
    const ref = searchBlockInputRef.current
    if (ref?.value){
      dispatch(updateBlockHash({ blockHash: ref.value }))
    }
  }

  /**
  * Updates the state of blockHash and maintains a text on the searching area.
  * The value of `<input>` is derived from the blockHash state.
  * @param event : Default event handler.
  */
  const onChangeSearchValue = (event) => {
    const { value }  = event.target
    setLocalBlockHash({ blockHash: value })
  }

  /**
   * Gets the value from the callback functions defined in the memoized components.
   * 
   * @param blockHash : Expects a block hash and makes an RPC call from via the client.
   * The returned data is then used to update local state to be displayed later.
   */
  const getAndUpdateBlockHash = (blockHash) => {
    fetchBlockDetails({ blockHash })
  }

  const renderSearch = () => {  
    return(
      <div className="mb-4">
        <h1 className="title">Block Information</h1>
        <div className="field has-addons is-12">
          <div className="control is-expanded">
            <input
              value={blockHashState.blockHash}
              onChange={onChangeSearchValue}
              ref={searchBlockInputRef}
              className="input is-large"
              type="text"
              placeholder="block hash"
            />
          </div>
          <div className="control">
            <a className="button is-link is-large" onClick={onSearchBlock}>
              Search
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (props.hidden) return <div/>

  return (
    <div className="section">
      {renderSearch()}
      <div className="columns">
        <div className="column">
          <MemoizedInfoComponent {...blockState} />
        </div>
      </div>
        <MemoizedInfoViaHashesComponent {...blockState} onClickBlockHash={getAndUpdateBlockHash} />
    </div>      
  );


}

export default Block