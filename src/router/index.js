import Vue from 'vue'
import Router from 'vue-router'
import VotingDapp from '@/components/voting-dapp'
Vue.use(Router)
console.log('check')
export default new Router({
  routes: [{
    path: '/',
    name: 'voting-dapp',
    component: VotingDapp
  }]
})
