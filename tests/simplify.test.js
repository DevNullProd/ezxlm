const {simplify} = require("../lib")

const orig = {
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
  ledger: function(){},
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
  self: function(){},
  account: function(){},
  ledger_attr: 32842603,
  operations: function(){},
  effects: function(){},
  precedes: function(){},
  succeeds: function(){},
  transaction: function(){}
}

const expected = {
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


describe("#simplify", () => {
  it("simplifies tx", () => {
    expect(simplify(orig)).toEqual(expected)
  })
})
