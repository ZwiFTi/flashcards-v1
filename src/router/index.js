import Vue from 'vue'
import Router from 'vue-router'
import Cards from '@/components/Cards'
import NewCard from '@/components/NewCard'
import EditCard from '@/components/EditCard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Cards',
      component: Cards
    },
    {
      path: '/cards',
      name: 'Cards',
      component: Cards
    },
    {
      path: '/cards/new',
      name: 'NewCard',
      component: NewCard
    },
    {
      path: '/posts/:id',
      name: 'EditCard',
      component: EditCard
    }
  ]
})
