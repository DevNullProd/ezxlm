//!/usr/bin/node
// Example ezxlm usage

// Import Dependencies
const StellarSdk = require('stellar-sdk')
const { simplify } = require("./lib/index")
const util = require('util')

// Initiate connection to XLM horizon server
const sdk = new StellarSdk.Server('https://horizon.stellar.org');

// Streaming transaction example
sdk.transactions()
   .cursor('now')
   .stream({
     onmessage : function(tx){
       console.log("")
       console.log("=====================")

       console.log("Original:")
       console.log(util.inspect(tx, {colors: true, depth: null}))

       const simplified = simplify(tx)
       console.log("Simplified:")
       console.log(util.inspect(simplified, {colors: true, depth: null}))
     }
   })

// One off transaction example
//sdk.transactions()
//   //.transaction("44bd6b745f38d43ca59b6d781038271a4baff7637ef0adb5a2295b6bac916c8f")
//   //.transaction("9f20f040817cc74c01075482cafd2847e49fcf182894c5f44cc83aa7f2ba4312")
//   //.transaction("cd336ffd7b523c3fd797ae90db9842cfc37147272f9de59f2d70702daccfee67")
//   //.transaction("c221a5f212f88e59fde26273e7a8b25ac2d41f04d65262357f7a6c4d8372670c")
//   //.transaction("51492c04209bf9852cc1dcf4120fe5d9607392e7e616df75f90010a51a7a7719")
//   .call()
//   .then(function(tx){
//     const simplified = simplify(tx)
//
//     console.log("Original:")
//     console.log(util.inspect(tx, {colors: true, depth: null}))
//
//     console.log("Simplified:")
//     console.log(util.inspect(simplified, {colors: true, depth: null}))
//   })
