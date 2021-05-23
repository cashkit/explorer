// Inspired from https://github.com/2qx/grpc-bchrpc-browser

import * as grpcWeb from "grpc-web";
import * as bchrpc from "../../protos/bchrpc_pb";
import * as bchrpc_pb_service from "../../protos/BchrpcServiceClientPb";
import * as util from "../../utils";
import { BASE_URL } from "../../configs";


export default class GrpcManager{

    public client: bchrpc_pb_service.bchrpcClient;

    private static classInstance?: GrpcManager;

    /**
     * Create a client.
     * @param url - The bchd server expressed as host:port.
     * @param testnet - Whether testnet is being used, default:false.
     * @param options - grpc client options.
     */
    private constructor({ url, testnet = false, options = null }:
        { url?: string; testnet?: boolean; options: null | { [index: string]: string; } }) {
        if (typeof url === 'string') {
            // pass
        } else {
            url = "http://localhost:8080";
        }
        if (!options) {
            options = {
                "grpc.max_receive_message_length": "-1", // unlimited
            };
        }
        this.client = new bchrpc_pb_service.bchrpcClient(url, null, options);
    }

    /**
     * Initiates the GrpcManager instance.
     * @param params { url, testnet, options }
     */
    public static Init(params) {
      if (!this.classInstance) {
        this.classInstance = new GrpcManager(params);
      }
    }

    /**
     * Force reset the instance of the GrpcManager.
     * @param params { url, testnet, options }
     * @returns instance
     */
    public static resetInstance(params) {
      if (params) {
        this.classInstance = new GrpcManager(params);
        return this.classInstance
      } else {
        throw("No instance available for GrpcManager, try calling \
        GrpcManager.getInstance({ url, testnet, options }). ")
      }
    }

    /**
     * Get the instance of the GrpcManager using GrpcManager.Instance
     */
    public static get Instance() {
      if (!this.classInstance) {
        throw("No instance available for GrpcManager, try calling \
        GrpcManager.getInstance({ url, testnet, options }). ")
      }
      return this.classInstance;
    }
    

    /**
     * Get information about transactions in mempool
     */
    public getMempoolInfo(): Promise<bchrpc.GetMempoolInfoResponse> {
        return new Promise((resolve, reject) => {
            this.client.getMempoolInfo(
                new bchrpc.GetMempoolInfoRequest(),
                null,
                (err: grpcWeb.Error, response: bchrpc.GetMempoolInfoResponse) => {
                    if (err !== null) { reject(err); } else {
                        resolve(response!);
                    }
                }
            );
        });
    }

    /**
     * Get transactions from mempool
     * @param fullTransactions - A flag to return full transaction data. Default is `false`, only transaction hashes are returned.
     */
    public getMempool(
        { fullTransactions }: { fullTransactions?: boolean }
    ): Promise<bchrpc.GetMempoolResponse> {
        const req = new bchrpc.GetMempoolRequest();
        if (fullTransactions) {
            req.setFullTransactions(fullTransactions);
        }
        return new Promise((resolve, reject) => {
            this.client.getMempool(
                req,
                null,
                (err: grpcWeb.Error, response: bchrpc.GetMempoolResponse) => {
                    if (err !== null) { reject(err); } else { resolve(response!); }
                }
            );
        });
    }

    /**
     * Get a raw transaction
     * @param hash - the hash, in either a base64 encoded string or byte array, little-endian.
     * @param hashHex - the hash as a big-endian hexadecimal encoded string, sill be overridden by hash if provided.
     */
    public getRawTransaction(
        { hash, hashHex }:
            { hash?: string | Uint8Array; hashHex?: string }
    ): Promise<bchrpc.GetRawTransactionResponse> {
        const req = new bchrpc.GetRawTransactionRequest();
        if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        } else if (hash) {
            req.setHash(hash);
        } else {
            throw Error("No hash provided for transaction");
        }

        return new Promise((resolve, reject) => {
            this.client.getRawTransaction(req, null, (err: grpcWeb.Error, response: bchrpc.GetRawTransactionResponse) => {
                if (err !== null) { reject(err); } else { resolve(response!); }
            });
        });
    }

    /**
     * Get a transaction
     * @param hash - the hash, expressed in little-endian in either a base64 encoded string or byte array.
     * @param hashHex - the hash as a big-endian hexadecimal encoded string, will be overridden by hash, if provided.
     */
    public getTransaction(
        { hash, hashHex }:
            { hash?: string | Uint8Array; hashHex?: string }
    ): Promise<bchrpc.GetTransactionResponse> {
        const req = new bchrpc.GetTransactionRequest();
        if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        } else if (hash) {
            req.setHash(hash);
        } else {
            throw Error("No hash provided for transaction");
        }
        return new Promise((resolve, reject) => {
            this.client.getTransaction(req, null, (err: grpcWeb.Error, response: bchrpc.GetTransactionResponse) => {
                if (err !== null) { reject(err); } else { resolve(response!); }
            });
        });
    }


    /**
     * Get block header information
     * @param blockLocatorHashes - Sparse list of hashes known to the client.
     * @param stopHash -Last block hash to return.
     */
    public getHeaders({ blockLocatorHashes, stopHash }:
        {
            blockLocatorHashes?: (string | Uint8Array)[],
            stopHash?: string
        }
    ): Promise<bchrpc.GetHeadersResponse> {
        const req = new bchrpc.GetHeadersRequest();
        if (blockLocatorHashes) {
            req.setBlockLocatorHashesList(blockLocatorHashes);
        }
        if (stopHash) {
            req.setStopHash(stopHash);
        }
        return new Promise((resolve, reject) => {
            this.client.getHeaders(req, null, (err: grpcWeb.Error, response: bchrpc.GetHeadersResponse) => {
                if (err !== null) { reject(err); } else { resolve(response!); }
            });
        });
    }

    /**
     * Get transactions related to a particular address
     * @param address - Bitcoin cash address in casharr format.
     * @param nbSkip - Number of transactions to skip, in chronological order.
     * @param nbFetch - Number of transactions return.
     * @param height - Filter to only return transactions after this block number.
     * @param hash - the hash, expressed in little-endian in either a base64 encoded string or byte array.
     * @param hashHex - the hash as a big-endian hexadecimal encoded string, will be overridden by `hash`, if provided.
     */
    public getAddressTransactions({ address, nbSkip, nbFetch, height, hashHex }:
        {
            address: string,
            nbSkip?: number,
            nbFetch?: number,
            height?: number,
            hashHex?: string
        }
    ): Promise<bchrpc.GetAddressTransactionsResponse> {
        const req = new bchrpc.GetAddressTransactionsRequest();
        if (nbSkip) {
            req.setNbSkip(nbSkip);
        }
        if (nbFetch) {
            req.setNbFetch(nbFetch);
        }
        if (height) {
            req.setHeight(height);
        }
        if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        }
        req.setAddress(address);
        return new Promise((resolve, reject) => {
            this.client.getAddressTransactions(req, null, (err: grpcWeb.Error, response: bchrpc.GetAddressTransactionsResponse) => {
                if (err !== null) { reject(err); } else { resolve(response!); }
            });
        });
    }

    public getUnspentOutput(
        { hash, hashHex, vout, includeMempool }:
            {
                hash?: string | Uint8Array, hashHex?: string, vout: number,
                includeMempool?: boolean
            }
    ): Promise<bchrpc.GetUnspentOutputResponse> {
        const req = new bchrpc.GetUnspentOutputRequest();
        if (includeMempool) {
            req.setIncludeMempool(true);
        }
        if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        } else if (hash) {
            req.setHash(hash);
        }
        req.setIndex(vout);
        return new Promise((resolve, reject) => {
            this.client.getUnspentOutput(req, null, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    /**
     * Retrieve merkle (SPV) proof that the given transaction is in the provided block.
     * @param hash - the tx hash, in either a 'base64' encoded string or byte array, little-endian.
     * @param hashHex - the tx hash as a big-endian 'hex' encoded string, will be overridden by hash if also provided.
     */
    public getMerkleProof(
        { hash, hashHex }:
            {
                hash?: string | Uint8Array, hashHex?: string
            }
    ): Promise<bchrpc.GetMerkleProofResponse> {
        const req = new bchrpc.GetMerkleProofRequest();
        if (hashHex) {
            req.setTransactionHash(util.hexToU8(hashHex).reverse());
        } else if (hash) {
            req.setTransactionHash(hash);
        }
        return new Promise((resolve, reject) => {
            this.client.getMerkleProof(req, null, (err, data) => {
                if (err !== null) { reject(err); } else { resolve(data!); }
            });
        });
    }

    public getAddressUtxos(
        { address, includeMempool }:
            { address: string, includeMempool: boolean }
    ): Promise<bchrpc.GetAddressUnspentOutputsResponse> {
        const req = new bchrpc.GetAddressUnspentOutputsRequest();
        req.setAddress(address);
        if (includeMempool) {
            req.setIncludeMempool(true);
        }
        return new Promise((resolve, reject) => {
            this.client.getAddressUnspentOutputs(req, null, (err, response) => {
                if (err !== null) { reject(err); } else { resolve(response!); }
            });
        });
    }

    /**
     * Retrieve raw block from a hash
     * @param hash - the hash, in either a 'base64' encoded string or byte array, little-endian.
     * @param hashHex - the hash as a big-endian 'hex' encoded string, will be overridden by hash if also provided.
     */
    public getRawBlock(
        { hash, hashHex }:
            { hash?: string | Uint8Array, hashHex?: string },
    ): Promise<bchrpc.GetRawBlockResponse> {
        const req = new bchrpc.GetRawBlockRequest();
        if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        } else if (hash) {
            req.setHash(hash);
        } else {
            throw Error("No hash provided for raw block request");
        }
        return new Promise((resolve, reject) => {
            this.client.getRawBlock(req, null, (err, response) => {
                if (err !== null) { reject(err); } else { resolve(response!); }
            });
        });
    }


    /**
     * Retrieve block info given a block number or hash
     * @param index - the block number to be retrieved.
     * @param hash - the hash, in either a 'base64' encoded string or byte array, little-endian.
     * @param hashHex - the hash as a big-endian 'hex' encoded string, will be overridden by hash if also provided.
     * @param fullTransactions - a flag to return full transaction data, by defult `false` only transaction hashes are returned.
     */
    public getBlock(
        { index, hash, hashHex, fullTransactions }:
            { index?: number, hash?: string | Uint8Array, hashHex?: string, fullTransactions?: boolean }
    ): Promise<bchrpc.GetBlockResponse> {
        const req = new bchrpc.GetBlockRequest();
        if (index !== null && index !== undefined) {
            req.setHeight(index);
        } else if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        } else if (hash) {
            req.setHash(hash);
        } else {
            throw Error("No index or hash provided for block");
        }
        if (fullTransactions) {
            req.setFullTransactions(true);
        }
        return new Promise((resolve, reject) => {
            this.client.getBlock(req, null, (err, response) => {
                if (err !== null) { reject(err); } else { resolve(response!); }
            });
        });
    }


    /**
     * Retrieve block filter given a block number or hash
     * @param height - the block number index to be retrieved.
     * @param hash - the hash, expressed in little-endian in either a base64 encoded string or byte array.
     * @param hashHex - the hash as a big-endian 'hex' encoded string, will be overridden a hash if provided.
     */
    public getBlockFilter(
        { height, hash, hashHex }:
            { height?: number, hash?: string | Uint8Array, hashHex?: string }
    ): Promise<bchrpc.GetBlockFilterResponse> {
        const req = new bchrpc.GetBlockInfoRequest();
        if (height !== null && height !== undefined) { req.setHeight(height); } else if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        } else if (hash) {
            req.setHash(hash);
        }
        return new Promise((resolve, reject) => {
            this.client.getBlockFilter(req, null, (err, response) => {
                if (err !== null) { reject(err); } else { resolve(response!); }
            });
        });
    }

    /**
     * Retrieve block info given a block number or hash
     * @param height - the block number index to be retrieved.
     * @param hash - the hash, expressed in little-endian in either a base64 encoded string or byte array.
     * @param hashHex - the hash as a big-endian 'hex' encoded string, will be overridden a hash if provided.
     */
    public getBlockInfo(
        { height, hash, hashHex }:
            { height?: number, hash?: string | Uint8Array, hashHex?: string }
    ): Promise<bchrpc.GetBlockInfoResponse> {
        const req = new bchrpc.GetBlockInfoRequest();
        if (height !== null && height !== undefined) { req.setHeight(height); } else if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        } else if (hash) {
            req.setHash(hash);
        }
        return new Promise((resolve, reject) => {
            this.client.getBlockInfo(req, null, (err, response) => {
                if (err !== null) { reject(err); } else { resolve(response!); }
            });
        });
    }

    /**
     * Retrieve block info for the network, network state and host node.
     */
    public getBlockchainInfo(
        
    ): Promise<bchrpc.GetBlockchainInfoResponse> {
        return new Promise((resolve, reject) => {
            this.client.getBlockchainInfo(new bchrpc.GetBlockchainInfoRequest(), null, (err, response) => {
                if (err !== null) { reject(err); } else { resolve(response!); }
            });
        });
    }



    /**
     * @param includeMempoolAcceptance - If true, new unconfirmed transactions from mempool are included apart from the ones confirmed in a block.
     * @param includeBlockAcceptance - If true, transactions are included when they are confirmed. This notification is sent in addition to any requested mempool notifications.
     * @param includeSerializedTxn - If true, transactions are serialized using bitcoin protocol encoding. Default is false, transaction will be Marshaled.
     * @param filter - Transaction filter
     * @param subscribeAllTransactions - If true, a filter will be constructed that captures all transactions
     * @param unsubscribe - NOT IMPLEMENTED, see ClientReadableStream.cancel()
     */
    public subscribeTransactions = ({ includeMempoolAcceptance,
        includeBlockAcceptance,
        includeSerializedTxn,
        transactionFilter,
        unsubscribe }:
        {
            includeMempoolAcceptance?: boolean, includeBlockAcceptance?: boolean, includeSerializedTxn?: boolean,
            transactionFilter?: bchrpc.TransactionFilter, unsubscribe?: boolean
        },
    ): Promise<grpcWeb.ClientReadableStream<bchrpc.TransactionNotification>> => {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.SubscribeTransactionsRequest();
            includeMempoolAcceptance ? req.setIncludeMempool(true) : req.setIncludeMempool(false);
            includeBlockAcceptance ? req.setIncludeInBlock(true) : req.setIncludeInBlock(false);
            includeSerializedTxn ? req.setSerializeTx(true) : req.setSerializeTx(false);
            if(transactionFilter){
                transactionFilter.setAllTransactions(false)
                req.setSubscribe(transactionFilter)
            }else{
                const defaultFilter = new bchrpc.TransactionFilter();
                defaultFilter.setAllTransactions(true)
                req.setSubscribe(defaultFilter)
            }
            if(unsubscribe){
                throw new Error('Unsubscribing is not currently (2020) possible on grpc-web, see grpc-web ClientReadableStream.cancel()');
            }
            try {
                // @ts-ignore
                resolve(this.client.subscribeTransactions(req));
            } catch (err) {
                reject(err);
            }


        });
    }


    // public subscribeBlocks({ includeSerializedBlock, includeTxnHashes, includeTxnData }:
    //     { includeSerializedBlock?: boolean, includeTxnHashes?: boolean, includeTxnData?: boolean },
    // ): Promise<grpcWeb.ClientReadableStream<bchrpc.BlockNotification>> {
    //     return new Promise((resolve, reject) => {
    //         const req = new bchrpc.SubscribeBlocksRequest();
    //         includeTxnHashes ? req.setFullBlock(true) : req.setFullBlock(false);
    //         includeTxnData ? req.setFullTransactions(true) : req.setFullTransactions(false);
    //         includeSerializedBlock ? req.setSerializeBlock(true) : req.setSerializeBlock(false);
    //         try {
    //             resolve(this.client.subscribeBlocks(req));
    //         } catch (err) {
    //             reject(err);
    //         }
    //     });
    // }

    // public submitTransaction(
    //     { txnHex, txn }: { txnHex?: string, txn?: Uint8Array }
    // ): Promise<bchrpc.SubmitTransactionResponse> {
    //     let tx: string | Uint8Array;
    //     const req = new bchrpc.SubmitTransactionRequest();
    //     if (txnHex) {
    //         tx = util.hexToU8(txnHex);
    //     } else if (txn) {
    //         tx = txn;
    //     } else {
    //         throw Error("Most provide either Hex string or Uint8Array");
    //     }
    //     req.setTransaction(tx);
    //     return new Promise((resolve, reject) => {
    //         this.client.submitTransaction(req, null, (err, response) => {
    //             if (err !== null) { reject(err); } else { resolve(response!); }
    //         });
    //     });
    // }

}

  