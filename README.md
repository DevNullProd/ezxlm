# EZ XLM - XLM Transaction Simplifier

EZXLM is a simple utility that accepts blockchain transactions as received from the XLM (Stellar) Network and simplifies them for easier & more rapid parsing.

## Installation

With npm

```
npm install ezxlm
```

With yarn

```
yarn add ezxlm
```

## Example

Take for example the following transaction...

```js
const tx = {
  _links:
    { self:
      { href: 'https://horizon.stellar.org/transactions/73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818' },
     account:
      { href: 'https://horizon.stellar.org/accounts/GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV' },
     ledger: { href: 'https://horizon.stellar.org/ledgers/32842603' },
     operations:
       { href: 'https://horizon.stellar.org/transactions/73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818/operations{?cursor,limit,order}', templated: true },
     effects:
       { href: 'https://horizon.stellar.org/transactions/73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818/effects{?cursor,limit,order}', templated: true },
     precedes: { href: 'https://horizon.stellar.org/transactions?order=asc&cursor=141057905800515584' },
     succeeds: { href: 'https://horizon.stellar.org/transactions?order=desc&cursor=141057905800515584' },
     transaction: { href: 'https://horizon.stellar.org/transactions/73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818' } },

  id: '73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818',
  paging_token: '141057905800515584',
  successful: true,
  hash: '73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818',
  ledger: [FUNCTION],
  created_at: '2020-11-29T20:28:22Z',
  source_account: 'GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV',
  source_account_sequence: '117381718196025459',
  fee_account: 'GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV',
  fee_charged: '200',
  max_fee: '2000',
  operation_count: 2,
  envelope_xdr: 'AAAAAgAAAACZx8/XHkNnOI0cvFdTWjJgtL66ML9Y1QjkymyEG83azgAAB9ABoQYNADL4cwAAAAEAAAAAAAAAAAAAAABfxASAAAAAAAAAAAIAAAAAAAAADAAAAAFVU0QAAAAAAOimGoYeYK9g+Adz4GNG5ccsvlncrdo3YI1Y70JRHZ/cAAAAAAAAAAAAAAAAAAAAAQAAJxAAAAAAFpNvtAAAAAAAAAAMAAAAAVVTRAAAAAAA6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9wAAAAAAAAAAyg7Yq8R6JSjXXlJCQAAAAAAAAAAAAAAAAAAAAEbzdrOAAAAQGpMKqle13+rfCq9B02ggzOY8X7GTYXYI5LmyfOEjdM0noHubMYfIA3PxORD26xPzYYH+K8pdY98nHuZJpiEWQE=',
  result_xdr: 'AAAAAAAAAMgAAAAAAAAAAgAAAAAAAAAMAAAAAAAAAAAAAAACAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAmcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4AAAAAFpNwIwAAAAFVU0QAAAAAAOimGoYeYK9g+Adz4GNG5ccsvlncrdo3YI1Y70JRHZ/cAAAAAAAAAACa2R3YXXlJCRHolKMAAAAAAAAAAAAAAAA=',
  result_meta_xdr: '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',
  fee_meta_xdr: 'AAAAAgAAAAMB9SNpAAAAAAAAAACZx8/XHkNnOI0cvFdTWjJgtL66ML9Y1QjkymyEG83azgAAAAAHJqKUAaEGDQAy+HIAAAACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABAAAAAyg7Yq0AAAAAAAAAAAAAAAAAAAAAAAAAAQH1I2sAAAAAAAAAAJnHz9ceQ2c4jRy8V1NaMmC0vrowv1jVCOTKbIQbzdrOAAAAAAcmocwBoQYNADL4cgAAAAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAEAAAADKDtirQAAAAAAAAAAAAAAAAAAAAA=',
  memo_type: 'none',
  signatures: [ 'akwqqV7Xf6t8Kr0HTaCDM5jxfsZNhdgjkubJ84SN0zSege5sxh8gDc/E5EPbrE/Nhgf4ryl1j3yce5kmmIRZAQ==' ],
  valid_after: '1970-01-01T00:00:00Z',
  valid_before: '2020-11-29T20:28:48Z',
  self: [FUNCTION],
  account: [FUNCTION],
  ledger_attr: 32842603,
  operations: [FUNCTION],
  effects: [FUNCTION],
  precedes: [FUNCTION],
  succeeds: [FUNCTION],
  transaction: [FUNCTION]
}
```

...in conjunction with the **ezxlm** call...

```js
const {simplify} = require("ezxlm")
const simplified = simplify(tx)
```

...produces:

```js
// simplified =>
{
  "id": "73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818",
  "paging_token": "141057905800515584",
  "successful": true,
  "hash": "73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818",
  "created_at": "2020-11-29T20:28:22Z",
  "source_account": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
  "source_account_sequence": "117381718196025459",
  "fee_account": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
  "fee_charged": "200",
  "max_fee": "2000",
  "operation_count": 2,
  "memo_type": "none",
  "signatures": [
    "akwqqV7Xf6t8Kr0HTaCDM5jxfsZNhdgjkubJ84SN0zSege5sxh8gDc/E5EPbrE/Nhgf4ryl1j3yce5kmmIRZAQ=="
  ],
  "valid_after": "1970-01-01T00:00:00Z",
  "valid_before": "2020-11-29T20:28:48Z",
  "ledger_attr": 32842603,
  "envelope": {
    "tx": {
      "sourceAccount": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
      "fee": 2000,
      "seqNum": "117381718196025459",
      "timeBounds": {
        "minTime": "0",
        "maxTime": "1606681728"
      },
      "memo": "memoNone",
      "operations": [
        {
          "selling": {
            "assetCode": "USD",
            "issuer": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
            "__type": "assetTypeCreditAlphanum4"
          },
          "buying": "assetTypeNative",
          "buyAmount": "0",
          "price": 0.0001,
          "offerId": "378761140",
          "__type": "manageBuyOffer"
        },
        {
          "selling": {
            "assetCode": "USD",
            "issuer": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
            "__type": "assetTypeCreditAlphanum4"
          },
          "buying": "assetTypeNative",
          "buyAmount": "13559882415",
          "price": 0.19158869794631053,
          "offerId": "0",
          "__type": "manageBuyOffer"
        }
      ]
    },
    "signatures": [
      {
        "hint": "G83azg==",
        "signature": "akwqqV7Xf6t8Kr0HTaCDM5jxfsZNhdgjkubJ84SN0zSege5sxh8gDc/E5EPbrE/Nhgf4ryl1j3yce5kmmIRZAQ=="
      }
    ],
    "__type": "envelopeTypeTx"
  },
  "result_meta": {
    "txChangesBefore": [
      {
        "lastModifiedLedgerSeq": 32842603,
        "__type": "account",
        "accountId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
        "balance": "119972300",
        "seqNum": "117381718196025458",
        "numSubEntries": 2,
        "flags": 0,
        "homeDomain": "",
        "thresholds": "AQAAAA==",
        "signers": []
      },
      {
        "lastModifiedLedgerSeq": 32842603,
        "__type": "account",
        "accountId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
        "balance": "119972300",
        "seqNum": "117381718196025459",
        "numSubEntries": 2,
        "flags": 0,
        "homeDomain": "",
        "thresholds": "AQAAAA==",
        "signers": []
      }
    ],
    "operations": [
      {
        "changes": [
          {
            "lastModifiedLedgerSeq": 32842601,
            "__type": "offer",
            "sellerId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
            "offerId": "378761140",
            "selling": {
              "assetCode": "USD",
              "issuer": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
              "__type": "assetTypeCreditAlphanum4"
            },
            "buying": "assetTypeNative",
            "amount": "2597918860",
            "price": 5.219517292361172,
            "flags": 0
          },
          {
            "offer": {
              "sellerId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
              "offerId": "378761140"
            },
            "__type": "ledgerEntryRemoved"
          },
          {
            "lastModifiedLedgerSeq": 32842603,
            "__type": "account",
            "accountId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
            "balance": "119972300",
            "seqNum": "117381718196025459",
            "numSubEntries": 2,
            "flags": 0,
            "homeDomain": "",
            "thresholds": "AQAAAA==",
            "signers": []
          },
          {
            "lastModifiedLedgerSeq": 32842603,
            "__type": "account",
            "accountId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
            "balance": "119972300",
            "seqNum": "117381718196025459",
            "numSubEntries": 1,
            "flags": 0,
            "homeDomain": "",
            "thresholds": "AQAAAA==",
            "signers": []
          },
          {
            "lastModifiedLedgerSeq": 32842601,
            "__type": "trustline",
            "accountId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
            "asset": {
              "assetCode": "USD",
              "issuer": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
              "__type": "assetTypeCreditAlphanum4"
            },
            "balance": "2689321244",
            "limit": "9223372036854775000",
            "flags": 1
          },
          {
            "lastModifiedLedgerSeq": 32842603,
            "__type": "trustline",
            "accountId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
            "asset": {
              "assetCode": "USD",
              "issuer": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
              "__type": "assetTypeCreditAlphanum4"
            },
            "balance": "2689321244",
            "limit": "9223372036854775000",
            "flags": 1
          }
        ]
      },
      {
        "changes": [
          {
            "lastModifiedLedgerSeq": 32842603,
            "__type": "offer",
            "sellerId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
            "offerId": "378761251",
            "selling": {
              "assetCode": "USD",
              "issuer": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
              "__type": "assetTypeCreditAlphanum4"
            },
            "buying": "assetTypeNative",
            "amount": "2597920216",
            "price": 5.219514568026518,
            "flags": 0
          },
          {
            "lastModifiedLedgerSeq": 32842603,
            "__type": "account",
            "accountId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
            "balance": "119972300",
            "seqNum": "117381718196025459",
            "numSubEntries": 1,
            "flags": 0,
            "homeDomain": "",
            "thresholds": "AQAAAA==",
            "signers": []
          },
          {
            "lastModifiedLedgerSeq": 32842603,
            "__type": "account",
            "accountId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
            "balance": "119972300",
            "seqNum": "117381718196025459",
            "numSubEntries": 2,
            "flags": 0,
            "homeDomain": "",
            "thresholds": "AQAAAA==",
            "signers": []
          },
          {
            "lastModifiedLedgerSeq": 32842603,
            "__type": "trustline",
            "accountId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
            "asset": {
              "assetCode": "USD",
              "issuer": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
              "__type": "assetTypeCreditAlphanum4"
            },
            "balance": "2689321244",
            "limit": "9223372036854775000",
            "flags": 1
          },
          {
            "lastModifiedLedgerSeq": 32842603,
            "__type": "trustline",
            "accountId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
            "asset": {
              "assetCode": "USD",
              "issuer": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
              "__type": "assetTypeCreditAlphanum4"
            },
            "balance": "2689321244",
            "limit": "9223372036854775000",
            "flags": 1
          }
        ]
      }
    ],
    "txChangesAfter": [],
    "__type": 2
  },
  "result": {
    "feeCharged": "200",
    "result": {
      "results": [
        {
          "manageBuyOfferResult": {
            "offersClaimed": [],
            "offer": "manageOfferDeleted",
            "__type": "manageBuyOfferSuccess"
          },
          "__type": "opInner"
        },
        {
          "manageBuyOfferResult": {
            "offersClaimed": [],
            "offer": {
              "sellerId": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
              "offerId": "378761251",
              "selling": {
                "assetCode": "USD",
                "issuer": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
                "__type": "assetTypeCreditAlphanum4"
              },
              "buying": "assetTypeNative",
              "amount": "2597920216",
              "price": 5.219514568026518,
              "flags": 0,
              "__type": "manageOfferCreated"
            },
            "__type": "manageBuyOfferSuccess"
          },
          "__type": "opInner"
        }
      ],
      "__type": "txSuccess"
    }
  }
}


```

Contrast just calling the **StellarSDK.fromXDR** methods...

```js
const StellarSdk  = require('stellar-sdk')
const xdr_to_json = require('json-xdr').toJSON

tx.envelope       = xdr_to_json(StellarSdk.xdr.TransactionEnvelope.fromXDR(tx.envelope_xdr, 'base64'));
tx.result_meta    = xdr_to_json(StellarSdk.xdr.TransactionMeta.fromXDR(tx.result_meta_xdr,  'base64'));
tx.result         = xdr_to_json(StellarSdk.xdr.TransactionResult.fromXDR(tx.result_xdr,     'base64'));
``` 

...which produces the following **complex** transaction:

```js
{
        "_links": {
          "self": {
            "href": "https://horizon.stellar.org/transactions/73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818"
          },
          "account": {
            "href": "https://horizon.stellar.org/accounts/GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV"
          },
          "ledger": {
            "href": "https://horizon.stellar.org/ledgers/32842603"
          },
          "operations": {
            "href": "https://horizon.stellar.org/transactions/73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818/operations{?cursor,limit,order}",
            "templated": true
          },
          "effects": {
            "href": "https://horizon.stellar.org/transactions/73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818/effects{?cursor,limit,order}",
            "templated": true
          },
          "precedes": {
            "href": "https://horizon.stellar.org/transactions?order=asc&cursor=141057905800515584"
          },
          "succeeds": {
            "href": "https://horizon.stellar.org/transactions?order=desc&cursor=141057905800515584"
          },
          "transaction": {
            "href": "https://horizon.stellar.org/transactions/73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818"
          }
        },
        "id": "73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818",
        "paging_token": "141057905800515584",
        "successful": true,
        "hash": "73ccc1c241fe314baa0280c7629b98644469faccdfdb0add654ae7e9b0dc9818",
        "created_at": "2020-11-29T20:28:22Z",
        "source_account": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
        "source_account_sequence": "117381718196025459",
        "fee_account": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
        "fee_charged": "200",
        "max_fee": "2000",
        "operation_count": 2,
        "envelope_xdr": "AAAAAgAAAACZx8/XHkNnOI0cvFdTWjJgtL66ML9Y1QjkymyEG83azgAAB9ABoQYNADL4cwAAAAEAAAAAAAAAAAAAAABfxASAAAAAAAAAAAIAAAAAAAAADAAAAAFVU0QAAAAAAOimGoYeYK9g+Adz4GNG5ccsvlncrdo3YI1Y70JRHZ/cAAAAAAAAAAAAAAAAAAAAAQAAJxAAAAAAFpNvtAAAAAAAAAAMAAAAAVVTRAAAAAAA6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9wAAAAAAAAAAyg7Yq8R6JSjXXlJCQAAAAAAAAAAAAAAAAAAAAEbzdrOAAAAQGpMKqle13+rfCq9B02ggzOY8X7GTYXYI5LmyfOEjdM0noHubMYfIA3PxORD26xPzYYH+K8pdY98nHuZJpiEWQE=",
        "result_xdr": "AAAAAAAAAMgAAAAAAAAAAgAAAAAAAAAMAAAAAAAAAAAAAAACAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAmcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4AAAAAFpNwIwAAAAFVU0QAAAAAAOimGoYeYK9g+Adz4GNG5ccsvlncrdo3YI1Y70JRHZ/cAAAAAAAAAACa2R3YXXlJCRHolKMAAAAAAAAAAAAAAAA=",
        "result_meta_xdr": "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",
        "fee_meta_xdr": "AAAAAgAAAAMB9SNpAAAAAAAAAACZx8/XHkNnOI0cvFdTWjJgtL66ML9Y1QjkymyEG83azgAAAAAHJqKUAaEGDQAy+HIAAAACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABAAAAAyg7Yq0AAAAAAAAAAAAAAAAAAAAAAAAAAQH1I2sAAAAAAAAAAJnHz9ceQ2c4jRy8V1NaMmC0vrowv1jVCOTKbIQbzdrOAAAAAAcmocwBoQYNADL4cgAAAAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAEAAAADKDtirQAAAAAAAAAAAAAAAAAAAAA=",
        "memo_type": "none",
        "signatures": [
          "akwqqV7Xf6t8Kr0HTaCDM5jxfsZNhdgjkubJ84SN0zSege5sxh8gDc/E5EPbrE/Nhgf4ryl1j3yce5kmmIRZAQ=="
        ],
        "valid_after": "1970-01-01T00:00:00Z",
        "valid_before": "2020-11-29T20:28:48Z",
        "ledger_attr": 32842603,
        "envelope": {
          "_type": "envelopeTypeTx",
          "v1": {
            "tx": {
              "sourceAccount": {
                "_type": "keyTypeEd25519",
                "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
              },
              "fee": 2000,
              "seqNum": "117381718196025459",
              "timeBounds": {
                "minTime": "0",
                "maxTime": "1606681728"
              },
              "memo": {
                "_type": "memoNone"
              },
              "operations": [
                {
                  "body": {
                    "_type": "manageBuyOffer",
                    "manageBuyOfferOp": {
                      "selling": {
                        "_type": "assetTypeCreditAlphanum4",
                        "alphaNum4": {
                          "assetCode": "VVNEAA==",
                          "issuer": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9w="
                          }
                        }
                      },
                      "buying": {
                        "_type": "assetTypeNative"
                      },
                      "buyAmount": "0",
                      "price": {
                        "n": 1,
                        "d": 10000
                      },
                      "offerId": "378761140"
                    }
                  }
                },
                {
                  "body": {
                    "_type": "manageBuyOffer",
                    "manageBuyOfferOp": {
                      "selling": {
                        "_type": "assetTypeCreditAlphanum4",
                        "alphaNum4": {
                          "assetCode": "VVNEAA==",
                          "issuer": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9w="
                          }
                        }
                      },
                      "buying": {
                        "_type": "assetTypeNative"
                      },
                      "buyAmount": "13559882415",
                      "price": {
                        "n": 300455075,
                        "d": 1568229641
                      },
                      "offerId": "0"
                    }
                  }
                }
              ],
              "ext": {
                "_type": 0
              }
            },
            "signatures": [
              {
                "hint": "G83azg==",
                "signature": "akwqqV7Xf6t8Kr0HTaCDM5jxfsZNhdgjkubJ84SN0zSege5sxh8gDc/E5EPbrE/Nhgf4ryl1j3yce5kmmIRZAQ=="
              }
            ]
          }
        },
        "result_meta": {
          "_type": 2,
          "v2": {
            "txChangesBefore": [
              {
                "_type": "ledgerEntryState",
                "state": {
                  "lastModifiedLedgerSeq": 32842603,
                  "data": {
                    "_type": "account",
                    "account": {
                      "accountId": {
                        "_type": "publicKeyTypeEd25519",
                        "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                      },
                      "balance": "119972300",
                      "seqNum": "117381718196025458",
                      "numSubEntries": 2,
                      "flags": 0,
                      "homeDomain": "",
                      "thresholds": "AQAAAA==",
                      "signers": [],
                      "ext": {
                        "_type": 1,
                        "v1": {
                          "liabilities": {
                            "buying": "13559882413",
                            "selling": "0"
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      }
                    }
                  },
                  "ext": {
                    "_type": 0
                  }
                }
              },
              {
                "_type": "ledgerEntryUpdated",
                "updated": {
                  "lastModifiedLedgerSeq": 32842603,
                  "data": {
                    "_type": "account",
                    "account": {
                      "accountId": {
                        "_type": "publicKeyTypeEd25519",
                        "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                      },
                      "balance": "119972300",
                      "seqNum": "117381718196025459",
                      "numSubEntries": 2,
                      "flags": 0,
                      "homeDomain": "",
                      "thresholds": "AQAAAA==",
                      "signers": [],
                      "ext": {
                        "_type": 1,
                        "v1": {
                          "liabilities": {
                            "buying": "13559882413",
                            "selling": "0"
                          },
                          "ext": {
                            "_type": 0
                          }
                        }
                      }
                    }
                  },
                  "ext": {
                    "_type": 0
                  }
                }
              }
            ],
            "operations": [
              {
                "changes": [
                  {
                    "_type": "ledgerEntryState",
                    "state": {
                      "lastModifiedLedgerSeq": 32842601,
                      "data": {
                        "_type": "offer",
                        "offer": {
                          "sellerId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "offerId": "378761140",
                          "selling": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "VVNEAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9w="
                              }
                            }
                          },
                          "buying": {
                            "_type": "assetTypeNative"
                          },
                          "amount": "2597918860",
                          "price": {
                            "n": 556275823,
                            "d": 106576105
                          },
                          "flags": 0,
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  },
                  {
                    "_type": "ledgerEntryRemoved",
                    "removed": {
                      "_type": "offer",
                      "offer": {
                        "sellerId": {
                          "_type": "publicKeyTypeEd25519",
                          "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                        },
                        "offerId": "378761140"
                      }
                    }
                  },
                  {
                    "_type": "ledgerEntryState",
                    "state": {
                      "lastModifiedLedgerSeq": 32842603,
                      "data": {
                        "_type": "account",
                        "account": {
                          "accountId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "balance": "119972300",
                          "seqNum": "117381718196025459",
                          "numSubEntries": 2,
                          "flags": 0,
                          "homeDomain": "",
                          "thresholds": "AQAAAA==",
                          "signers": [],
                          "ext": {
                            "_type": 1,
                            "v1": {
                              "liabilities": {
                                "buying": "13559882413",
                                "selling": "0"
                              },
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  },
                  {
                    "_type": "ledgerEntryUpdated",
                    "updated": {
                      "lastModifiedLedgerSeq": 32842603,
                      "data": {
                        "_type": "account",
                        "account": {
                          "accountId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "balance": "119972300",
                          "seqNum": "117381718196025459",
                          "numSubEntries": 1,
                          "flags": 0,
                          "homeDomain": "",
                          "thresholds": "AQAAAA==",
                          "signers": [],
                          "ext": {
                            "_type": 1,
                            "v1": {
                              "liabilities": {
                                "buying": "0",
                                "selling": "0"
                              },
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  },
                  {
                    "_type": "ledgerEntryState",
                    "state": {
                      "lastModifiedLedgerSeq": 32842601,
                      "data": {
                        "_type": "trustline",
                        "trustLine": {
                          "accountId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "asset": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "VVNEAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9w="
                              }
                            }
                          },
                          "balance": "2689321244",
                          "limit": "9223372036854775000",
                          "flags": 1,
                          "ext": {
                            "_type": 1,
                            "v1": {
                              "liabilities": {
                                "buying": "0",
                                "selling": "2597918860"
                              },
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  },
                  {
                    "_type": "ledgerEntryUpdated",
                    "updated": {
                      "lastModifiedLedgerSeq": 32842603,
                      "data": {
                        "_type": "trustline",
                        "trustLine": {
                          "accountId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "asset": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "VVNEAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9w="
                              }
                            }
                          },
                          "balance": "2689321244",
                          "limit": "9223372036854775000",
                          "flags": 1,
                          "ext": {
                            "_type": 1,
                            "v1": {
                              "liabilities": {
                                "buying": "0",
                                "selling": "0"
                              },
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  }
                ]
              },
              {
                "changes": [
                  {
                    "_type": "ledgerEntryCreated",
                    "created": {
                      "lastModifiedLedgerSeq": 32842603,
                      "data": {
                        "_type": "offer",
                        "offer": {
                          "sellerId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "offerId": "378761251",
                          "selling": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "VVNEAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9w="
                              }
                            }
                          },
                          "buying": {
                            "_type": "assetTypeNative"
                          },
                          "amount": "2597920216",
                          "price": {
                            "n": 1568229641,
                            "d": 300455075
                          },
                          "flags": 0,
                          "ext": {
                            "_type": 0
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  },
                  {
                    "_type": "ledgerEntryState",
                    "state": {
                      "lastModifiedLedgerSeq": 32842603,
                      "data": {
                        "_type": "account",
                        "account": {
                          "accountId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "balance": "119972300",
                          "seqNum": "117381718196025459",
                          "numSubEntries": 1,
                          "flags": 0,
                          "homeDomain": "",
                          "thresholds": "AQAAAA==",
                          "signers": [],
                          "ext": {
                            "_type": 1,
                            "v1": {
                              "liabilities": {
                                "buying": "0",
                                "selling": "0"
                              },
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  },
                  {
                    "_type": "ledgerEntryUpdated",
                    "updated": {
                      "lastModifiedLedgerSeq": 32842603,
                      "data": {
                        "_type": "account",
                        "account": {
                          "accountId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "balance": "119972300",
                          "seqNum": "117381718196025459",
                          "numSubEntries": 2,
                          "flags": 0,
                          "homeDomain": "",
                          "thresholds": "AQAAAA==",
                          "signers": [],
                          "ext": {
                            "_type": 1,
                            "v1": {
                              "liabilities": {
                                "buying": "13559882413",
                                "selling": "0"
                              },
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  },
                  {
                    "_type": "ledgerEntryState",
                    "state": {
                      "lastModifiedLedgerSeq": 32842603,
                      "data": {
                        "_type": "trustline",
                        "trustLine": {
                          "accountId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "asset": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "VVNEAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9w="
                              }
                            }
                          },
                          "balance": "2689321244",
                          "limit": "9223372036854775000",
                          "flags": 1,
                          "ext": {
                            "_type": 1,
                            "v1": {
                              "liabilities": {
                                "buying": "0",
                                "selling": "0"
                              },
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  },
                  {
                    "_type": "ledgerEntryUpdated",
                    "updated": {
                      "lastModifiedLedgerSeq": 32842603,
                      "data": {
                        "_type": "trustline",
                        "trustLine": {
                          "accountId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "asset": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "VVNEAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9w="
                              }
                            }
                          },
                          "balance": "2689321244",
                          "limit": "9223372036854775000",
                          "flags": 1,
                          "ext": {
                            "_type": 1,
                            "v1": {
                              "liabilities": {
                                "buying": "0",
                                "selling": "2597920216"
                              },
                              "ext": {
                                "_type": 0
                              }
                            }
                          }
                        }
                      },
                      "ext": {
                        "_type": 0
                      }
                    }
                  }
                ]
              }
            ],
            "txChangesAfter": []
          }
        },
        "result": {
          "feeCharged": "200",
          "result": {
            "_type": "txSuccess",
            "results": [
              {
                "_type": "opInner",
                "tr": {
                  "_type": "manageBuyOffer",
                  "manageBuyOfferResult": {
                    "_type": "manageBuyOfferSuccess",
                    "success": {
                      "offersClaimed": [],
                      "offer": {
                        "_type": "manageOfferDeleted"
                      }
                    }
                  }
                }
              },
              {
                "_type": "opInner",
                "tr": {
                  "_type": "manageBuyOffer",
                  "manageBuyOfferResult": {
                    "_type": "manageBuyOfferSuccess",
                    "success": {
                      "offersClaimed": [],
                      "offer": {
                        "_type": "manageOfferCreated",
                        "offer": {
                          "sellerId": {
                            "_type": "publicKeyTypeEd25519",
                            "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
                          },
                          "offerId": "378761251",
                          "selling": {
                            "_type": "assetTypeCreditAlphanum4",
                            "alphaNum4": {
                              "assetCode": "VVNEAA==",
                              "issuer": {
                                "_type": "publicKeyTypeEd25519",
                                "ed25519": "6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9w="
                              }
                            }
                          },
                          "buying": {
                            "_type": "assetTypeNative"
                          },
                          "amount": "2597920216",
                          "price": {
                            "n": 1568229641,
                            "d": 300455075
                          },
                          "flags": 0,
                          "ext": {
                            "_type": 0
                          }
                        }
                      }
                    }
                  }
                }
              }
            ]
          },
          "ext": {
            "_type": 0
          }
        }
      }

```

Note the many levels & nested fields which are not present in the simplified transaction (much easier and faster to parse!)


## Behind the scenes:

ezxlm manipulates the specified transaction via the following operations behind the scenes:

- Deleting the following fields
  - _links
  - ledger [FUNCTION]
  - self [FUNCTION]
  - account [FUNCTION]
  - operations [FUNCTION]
  - effects [FUNCTION]
  - precedes [FUNCTION]
  - succeeds [FUNCTION]
  - transaction [FUNCTION]
- Converting the following fields from XDR and then to JSON
  - envelope_xdr
  - result_meta_xdr
  - result_xdr
- Deleting the following XDR fields:
  - envelope_xdr
  - result_meta_xdr
  - result_xdr
  - fee_meta_xdr
- Recursively iterating through the transaction and where applicable:
  - Deleting keys with null and undefined values
  - Removing **_type** keys, merging corresponding values and/or related values into the parent object (see below)
  - Merging values of **data** keys into the parent objects (see below)
  - Merging values of **body** keys into the parent objects (ese below)
  - Deleting **ext** keys and corresponding values
  - Converting asset codes from XDR respresentations nested in alphaNum4 and alphaNum12 objects into simple human freindly strings (see below)
  - Converting **issuer**, **sourceAccount**, **sellerId**, and **accountId** nested ed25519 representations into common addresses (see below)
  - Converting numerator / denominator based **price** information into simplified float values (see below)

The resulting simplified transaction object is returned from the **simplify** method

### _type simplification

ezxlm will convert the following:

```
 {
	"_type": "manageBuyOffer",
	"manageBuyOfferOp": {
	  "selling": {
         // ...
	  },
	  "buying": {
		"_type": "assetTypeNative"
	  }
}
```

To the following:

```
{
  "__type": "manageBuyOffer",
  "selling": {
    // ...
  },
  "buying": "assetTypeNative"
},

```

Specifically:

- In the case of the object only containing the _type property, the corresponding value will replace the object (see **buying** in the above example)
- In the case of the object containing another property, the corresponding value will be merged into the object (see the top level object containing **manageBuyOfferOp** in the above example)
- _type will be converted to __type (two underscores)


### data simplification

ezxlm will convert the following:

```
{
  "lastModifiedLedgerSeq": 32842603,
  "data": {
    "_type": "offer",
    "offer": {
      "offerId": "378761251",
      "amount": "2597920216",
      // ...
    }
  }
}
```

To the following:

```
{
  "lastModifiedLedgerSeq": 32842603,
  "__type": "offer",
  "offerId": "378761251",
  "amount": "2597920216",
   // ...
},

```

**Note**: in this example, the *offer* **_type** transformation has also been applied in accordance to the rules specified above

**Note** if both the containing object and the *data* object contains a **__type** property, it will be copied to ***___type***
before the data object is merged so as to preserve the value. For example the following:

```
{
 "_type": "ledgerEntryState",
 "state": {
  "lastModifiedLedgerSeq": 33822986,
  "data": {
   "_type": "account",
   "account": {
    "balance": "6513473433",
    // ...
   }
  }
 }
}
```

Will be converted to:

```
{
  "__type": "account"
 "___type": "ledgerEntryState",
 "lastModifiedLedgerSeq": 33822986,
 "balance": "6513473433",
 // ...
}
```

### body simplification

ezxlm will convert the following:

```
{
  "body": {
    "_type": "manageBuyOffer",
    "manageBuyOfferOp": {
      "buyAmount": "0",
      "offerId": "378761140"
      // ...
    }
  }
}
```

To the following:

```
{
  "__type": "manageBuyOffer"
  "buyAmount": "0",
  "offerId": "378761140"
}

```

**Note**: in this example, the *manageBuyOffer* **_type** transformation has also been applied in accordance to the rules specified above

**Note** if both the containing object and the *body* object contains a **__type** property, it will be copied to ***___type***
before the body object is merged so as to preserve the value.

### assetCode simplification

ezxlm will convert the following:

```
"selling": {
  "_type": "assetTypeCreditAlphanum4",
  "alphaNum4": {
    "assetCode": "VVNEAA==",
    "issuer": {
      "_type": "publicKeyTypeEd25519",
      "ed25519": "6KYahh5gr2D4B3PgY0blxyy+Wdyt2jdgjVjvQlEdn9w="
    }
  }
}
```

To the following:

```
"selling": {
  "assetCode": "USD",
  "issuer": "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
  "__type": "assetTypeCreditAlphanum4"
},
```

**Note**: in this example, the *issuer* **_type** transformation has also been applied in accordance to the rules specified above and the **ed25519** transformation has also been applied in accordance to the rules specified below.


### ed25519 simplification

ezxlm will convert the following:

```
"sourceAccount": {
  "_type": "keyTypeEd25519",
  "ed25519": "mcfP1x5DZziNHLxXU1oyYLS+ujC/WNUI5MpshBvN2s4="
}
```

To the following:

```
"sourceAccount": "GCM4PT6XDZBWOOENDS6FOU22GJQLJPV2GC7VRVII4TFGZBA3ZXNM55SV",
```

This applies to the following fields:
- sourceAccount
- issuer
- sellerId
- accountId

### price simplification

ezxlm will convert the following:

```
"price": {
  "n": 1568229641,
  "d": 300455075
}
```

To the following:

```
"price": 5.219514568026518
```

This is accomplished by dividing **n** by **d** and assigning it to price.

## Legaleese

ezxlm is released under the MIT license

(C) 2021 - Dev Null Productions
