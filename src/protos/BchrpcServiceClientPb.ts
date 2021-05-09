/**
 * @fileoverview gRPC-Web generated client stub for pb
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as bchrpc_pb from './bchrpc_pb';


export class bchrpcClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetMempoolInfo = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetMempoolInfoResponse,
    (request: bchrpc_pb.GetMempoolInfoRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetMempoolInfoResponse.deserializeBinary
  );

  getMempoolInfo(
    request: bchrpc_pb.GetMempoolInfoRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetMempoolInfoResponse>;

  getMempoolInfo(
    request: bchrpc_pb.GetMempoolInfoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetMempoolInfoResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetMempoolInfoResponse>;

  getMempoolInfo(
    request: bchrpc_pb.GetMempoolInfoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetMempoolInfoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetMempoolInfo',
        request,
        metadata || {},
        this.methodInfoGetMempoolInfo,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetMempoolInfo',
    request,
    metadata || {},
    this.methodInfoGetMempoolInfo);
  }

  methodInfoGetMempool = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetMempoolResponse,
    (request: bchrpc_pb.GetMempoolRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetMempoolResponse.deserializeBinary
  );

  getMempool(
    request: bchrpc_pb.GetMempoolRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetMempoolResponse>;

  getMempool(
    request: bchrpc_pb.GetMempoolRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetMempoolResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetMempoolResponse>;

  getMempool(
    request: bchrpc_pb.GetMempoolRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetMempoolResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetMempool',
        request,
        metadata || {},
        this.methodInfoGetMempool,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetMempool',
    request,
    metadata || {},
    this.methodInfoGetMempool);
  }

  methodInfoGetBlockchainInfo = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetBlockchainInfoResponse,
    (request: bchrpc_pb.GetBlockchainInfoRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetBlockchainInfoResponse.deserializeBinary
  );

  getBlockchainInfo(
    request: bchrpc_pb.GetBlockchainInfoRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetBlockchainInfoResponse>;

  getBlockchainInfo(
    request: bchrpc_pb.GetBlockchainInfoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetBlockchainInfoResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetBlockchainInfoResponse>;

  getBlockchainInfo(
    request: bchrpc_pb.GetBlockchainInfoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetBlockchainInfoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetBlockchainInfo',
        request,
        metadata || {},
        this.methodInfoGetBlockchainInfo,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetBlockchainInfo',
    request,
    metadata || {},
    this.methodInfoGetBlockchainInfo);
  }

  methodInfoGetBlockInfo = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetBlockInfoResponse,
    (request: bchrpc_pb.GetBlockInfoRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetBlockInfoResponse.deserializeBinary
  );

  getBlockInfo(
    request: bchrpc_pb.GetBlockInfoRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetBlockInfoResponse>;

  getBlockInfo(
    request: bchrpc_pb.GetBlockInfoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetBlockInfoResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetBlockInfoResponse>;

  getBlockInfo(
    request: bchrpc_pb.GetBlockInfoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetBlockInfoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetBlockInfo',
        request,
        metadata || {},
        this.methodInfoGetBlockInfo,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetBlockInfo',
    request,
    metadata || {},
    this.methodInfoGetBlockInfo);
  }

  methodInfoGetBlock = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetBlockResponse,
    (request: bchrpc_pb.GetBlockRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetBlockResponse.deserializeBinary
  );

  getBlock(
    request: bchrpc_pb.GetBlockRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetBlockResponse>;

  getBlock(
    request: bchrpc_pb.GetBlockRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetBlockResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetBlockResponse>;

  getBlock(
    request: bchrpc_pb.GetBlockRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetBlockResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetBlock',
        request,
        metadata || {},
        this.methodInfoGetBlock,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetBlock',
    request,
    metadata || {},
    this.methodInfoGetBlock);
  }

  methodInfoGetRawBlock = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetRawBlockResponse,
    (request: bchrpc_pb.GetRawBlockRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetRawBlockResponse.deserializeBinary
  );

  getRawBlock(
    request: bchrpc_pb.GetRawBlockRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetRawBlockResponse>;

  getRawBlock(
    request: bchrpc_pb.GetRawBlockRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetRawBlockResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetRawBlockResponse>;

  getRawBlock(
    request: bchrpc_pb.GetRawBlockRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetRawBlockResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetRawBlock',
        request,
        metadata || {},
        this.methodInfoGetRawBlock,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetRawBlock',
    request,
    metadata || {},
    this.methodInfoGetRawBlock);
  }

  methodInfoGetBlockFilter = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetBlockFilterResponse,
    (request: bchrpc_pb.GetBlockFilterRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetBlockFilterResponse.deserializeBinary
  );

  getBlockFilter(
    request: bchrpc_pb.GetBlockFilterRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetBlockFilterResponse>;

  getBlockFilter(
    request: bchrpc_pb.GetBlockFilterRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetBlockFilterResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetBlockFilterResponse>;

  getBlockFilter(
    request: bchrpc_pb.GetBlockFilterRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetBlockFilterResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetBlockFilter',
        request,
        metadata || {},
        this.methodInfoGetBlockFilter,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetBlockFilter',
    request,
    metadata || {},
    this.methodInfoGetBlockFilter);
  }

  methodInfoGetHeaders = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetHeadersResponse,
    (request: bchrpc_pb.GetHeadersRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetHeadersResponse.deserializeBinary
  );

  getHeaders(
    request: bchrpc_pb.GetHeadersRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetHeadersResponse>;

  getHeaders(
    request: bchrpc_pb.GetHeadersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetHeadersResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetHeadersResponse>;

  getHeaders(
    request: bchrpc_pb.GetHeadersRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetHeadersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetHeaders',
        request,
        metadata || {},
        this.methodInfoGetHeaders,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetHeaders',
    request,
    metadata || {},
    this.methodInfoGetHeaders);
  }

  methodInfoGetTransaction = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetTransactionResponse,
    (request: bchrpc_pb.GetTransactionRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetTransactionResponse.deserializeBinary
  );

  getTransaction(
    request: bchrpc_pb.GetTransactionRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetTransactionResponse>;

  getTransaction(
    request: bchrpc_pb.GetTransactionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetTransactionResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetTransactionResponse>;

  getTransaction(
    request: bchrpc_pb.GetTransactionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetTransactionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetTransaction',
        request,
        metadata || {},
        this.methodInfoGetTransaction,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetTransaction',
    request,
    metadata || {},
    this.methodInfoGetTransaction);
  }

  methodInfoGetRawTransaction = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetRawTransactionResponse,
    (request: bchrpc_pb.GetRawTransactionRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetRawTransactionResponse.deserializeBinary
  );

  getRawTransaction(
    request: bchrpc_pb.GetRawTransactionRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetRawTransactionResponse>;

  getRawTransaction(
    request: bchrpc_pb.GetRawTransactionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetRawTransactionResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetRawTransactionResponse>;

  getRawTransaction(
    request: bchrpc_pb.GetRawTransactionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetRawTransactionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetRawTransaction',
        request,
        metadata || {},
        this.methodInfoGetRawTransaction,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetRawTransaction',
    request,
    metadata || {},
    this.methodInfoGetRawTransaction);
  }

  methodInfoGetAddressTransactions = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetAddressTransactionsResponse,
    (request: bchrpc_pb.GetAddressTransactionsRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetAddressTransactionsResponse.deserializeBinary
  );

  getAddressTransactions(
    request: bchrpc_pb.GetAddressTransactionsRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetAddressTransactionsResponse>;

  getAddressTransactions(
    request: bchrpc_pb.GetAddressTransactionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetAddressTransactionsResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetAddressTransactionsResponse>;

  getAddressTransactions(
    request: bchrpc_pb.GetAddressTransactionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetAddressTransactionsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetAddressTransactions',
        request,
        metadata || {},
        this.methodInfoGetAddressTransactions,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetAddressTransactions',
    request,
    metadata || {},
    this.methodInfoGetAddressTransactions);
  }

  methodInfoGetRawAddressTransactions = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetRawAddressTransactionsResponse,
    (request: bchrpc_pb.GetRawAddressTransactionsRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetRawAddressTransactionsResponse.deserializeBinary
  );

  getRawAddressTransactions(
    request: bchrpc_pb.GetRawAddressTransactionsRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetRawAddressTransactionsResponse>;

  getRawAddressTransactions(
    request: bchrpc_pb.GetRawAddressTransactionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetRawAddressTransactionsResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetRawAddressTransactionsResponse>;

  getRawAddressTransactions(
    request: bchrpc_pb.GetRawAddressTransactionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetRawAddressTransactionsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetRawAddressTransactions',
        request,
        metadata || {},
        this.methodInfoGetRawAddressTransactions,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetRawAddressTransactions',
    request,
    metadata || {},
    this.methodInfoGetRawAddressTransactions);
  }

  methodInfoGetAddressUnspentOutputs = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetAddressUnspentOutputsResponse,
    (request: bchrpc_pb.GetAddressUnspentOutputsRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetAddressUnspentOutputsResponse.deserializeBinary
  );

  getAddressUnspentOutputs(
    request: bchrpc_pb.GetAddressUnspentOutputsRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetAddressUnspentOutputsResponse>;

  getAddressUnspentOutputs(
    request: bchrpc_pb.GetAddressUnspentOutputsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetAddressUnspentOutputsResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetAddressUnspentOutputsResponse>;

  getAddressUnspentOutputs(
    request: bchrpc_pb.GetAddressUnspentOutputsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetAddressUnspentOutputsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetAddressUnspentOutputs',
        request,
        metadata || {},
        this.methodInfoGetAddressUnspentOutputs,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetAddressUnspentOutputs',
    request,
    metadata || {},
    this.methodInfoGetAddressUnspentOutputs);
  }

  methodInfoGetUnspentOutput = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetUnspentOutputResponse,
    (request: bchrpc_pb.GetUnspentOutputRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetUnspentOutputResponse.deserializeBinary
  );

  getUnspentOutput(
    request: bchrpc_pb.GetUnspentOutputRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetUnspentOutputResponse>;

  getUnspentOutput(
    request: bchrpc_pb.GetUnspentOutputRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetUnspentOutputResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetUnspentOutputResponse>;

  getUnspentOutput(
    request: bchrpc_pb.GetUnspentOutputRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetUnspentOutputResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetUnspentOutput',
        request,
        metadata || {},
        this.methodInfoGetUnspentOutput,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetUnspentOutput',
    request,
    metadata || {},
    this.methodInfoGetUnspentOutput);
  }

  methodInfoGetMerkleProof = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetMerkleProofResponse,
    (request: bchrpc_pb.GetMerkleProofRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetMerkleProofResponse.deserializeBinary
  );

  getMerkleProof(
    request: bchrpc_pb.GetMerkleProofRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetMerkleProofResponse>;

  getMerkleProof(
    request: bchrpc_pb.GetMerkleProofRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetMerkleProofResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetMerkleProofResponse>;

  getMerkleProof(
    request: bchrpc_pb.GetMerkleProofRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetMerkleProofResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetMerkleProof',
        request,
        metadata || {},
        this.methodInfoGetMerkleProof,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetMerkleProof',
    request,
    metadata || {},
    this.methodInfoGetMerkleProof);
  }

  methodInfoGetSlpTokenMetadata = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetSlpTokenMetadataResponse,
    (request: bchrpc_pb.GetSlpTokenMetadataRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetSlpTokenMetadataResponse.deserializeBinary
  );

  getSlpTokenMetadata(
    request: bchrpc_pb.GetSlpTokenMetadataRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetSlpTokenMetadataResponse>;

  getSlpTokenMetadata(
    request: bchrpc_pb.GetSlpTokenMetadataRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetSlpTokenMetadataResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetSlpTokenMetadataResponse>;

  getSlpTokenMetadata(
    request: bchrpc_pb.GetSlpTokenMetadataRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetSlpTokenMetadataResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetSlpTokenMetadata',
        request,
        metadata || {},
        this.methodInfoGetSlpTokenMetadata,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetSlpTokenMetadata',
    request,
    metadata || {},
    this.methodInfoGetSlpTokenMetadata);
  }

  methodInfoGetSlpParsedScript = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetSlpParsedScriptResponse,
    (request: bchrpc_pb.GetSlpParsedScriptRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetSlpParsedScriptResponse.deserializeBinary
  );

  getSlpParsedScript(
    request: bchrpc_pb.GetSlpParsedScriptRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetSlpParsedScriptResponse>;

  getSlpParsedScript(
    request: bchrpc_pb.GetSlpParsedScriptRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetSlpParsedScriptResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetSlpParsedScriptResponse>;

  getSlpParsedScript(
    request: bchrpc_pb.GetSlpParsedScriptRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetSlpParsedScriptResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetSlpParsedScript',
        request,
        metadata || {},
        this.methodInfoGetSlpParsedScript,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetSlpParsedScript',
    request,
    metadata || {},
    this.methodInfoGetSlpParsedScript);
  }

  methodInfoGetSlpTrustedValidation = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.GetSlpTrustedValidationResponse,
    (request: bchrpc_pb.GetSlpTrustedValidationRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.GetSlpTrustedValidationResponse.deserializeBinary
  );

  getSlpTrustedValidation(
    request: bchrpc_pb.GetSlpTrustedValidationRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.GetSlpTrustedValidationResponse>;

  getSlpTrustedValidation(
    request: bchrpc_pb.GetSlpTrustedValidationRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.GetSlpTrustedValidationResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.GetSlpTrustedValidationResponse>;

  getSlpTrustedValidation(
    request: bchrpc_pb.GetSlpTrustedValidationRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.GetSlpTrustedValidationResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/GetSlpTrustedValidation',
        request,
        metadata || {},
        this.methodInfoGetSlpTrustedValidation,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/GetSlpTrustedValidation',
    request,
    metadata || {},
    this.methodInfoGetSlpTrustedValidation);
  }

  methodInfoCheckSlpTransaction = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.CheckSlpTransactionResponse,
    (request: bchrpc_pb.CheckSlpTransactionRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.CheckSlpTransactionResponse.deserializeBinary
  );

  checkSlpTransaction(
    request: bchrpc_pb.CheckSlpTransactionRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.CheckSlpTransactionResponse>;

  checkSlpTransaction(
    request: bchrpc_pb.CheckSlpTransactionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.CheckSlpTransactionResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.CheckSlpTransactionResponse>;

  checkSlpTransaction(
    request: bchrpc_pb.CheckSlpTransactionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.CheckSlpTransactionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/CheckSlpTransaction',
        request,
        metadata || {},
        this.methodInfoCheckSlpTransaction,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/CheckSlpTransaction',
    request,
    metadata || {},
    this.methodInfoCheckSlpTransaction);
  }

  methodInfoSubmitTransaction = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.SubmitTransactionResponse,
    (request: bchrpc_pb.SubmitTransactionRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.SubmitTransactionResponse.deserializeBinary
  );

  submitTransaction(
    request: bchrpc_pb.SubmitTransactionRequest,
    metadata: grpcWeb.Metadata | null): Promise<bchrpc_pb.SubmitTransactionResponse>;

  submitTransaction(
    request: bchrpc_pb.SubmitTransactionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: bchrpc_pb.SubmitTransactionResponse) => void): grpcWeb.ClientReadableStream<bchrpc_pb.SubmitTransactionResponse>;

  submitTransaction(
    request: bchrpc_pb.SubmitTransactionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: bchrpc_pb.SubmitTransactionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pb.bchrpc/SubmitTransaction',
        request,
        metadata || {},
        this.methodInfoSubmitTransaction,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pb.bchrpc/SubmitTransaction',
    request,
    metadata || {},
    this.methodInfoSubmitTransaction);
  }

  methodInfoSubscribeTransactions = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.TransactionNotification,
    (request: bchrpc_pb.SubscribeTransactionsRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.TransactionNotification.deserializeBinary
  );

  subscribeTransactions(
    request: bchrpc_pb.SubscribeTransactionsRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pb.bchrpc/SubscribeTransactions',
      request,
      metadata || {},
      this.methodInfoSubscribeTransactions);
  }

  methodInfoSubscribeBlocks = new grpcWeb.AbstractClientBase.MethodInfo(
    bchrpc_pb.BlockNotification,
    (request: bchrpc_pb.SubscribeBlocksRequest) => {
      return request.serializeBinary();
    },
    bchrpc_pb.BlockNotification.deserializeBinary
  );

  subscribeBlocks(
    request: bchrpc_pb.SubscribeBlocksRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/pb.bchrpc/SubscribeBlocks',
      request,
      metadata || {},
      this.methodInfoSubscribeBlocks);
  }

}

