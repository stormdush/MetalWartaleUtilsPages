import Vue from 'vue';
import Router from 'vue-router';
import home from '@/views/home';
import legionWar from '@/views/legionWar';
import members from '@/views/membersManger';
import battlefield from '@/views/battlefield';
import notFound from '@/views/404';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/war',
      name: 'legionWar',
      component: legionWar
    },
    {
      path: '/members',
      name: 'members',
      component: members
    },
    {
      path: '/battlefield',
      name: 'battlefield',
      component: battlefield
    },
    {
      path: '/404',
      name: 'notFound',
      component: notFound
    }
  ]
})
