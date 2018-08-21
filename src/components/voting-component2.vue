
<template>
  <div class="votazCss container">
    <h3>Votazione Decentralizzata</h3>
   <div>
     <table>
      <tr>
        <td>
          <div class="votazCss" style="text-align:right">
            <input 
            style="width: 100px; text-align:center"
            v-model="id"
            type="text"
            placeholder="Inserisci ID"
            id="txtName"
            @keyup.enter="updateTastoInvio"
            >
          </div>
        </td>
        <td>
          <div class="votazCss" style="text-align:left">
          <button v-on:click="clickVota" class="votazCss btn btn-primary">Vota</button>
          </div>
        </td>
      </tr>
     </table>
    <p>id: {{ id }}</p>
    <div class="votazCss">
            <input 
            style="width: 350px; text-align:center"
            v-model="$store.state.ad"
            type="text"
            placeholder="Indirizzo contratto"
            id="txtName"
            @keyup.enter="updateInvioAddr"
            >
          </div>
    <p>{{this.$store.state.Votato}}</p>
    <p>{{nomevoto}}</p>
    
  </div>
  </div>
</template>

<script>
/* eslint-disable */
import {mapState} from 'vuex'

export default {
  name: 'voting',
  a: 22,
  data () {
    return {
      amount: null,
      pending: false,
      winEvent: null,
      id: '',
      nomevoto: '',
      ad: '0xf67fa5c01c5f0e1bfc0058c3d1429704e90ef41c'
     }
  },
  computed: mapState({
    ad: state => state.ad
  }),
  methods: {
    updateInvioAddr (event) {
      console.log('Invio address contract')
      // this.ad = this.contrtext

      this.$store.dispatch('getContractInstance')


    },
    updateTastoAggiorna (event) {
      console.log("TASTONE PREMUTOOOO: ", VotingComponent.id)
      // address = this.address
    },
    updateTastoInvio (event) {
      this.$store.dispatch('getContractInstance')
      console.log("TASTO INVIO: ", this.id)
      var getContract = new Promise(function (resolve, reject) {
        // var web3 = new Web3(window.web3.currentProvider)
        var votazContract = web3.eth.contract(state.ABI)
        var votazContractInstance = votazContract.at(this.id)
        console.log(votazContractInstance)
        resolve(votazContractInstance)
      }) 
      this.$store.dispatch('getContractInstance')

    },
    clickVota (event) {
      console.log('dispatching getContractInstance')
      // this.$store.dispatch('getContractInstance')
      // 
      this.winEvent = null
      this.pending = true
      this.$store.state.contractInstance().vota_un_candidato(this.id, {
        gas: 300000,
        value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          let evento = this.$store.state.contractInstance().Success()
          evento.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
              this.nomevoto = "Il voto non è stato inviato."
            } else {
              this.winEvent = result.args
              console.log('Status: ', this.winEvent._status)
              console.log('Nome Candidato: ', this.winEvent.cand)
              this.pending = false
              this.nomevoto = "Il voto è andato a buon fine. Hai votato per: " + this.winEvent.cand
            }
          })
        }
      })
    }
  },
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  }
}
//  export {address}
</script>

<style scoped>
.votazCss {
     /*margin-top: 50px;*/
     text-align:center;
}
/*#loader {
  width:150px;
}*/
/*ul {
    margin: 25px;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap:25px;
    grid-row-gap:25px;
}
li{
    padding: 20px;
    margin-right: 5px;
    border-radius: 50%;
    cursor: pointer;
    background-color:#fff;
    border: -2px solid #bf0d9b;
    color: #bf0d9b;
    box-shadow:3px 5px #bf0d9b;
}
li:hover{
    background-color:#bf0d9b;
    color:white;
    box-shadow:0px 0px #bf0d9b;
}
li:active{
    opacity: 0.7;
}
*{
   color: #444444;
}
#has-won {
  color: green;
}
#has-lost {
  color:red;
}*/
</style>
