import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import { GrpcManager } from '../../managers';
import { updateErrorState, updateAddress, RootState } from '../../redux';

import { AddressTxInfo } from './components/AddressTxInfo';
import { Transaction, MempoolTransaction, UnspentOutput, SlpTokenMetadata } from '../../protos/bchrpc_pb';


interface AddressTxInfoState {
    conf: Array<Transaction>,
    unconf: Array<MempoolTransaction>,
}

interface UTXOListInfoState {
    outputsList: Array<UnspentOutput>,
    tokenMetadataList: Array<SlpTokenMetadata>,
}

const initialAddressTxState: AddressTxInfoState = {
    conf: [],
    unconf: []
};

const initialUTXOListState: UTXOListInfoState = {
    outputsList: [],
    tokenMetadataList: []
};

const localAddressState = {
    addr: ""
}

/**
 * Fetch the value of address from the redux store.
 */
const addressSelector = createSelector(
    (state: RootState) => state.AddressReducer,
    AddressReducer => AddressReducer.address
)

const Address = () => {
  const [localAddress, setLocalAddress] = useState(localAddressState);
  const [txList, setTransactionsListState] = useState(initialAddressTxState);
  const [utxoList, setUTXOListState] = useState(initialUTXOListState);
  const dispatch = useDispatch();
  const searchAddressInputRef = useRef<any>(null);
  const addr = useSelector(addressSelector)

  /**
   * Acts as ComponentDidMount, tries to fetch blockdetails if addr is defined.
   */
  useEffect(() => {
    addr && fetchAddressTxDetails({ address: addr })
    addr && fetchAddressUTXODetails({ address: addr })
  // eslint-disable-next-line
  }, [])

  /**
   * Acts as ComponentWillReceiveProps, listens to changes to addr and calls `fetchAddressTxDetails`
   * as well as `fetchAddressUTXODetails` if the value is changed.
   */
  useEffect(() => {
    fetchAddressTxDetails({ address: addr })
    fetchAddressUTXODetails({ address: addr })
  // eslint-disable-next-line
  }, [addr])

  /**
   * 
   * @param params{address}: Expects a address and makes an RPC call to update the details
   * using the setState method which later updates children components.
   */
  const fetchAddressTxDetails = ({ address }) => {
    //GrpcManager.Instance.getAddressUtxos

    GrpcManager.Instance.getAddressTransactions({ address, height: 655653 })
    .then((res) => {
        // Convert the address from base64 to hex.\
        console.log(res)
        const conf = res.getConfirmedTransactionsList()
        const unconf = res.getUnconfirmedTransactionsList()
        
        setTransactionsListState({
            conf: conf || initialAddressTxState.conf,
            unconf: unconf || initialAddressTxState.unconf
        })
    
    }).catch((err) => {
      console.log("[ERR] fetchAddressTxDetails: ", err)
      setTransactionsListState({ ...initialAddressTxState })
      dispatch(updateErrorState({clientError: JSON.stringify(err)}))
    })
  }

    /**
   * 
   * @param params{address}: Expects a address and makes an RPC call to update the details
   * using the setState method which later updates children components.
   */
  const fetchAddressUTXODetails = ({ address }) => {
    GrpcManager.Instance.getAddressUtxos({ address, includeMempool: true })
    .then((res) => {
      const outputsList = res.getOutputsList()
      const tokenMetadataList = res.getTokenMetadataList()

      setUTXOListState({
        outputsList: outputsList || initialUTXOListState.outputsList,
        tokenMetadataList: tokenMetadataList || initialUTXOListState.tokenMetadataList
      })
    }).catch((err) => {
      console.log("[ERR] fetchAddressUTXODetails: ", err)
      setUTXOListState({ ...initialUTXOListState })
      dispatch(updateErrorState({clientError: JSON.stringify(err)}))
    })
  }


  /**
   * When search button is triggered, this method is responsible for updating the address in the
   * redux store as well as fetching the details about the block.
   */
  const onSearchAddress = () => {
    const ref = searchAddressInputRef.current
    if (ref?.value){
      const address = ref.value;
      fetchAddressTxDetails({ address })
      fetchAddressUTXODetails({ address })
      dispatch(updateAddress({ address }))
    }
  }

  /**
  * Updates the state of address and maintains a text on the searching area.
  * The value of `<input>` is derived from the address state.
  * @param event : Default event handler.
  */
  const onChangeSearchValue = (event) => {
    const { value }  = event.target
    // @ts-ignore
    setLocalAddress({ address: value })
  }

  /**
   * Gets the value from the callback functions defined in the memoized components.
   * 
   * @param address : Expects a block hash and makes an RPC call from via the client.
   * The returned data is then used to update local state to be displayed later.
   */
  const onClickMetaData = (address) => {
    fetchAddressTxDetails({ address })
    fetchAddressUTXODetails({ address })
  }

  const renderSearch = () => {  
    return(
      <div className="mb-4">
        <h1 className="title">Address Information</h1>
        <div className="field has-addons is-12">
          <div className="control is-expanded">
            <input
              value={localAddress.addr}
              onChange={onChangeSearchValue}
              ref={searchAddressInputRef}
              className="input is-large"
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="control">
            <a className="button is-link is-large" onClick={onSearchAddress}>
              Search
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      {renderSearch()}
      <div className="columns">
        <div className="column">
          <AddressTxInfo {...txList} onClickMetaData={onClickMetaData} />
        </div>
      </div>
    </div>      
  );


}

export default Address