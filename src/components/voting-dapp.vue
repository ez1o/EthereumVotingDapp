<template>
  <div>
    <hello-metamask/>
    <voting-component/>
</div>
</template>
<script>
import HelloMetamask from '@/components/hello-metamask'
import VotingComponent from '@/components/voting-component'
export default {
  name: 'voting-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from voting-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'voting-component': VotingComponent
  }
}
</script>
<style scoped>
</style>
