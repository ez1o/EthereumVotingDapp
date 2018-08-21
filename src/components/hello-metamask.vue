<template>

  <div class="metamask-info container">
    <img src="../assets/uninettuno.png">
    <p v-if="isInjected" id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> Metamask installato</p>
    <p v-else id="no-metamask"><i aria-hidden="true" class="fa fa-times"></i> Metamask non rilevato</p>
    <p v-if="isInjected==false" style="font-size:150%; line-height: 300%">Metamask è necessario per il funzionamento di questa interfaccia</p>       
    <p v-if="isInjected==false" style="font-size:100%" >
      Scarica Metamask da <a href="https://metamask.io/" target="_blank"><u>QUI</u></a>
    </p>    
    <p v-if="isInjected"> Account attivo: {{ coinbase }}</p>
    <p v-if="isInjected">Network: {{ network }}</p>
    <p v-if="isInjected">Saldo dell'account attivo: {{ ethBalance }} ether</p>
    <p v-if="isInjected">Smart Contract: {{ ad }} </p>
    <p v-if="isInjected">Owner: {{ this.$store.state.callprop }} </p>  
    <hr width=50% v-if="isInjected">
  </div>
  
</template>

<script>
import {NETWORKS} from '../util/constants/networks'
import {mapState} from 'vuex'
import {address} from '@/util/constants/votazContract'

export default {
  name: 'hello-metamask',
  computed: mapState({
    isInjected: state => state.web3.isInjected,
    network: state => NETWORKS[state.web3.networkId],
    coinbase: state => state.web3.coinbase,
    balance: state => state.web3.balance,
    ad: state => state.ad,
    ethBalance: state => {
      if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
    }
  })
}
</script>

<style scoped>
.metamask-info {
  text-align:center;
  line-height: 55%;
  font-size: 85%;
}
#has-metamask {
  color: green;
}
#no-metamask {
  color:red;
}</style>
