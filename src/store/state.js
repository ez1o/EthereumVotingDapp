let state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null
  },
  contractInstance: null,
  Votato: null,
  ad: null,
  ABI: null,
  callinfo: new Array (6),
  callnomi: null,
  callvoti: null,
  callprop: null,
  votook: false,
  votoclick: false,
  pending: false
}
export default state
