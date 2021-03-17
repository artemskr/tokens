import TokensList from '@/components/tokens/TokensList.vue'

export default {
  data: [
    { path: '/', component: TokensList, name: '@tokenslist' },
    { path: '/demo', component: TokensList, name: '@tokenslist' }
  ]
}
