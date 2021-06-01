import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { GrpcManager } from '../../managers';
import { updateErrorState } from '../../redux';

import { AddressUTXOInfo } from './components/AddressUTXOInfo';
import { UnspentOutput, SlpTokenMetadata } from '../../protos/bchrpc_pb';


interface UTXOListInfoState {
    outputsList: Array<UnspentOutput>,
    tokenMetadataList: Array<SlpTokenMetadata>,
}

const initialUTXOListState: UTXOListInfoState = {
    outputsList: [],
    tokenMetadataList: []
};

interface AddressUTXOProps {
  address: string
}

const AddressUTXO = (props: AddressUTXOProps) => {
  const { address } = props
  const [utxoList, setUTXOListState] = useState(initialUTXOListState);
  const dispatch = useDispatch();

  /**
   * Acts as ComponentDidMount, tries to fetch blockdetails if address is valid.
   */
  useEffect(() => {
    if (address && address != "") {
      fetchAddressUTXODetails({ address })
    }
  // eslint-disable-next-line
  }, [])

  /**
   * Acts as ComponentWillReceiveProps, listens to changes to addr and calls 
   * `fetchAddressUTXODetails` if the value is changed/updated.
   */
  useEffect(() => {
    address && fetchAddressUTXODetails({ address })
  // eslint-disable-next-line
  }, [address])


    /**
   * 
   * @param params{address}: Expects a address and makes an RPC call to update the details
   * using the setState method which later updates children components.
   */
  const fetchAddressUTXODetails = ({ address }) => {
    // TODO: Remove the hard coded `true` value for includeMempool
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
   * Gets the value from the callback functions defined in the memoized components.
   * 
   * @param address : Expects a block hash and makes an RPC call from via the client.
   * The returned data is then used to update local state to be displayed later.
   */
  const onClickMetaData = (address) => {
    fetchAddressUTXODetails({ address })
  }

  return (
    <div className="">
      <div className="columns">
        <div className="column">
          <AddressUTXOInfo {...utxoList} onClickMetaData={onClickMetaData} />
        </div>
      </div>
    </div>      
  );
}


function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  if (prevProps.address == nextProps.address){
   return true
  }
  return false
}

const MemoizedAddressUTXO = React.memo(AddressUTXO, areEqual);

export default MemoizedAddressUTXO