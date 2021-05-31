import { actionHelper, sagaWatcherHelper } from './sagahelpers';
import {hexToU8, base64toHex, base64toU8, u8toHex} from './clienthelper';

const truncate = (str) => {
	const strlen = str.length
	return strlen > 10 ? str.substring(0, 20) + "......" + str.substring(strlen-20, strlen): str;
}

export {
	actionHelper,
	base64toHex,
	base64toU8,
  hexToU8,
  sagaWatcherHelper,
  truncate,
  u8toHex,
}