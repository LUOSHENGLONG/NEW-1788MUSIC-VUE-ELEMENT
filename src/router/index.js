import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Article from '@/views/Article'
import ArticleInfo from '@/views/ArticleInfo'
import Setting from '@/views/Setting'
import UserCenter from '@/views/UserCenter'
import NotFound from '@/views/NotFound'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/article', name: 'Article', component: Article },
        { path: '/articleInfo/:id', name: 'ArticleInfo', component: ArticleInfo },
        { path: '/setting/:type', name: 'Setting', component: Setting },
        { path: '/uesrCenter', name: 'UserCenter', component: UserCenter },
        { path: '/notFound', name: 'NotFound', component: NotFound },
    ]
})

export default router

