import aesJs from 'aes-js';
import { hexToArray } from 'enc-utils';
import * as hash from 'hash.js';

import { HEX_ENC, SHA256_NODE_ALGO, SHA512_NODE_ALGO } from '../constants';
import { pkcs7 } from '../helpers';

export function fallbackAesEncrypt(
  iv: Uint8Array,
  key: Uint8Array,
  data: Uint8Array
) {
  const aesCbc = new aesJs.ModeOfOperation.cbc(key, iv);
  const padded = pkcs7.pad(data);
  const encryptedBytes = aesCbc.encrypt(padded);
  return new Uint8Array(encryptedBytes);
}

export function fallbackAesDecrypt(
  iv: Uint8Array,
  key: Uint8Array,
  data: Uint8Array
) {
  const aesCbc = new aesJs.ModeOfOperation.cbc(key, iv);
  const encryptedBytes = aesCbc.decrypt(data);
  const padded = new Uint8Array(encryptedBytes);
  const result = pkcs7.unpad(padded);
  return result;
}

export function fallbackHmacSha256Sign(
  key: Uint8Array,
  data: Uint8Array
): Uint8Array {
  const result = hash
    .hmac((hash as any)[SHA256_NODE_ALGO], key)
    .update(data)
    .digest(HEX_ENC);
  return hexToArray(result);
}

export function fallbackHmacSha512Sign(
  key: Uint8Array,
  data: Uint8Array
): Uint8Array {
  const result = hash
    .hmac((hash as any)[SHA512_NODE_ALGO], key)
    .update(data)
    .digest(HEX_ENC);
  return hexToArray(result);
}

export function fallbackSha256(msg: Uint8Array): Uint8Array {
  const result = hash
    .sha256()
    .update(msg)
    .digest(HEX_ENC);
  return hexToArray(result);
}

export function fallbackSha512(msg: Uint8Array): Uint8Array {
  const result = hash
    .sha512()
    .update(msg)
    .digest(HEX_ENC);
  return hexToArray(result);
}

export function fallbackRipemd160(msg: Uint8Array): Uint8Array {
  const result = hash
    .ripemd160()
    .update(msg)
    .digest(HEX_ENC);
  return hexToArray(result);
}
