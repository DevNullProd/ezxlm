const StellarSdk = require('stellar-sdk')
const xdr_to_json = require('json-xdr').toJSON

// Sort object keys, prioritizing subobject
function obj_keys(obj){
  return Object.keys(obj)
               .sort(function(c1, c2){
                 if(typeof obj[c1] == "object" && typeof obj[c2] != "object")
                   return -1;
                 if(typeof obj[c1] != "object" && typeof obj[c2] == "object")
                   return 1;
                 return 0;
               })
}

// Recursive traverse object, calling callback
function traverse(obj, callback, path){
  if(!path) path = '$'

  obj_keys(obj).forEach(function(property){
    const value = obj[property];
    const current = path + '.' + property;

    // Depth first traversal
    if(typeof obj[property] == "object")
      traverse(value, callback, current);

    // Invoke callback with:
    // - current property
    // - current property path
    // - current property value
    // - parent object
    callback(property, current, value, obj)
  })
}

// Merge specified child into object and then delete
function merge_up(obj, child){
  Object.assign(obj, obj[child])
  delete obj[child]
}

// Merges an object's subobjects into itself
function merge_children(obj){
  if(typeof obj != "object")
    return;

  Object.keys(obj)
        .forEach(function(key){
          if(typeof obj[key] == "object")
            merge_up(obj, key)
        })
}

// Simplify the given transaction
function simplify(tx){
  // deep copy tx
  tx = JSON.parse(JSON.stringify(tx))

  // delete links
  delete tx._links;

  // delete functions
  delete tx.ledger;
  delete tx.self;
  delete tx.account;
  delete tx.operations;
  delete tx.effects;
  delete tx.precedes;
  delete tx.succeeds;
  delete tx.transaction;

  // Convert envelope, result_meta, result from xdr to json
  tx.envelope    = xdr_to_json(StellarSdk.xdr.TransactionEnvelope.fromXDR(tx.envelope_xdr, 'base64'));
  tx.result      = xdr_to_json(StellarSdk.xdr.TransactionResult.fromXDR(tx.result_xdr,     'base64'));

  // XXX: skip result_meta parsing as this often contains alot of data
  // TODO: perhaps make this optional via a flag (?)
  //tx.result_meta = xdr_to_json(StellarSdk.xdr.TransactionMeta.fromXDR(tx.result_meta_xdr,  'base64'));

  // TODO how to convert fee_meta_xdr ?

  // Delete XDR fields
  delete tx.envelope_xdr
  delete tx.result_meta_xdr
  delete tx.result_xdr
  delete tx.fee_meta_xdr

  // iterate over transaction
  traverse(tx, function(property, path, value, prent){
    // delete undefined / null values and empty arrays
    if(value == undefined || value == null || (Array.isArray(value) && !value.length)){
      delete prent[property];
      return;
    }

    ///

    // Value object handlers

    // remove ext fields
    delete value.ext

    // Convert assetCodes from xdr to strings
    if(value._type == 'assetTypeCreditAlphanum4'){
      const alpha_num = !!value.alphaNum4
      const assetCode = alpha_num ? value.alphaNum4.assetCode : value.assetCode4;
      const converted = StellarSdk.xdr.AssetCode4.fromXDR(assetCode, 'base64')
                                                 .toString()
                                                 .replace(/\0/g, '')

      if(alpha_num){
        value.alphaNum4.assetCode = converted;
        prent[property] = value.alphaNum4;

      }else{
        prent[property] = value.assetCode4 = converted;
      }
    }

    if(value._type == 'assetTypeCreditAlphanum12'){
      const alpha_num = !!value.alphaNum12
      const assetCode = alpha_num ? value.alphaNum12.assetCode : value.assetCode12;
      const converted = StellarSdk.xdr.AssetCode12.fromXDR(assetCode, 'base64')
                                                  .toString()
                                                  .replace(/\0/g, '')
      if(alpha_num){
        value.alphaNum12.assetCode = converted;
        prent[property] = value.alphaNum12;

      }else{
        prent[property] = value.assetCode12 = converted;
      }
    }

    // Reassign address obj to common address
    if(value._type == 'keyTypeEd25519' ||
       value._type == 'publicKeyTypeEd25519'){
      prent[property] = (new StellarSdk.Keypair({type: "ed25519", publicKey: Buffer.from(value.ed25519, 'base64')})).publicKey()
      return;
    }

    // Reassign objects only containing _type to itself
    if(value._type && Object.keys(value).length == 1){
      prent[property] = value._type;
      return;
    }

    ///

    // Specific property handlers

    // Convert price to single value
    if(property == 'price' && value.n && value.d){
      prent[property] = value.n / value.d;
      return;
    }

    // Move envelope.v1 to envelope
    if(property == 'envelope' && value.v1){
      prent[property] = value.v1;
      return;
    }

    /* TODO: uncomment if we process result_meta (see above)
    // Move result_meta.v2 to result_meta
    if(property == 'result_meta' && value.v2){
      prent[property] = value.v2
      return;
    }
    */

    // Merge envelope operations' children
    if(path == '$.envelope.v1.tx.operations'){
      value.forEach(function(op){
        merge_children(op);
      })

      return;
    }

    /* TODO: uncomment if we process result_meta (see above)
    // Merge result_meta operations' changes' children
    if(path == '$.result_meta.v2.operations'){
      value.forEach(function(op){
        op.changes.forEach(function(chg){
          merge_children(chg);
        })
      })
    }

    // Merge result_meta txChangesBefore children
    if(path == '$.result_meta.v2.txChangesBefore'){
      value.forEach(function(chg){
        merge_children(chg);
      })
    }
    */

    // Merge results' children
    if(property == 'results'){
      value.forEach(function(res){
        Object.values(res).forEach(function(rchild){
          merge_children(rchild);
        })
      })

      return;
    }

    // Merge data up
    if(property == 'data'){
      merge_up(prent, 'data')
      return;
    }

    // Merge body up
    if(property == 'body'){
      merge_up(prent, 'body')
      return;
    }

    // Merge tr up
    if(property == 'tr'){
      merge_up(prent, 'tr')
      return;
    }
  })

  return tx
}

module.exports = {
  simplify,

  // Exported for tests,
  // not part of public API:
  obj_keys,
  traverse,
  merge_up,
  merge_children
}
