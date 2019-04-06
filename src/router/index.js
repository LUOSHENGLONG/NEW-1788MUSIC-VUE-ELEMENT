import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home'
// import Article from '@/views/Article'
// import ArticleInfo from '@/views/ArticleInfo'
// import Setting from '@/views/Setting'
// import UserCenter from '@/views/UserCenter'
// import NotFound from '@/views/NotFound'
// import Contribution from '@/views/Contribution'
// import ContributionSuccess from '@/views/ContributionSuccess'
// import ContributionFail from '@/views/ContributionFail'
// import Sundry from '@/views/Sundry'
// import store from '@/store'

const Home = () => import('@/views/Home')
const Article = () => import('@/views/Article')
const ArticleInfo = () => import('@/views/ArticleInfo')
const Setting = () => import('@/views/Setting')
const UserCenter = () => import('@/views/UserCenter')
const NotFound = () => import('@/views/NotFound')
const Contribution = () => import('@/views/Contribution')
const ContributionSuccess = () => import('@/views/ContributionSuccess')
const ContributionFail = () => import('@/views/ContributionFail')
const Sundry = () => import('@/views/Sundry')
const FindPassword = () => import('@/views/FindPassword')

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/article', name: 'Article', component: Article },
        { path: '/articleInfo/:id', name: 'ArticleInfo', component: ArticleInfo },
        { path: '/setting/:type', name: 'Setting', component: Setting },
        { path: '/uesrCenter', name: 'UserCenter', component: UserCenter },
        { path: '/notFound', name: 'NotFound', component: NotFound },
        { path: '/sundry/:type', name: 'Sundry', component: Sundry },
        { path: '/contribution', name: 'Contribution', component: Contribution },
        { path: '/contribution/success', name: 'ContributionSuccess', component: ContributionSuccess },
        { path: '/contribution/fail', name: 'ContributionFail', component: ContributionFail },
        { path: '/findPassword', name: 'FindPassword', component: FindPassword },
        { path: '*', name: 'NotFound', component: NotFound },

    ]
})

router.beforeEach((to, from, next) => {
    const arr = ['/contribution', '/setting']
    let isLogin = sessionStorage.token ? true : false
    if(!isLogin) {
        isLogin = localStorage.token ? true : false
    }
    if(to.path.indexOf('/contribution') != -1 || to.path.indexOf('/setting') != -1 ) {
        isLogin ? next() : next('/')
        return
    }
    next()
})


export default router

