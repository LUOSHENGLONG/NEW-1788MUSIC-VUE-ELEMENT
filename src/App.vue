<template>
    <div id="app" ref="app">
        <router-view/>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>

import jwt_decode from 'jwt-decode'

export default {
    name: 'App',
    computed: {
        getWidth() {
            let width = document.documentElement.clientWidth
            
            return window.onresize = () => {
                return width = document.documentElement.clientWidth
            }
        }
    },
    created() {
        
        // if ( sessionStorage.token ) {
        //     const decode = jwt_decode(sessionStorage.token)
        //     // 存储数据
        //     this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode))
        //     this.$store.dispatch("setUser", decode)
        //     return
        // }
        // if ( localStorage.token ) {
        //     const decode = jwt_decode(localStorage.token)
        //     // 存储数据
        //     this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode))
        //     this.$store.dispatch("setUser", decode)
        // }
        this.isLogin()
    },
    mounted() {
        
    },
    methods: {
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        },
        isLogin() {
            if(!localStorage.token) return;
            this.$axios.post('/api/users/isLogin',{token:localStorage.token})
                .then(result => {
                    // console.log(result)
                    const { code, msg, data } = result.data

                    // 未登录
                    if ( code === 0 ) {
                        if(localStorage.token) localStorage.removeItem('token');
                        return
                    }
                    // 已登录 解析token
                    if ( code === 1 ) {
                        const decode = jwt_decode(localStorage.token)
                        // console.log(decode)
                        // 存储数据
                        this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode))
                        this.$store.dispatch("setUser", decode)
                    }
                })
        }
    }
}
</script>

<style>

body, textarea, input, select, section {
    color: rgb(68, 68, 68);
    font-size: 14px;
    line-height: 1.8;
    font-weight: normal;
    font-family: "Open Sans", Arial, "Hiragino Sans GB", "Microsoft YaHei", STHeiti, "WenQuanYi Micro Hei", SimSun, sans-serif;
    -webkit-font-smoothing: antialiased;
    margin: 0px;
    padding: 0px;
}
#app {
    /* background-color: #fcfcfc; */
  
}
.pos {
    left: 50%;
    transform: translateX(-50%)
}
</style>
