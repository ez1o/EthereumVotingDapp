import Web3 from 'web3'
// import {ABI, address} from './constants/votazContract'
import state from '../store/state'
// var addr = '0x8cdaf0cd259887258bc13a92c0a6da92698644c0'
/* var addr = VotingComponent.address */
// import {address} from '@/components/voting-component'
// import {b} from '@/components/voting-component'

// window.a = "init"
var getContract = new Promise(function (resolve, reject) {
  var web3 = new Web3(window.web3.currentProvider)
  var votazContract = web3.eth.contract(state.ABI)
  // console.log('votazContract addr: : ', addr)
  var votazContractInstance = votazContract.at(state.ad)
  console.log('votazContract: ', votazContract)
  console.log(votazContractInstance)
  resolve(votazContractInstance)
}) 

export default getContract 
