import test from 'tape'
import { put  } from 'redux-saga/effects';
import * as bchrpc from '../../protos/BchrpcServiceClientPb';
import { sagaWatcherHelper } from '../../utils';
import { BASE_URL } from '../../configs';
import { workerCreateNewClient } from './index'

const client = new bchrpc.bchrpcClient(BASE_URL)

test('incrementAsync Saga test', async (assert) => {
  const gen = workerCreateNewClient()

  assert.deepEqual(
    await gen.next(),
    { done: false, value: "" },
    'incrementAsync should return a Promise that will resolve after 1 second'
  )
})