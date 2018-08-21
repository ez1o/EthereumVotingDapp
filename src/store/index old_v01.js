import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import getContract from '../util/getContract'
// import getContract from '@/components/voting-component'

Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance (state, payload) {
      
      console.log('registerWeb3instance Mutation being executed', payload)
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
      pollWeb3()
      // LETTURA DATI CONTRATTO
      // lettura array indice
      state.callinfo = new Array (6)
      state.contractInstance().info({
      }, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Dati info: ', result)
          state.callinfo = result
          console.log('lunghezza array candidati: ', parseInt(state.callinfo[5]))

          // lettura nomi candidati (dopo che state.callinfo[5] è stato letto)
          state.callnomi = new Array ()         
          for (let id=0; id<parseInt(state.callinfo[5]); id++) { 
          // sleep a little time
          // var start = new Date().getTime(); for (var e=0; e<1e7; e++) {if((new Date().getTime()-start)>200) break}                
            state.contractInstance().nome_candidato_da_indice(id, {
            }, (err, result) => {
              if (err) {
                console.log(err)
              } else {
                // Use 'splice' to activate trigger update in array
                state.callnomi.splice(id, 1, result)
                // Covert %20 to SPACE in the string
                state.callnomi[id] = unescape (state.callnomi[id])
                //console.log('Candidato:', id, ' -  Nome:', state.callnomi[id])
              }
            })
          }

          // lettura voti finali nella fase 3 (dopo che state.callinfo[5] è stato letto)
          state.callvoti = new Array ()
          for (let id=0; id<parseInt(state.callinfo[5]); id++) { 
            state.contractInstance().candidati_e_voti(id, {
            }, (err, result) => {
              if (err) {
                console.log(err)
              } else {
                // Use 'splice' to activate trigger update in array
                //console.log('candidato:', id, ' -  variabile result:', result)
                let arraycan = result
                let nomec = unescape(arraycan[0])
                let votoc = parseInt(arraycan[1])
                //console.log('arraycan[0]: ',nomec)
                //console.log('arraycan[1]: ',votoc)
                let nomevoto = nomec + ": " + votoc + " voti"
                console.log(nomevoto)
                state.callvoti.splice(id, 1, nomevoto)
                
                // Covert %20 to SPACE in the string
                //state.callvoti[id] = unescape (state.callnomi[id])
                //console.log('candidato:', id, ' -  variabile callvoti:', state.callnomi[id])
              }
            })
          }  
          console.log('state.callvoti: ', state.callvoti)

        }
      })
      // lettura address proprietario
      state.contractInstance().proprietario({
      }, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Address proprietario: ', result)
          state.callprop = result
        }
      })
      // FINE LETTURA DATI
    },
    pollWeb3Instance (state, payload) {
      console.log('pollWeb3Instance mutation being executed', payload)
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
    },
    registerContractInstance (state, payload) {
      console.log('Voting contract instance: ', payload)
      state.contractInstance = () => payload
    }
  },
  actions: {
    registerWeb3 ({commit}) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },
    pollWeb3 ({commit}, payload) {
      console.log('pollWeb3 action being executed')
      commit('pollWeb3Instance', payload)
      
      if (state.votook) {state.Votato = "Il voto è stato registrato sulla blockchain"}
      else {state.Votato = "Nessun voto è stato espresso"}
    },
    getContractInstance ({commit}) {
      getContract.then(result => {
        commit('registerContractInstance', result)
      }).catch(e => console.log(e))
    }
  },
})
