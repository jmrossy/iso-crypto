# iso-crypto [![npm version](https://badge.fury.io/js/iso-crypto.svg)](https://badge.fury.io/js/iso-crypto)

Isomorphic Cryptography Library for AES, HMAC and SHA2

## Description

This library supports AES, HMAC and SHA2 methods through native NodeJS and Browser APIs when available and fallbacks to vanilla javascript are already provided.

## Usage

### RandomBytes

```typescript
import * as isoCrypto from 'iso-crypto';

const length = 32;
const key = isoCrypto.randomBytes(length);

// key.length === length
```

### AES

```typescript
import * as isoCrypto from 'iso-crypto';
import * as encUtils from 'enc-utils';

const key = isoCrypto.randomBytes(32);
const iv = isoCrypto.randomBytes(16);

const str = 'test message to encrypt';
const msg = encUtils.utf8ToArray(str);

const ciphertext = await isoCrypto.aesCbcEncrypt(iv, key, msg);

const decrypted = await isoCrypto.aesCbcDecrypt(iv, key, ciphertext);

// decrypted === str
```

### HMAC

```typescript
import * as isoCrypto from 'iso-crypto';
import * as encUtils from 'enc-utils';

const key = isoCrypto.randomBytes(32);
const iv = isoCrypto.randomBytes(16);

const macKey = encUtils.concatArrays(iv, key);
const dataToMac = encUtils.concatArrays(iv, key, msg);

const mac = await isoCrypto.hmacSha256Sign(macKey, dataToMac);

const result = await isoCrypto.hmacSha256Verify(macKey, dataToMac, mac);

// result will return true if match
```

### SHA2

```typescript
import * as isoCrypto from 'iso-crypto';
import * as encUtils from 'enc-utils';

// SHA256
const str = 'test message to hash';
const msg = encUtils.utf8ToArray(str);
const hash = await isoCrypto.sha256(str);

// SHA512
const str = 'test message to hash';
const msg = encUtils.utf8ToArray(str);
const hash = await isoCrypto.sha512(str);
```

## React-Native Support

This library is intended for use in a Browser or NodeJS environment, however it is possible to use in a React-Native environment if NodeJS modules are polyfilled with `react-native-crypto`, read more [here](https://github.com/tradle/react-native-crypto).

## License

[MIT License](LICENSE.md)
