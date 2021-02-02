const StellarSdk = require('stellar-sdk')
const xdr_to_json = require('json-xdr').toJSON

// Recursive traverse object, calling callback
function traverse(obj, callback, path){
  if(!path) path = '$'

  var keys = Object.keys(obj);
  var index = 0
  for (; index < keys.length; index += 1) {
    const property = keys[index]
    if (obj.hasOwnProperty(property)) {
      const value = obj[property];
      const current = path + '.' + property;

      // Invoke callback with:
      // - current property
      // - current property path
      // - current property value
      // - parent object
      const refresh = callback(property, current, value, obj)

      // If callback returns a 'truthy' value, refresh the keys
      // at this level and reiterate
      if(refresh){
        keys = Object.keys(obj)
        index = -1;

      }else if(typeof obj[property] == "object")
        traverse(value, callback, current);
    }
  }
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
  tx.result_meta = xdr_to_json(StellarSdk.xdr.TransactionMeta.fromXDR(tx.result_meta_xdr,  'base64'));
  tx.result      = xdr_to_json(StellarSdk.xdr.TransactionResult.fromXDR(tx.result_xdr,     'base64'));
  // TODO how to convert fee_meta_xdr ?

  // Delete XDR fields
  delete tx.envelope_xdr
  delete tx.result_meta_xdr
  delete tx.result_xdr
  delete tx.fee_meta_xdr

  // iterate over transaction
  traverse(tx, function(property, path, value, prent){
    // delete undefined / null values
    if(value == undefined || value == null){
      delete prent[property];
      return;
    }

    // XDR unions: Remove _type, move arm up
    if(value._type){
      var type = value._type;
      var keys = Object.keys(value)
      keys.splice(keys.indexOf('_type'), 1)

      if(keys.length == 0)
        prent[property] = value = value._type;
      else if(!Array.isArray(value[keys[0]]))
        prent[property] = value = value[keys[0]];

      value.__type = type;
      delete value._type;
    }

    // remove ext fields
    delete value.ext

    // Merge data up
    if(property == 'data'){
      Object.assign(prent, value)
      delete prent.data
      return true;
    }

    // Merge body up
    if(property == 'body'){
      Object.assign(prent, value)
      delete prent.body
      return true;
    }

    try{
      // Convert assetCodes from xdr to strings
      if(path.substring(path.length - 19, path.length) == "alphaNum4.assetCode")
        prent[property] = StellarSdk.xdr.AssetCode4.fromXDR(value,  'base64').toString().replace(/\0/g, '')
      if(path.substring(path.length - 20, path.length) == "alphaNum12.assetCode")
        prent[property] = StellarSdk.xdr.AssetCode12.fromXDR(value,  'base64').toString().replace(/\0/g, '')

      // Convert ED25519 keys to common addresses
      if(path.substring(path.length - 6,  path.length) == "issuer"        ||
         path.substring(path.length - 13, path.length) == "sourceAccount" ||
         path.substring(path.length - 8,  path.length) == "sellerId"      ||
         path.substring(path.length - 9,  path.length) == "accountId")
        prent[property] = (new StellarSdk.Keypair({type: "ed25519", publicKey: Buffer.from(value, 'base64')})).publicKey()

    // XXX: Catch err in case of multiple conversion.
    // Needed as these fields may be reprocessed if a data or body
    // field is encountered after initial processing, figure out
    // a better way to do this
    }catch(err){
    }

    // Convert price to single value
    if(property == 'price' && value.n && value.d)
      prent[property] = value.n / value.d;
  })

  return tx
}

module.exports = {
  simplify,

  // Exported for tests,
  // not part of public API:
  traverse
}
