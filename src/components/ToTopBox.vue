<template>
    <div class="totop">
        <ul>
            <li @click="goSetting">
                <img src="@/assets/svg/header/setting.svg" alt="" title="设置">
            </li>
            <li @click="goUser">
                <img src="@/assets/svg/user.svg" alt="" title="个人中心">
            </li>
            <li @click="goHome">
                <img src="@/assets/svg/home.svg" alt="" title="首页">
            </li>
            <li @click="totop">
                <img src="@/assets/svg/top.svg" alt="" title="回到顶部">
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    methods: {
        goSetting() {
            if( this.$store.state.isAuthenticated == true) {
                this.$router.push({path: '/setting'})
            } else {
                this.$notify({
                    title: '跳转设置页失败',
                    message: '请登录后操作',
                    type: 'error'
                });
            }
        },
        goUser() {
            if( this.$store.state.isAuthenticated == true) {
                this.$router.push({path: '/userCenter'})
            } else {
                this.$notify({
                    title: '跳转个人中心页失败',
                    message: '请登录后操作',
                    type: 'error'
                });
            }
        },
        goHome() {
            this.$router.push({path: '/'})
        },
        totop() {
            window.scrollTo(0, 0)
        }
    }
}
</script>

<style lang="scss" scoped>
.totop {
    height: 220px;
    width: 60px;
    background-color: #fff;
    float: right;
    right: 0;
    position: fixed;
    bottom: 50px;
    border-radius: 4px;
    overflow: hidden;

    ul {
        padding: 0;
        li {
            height: 45px;
            width: 60px;
            padding-top: 10px;
            text-align: center;
            cursor: pointer;
            img {
                width: 28px;
                height: 28px;
            }
        }
        
        li:hover {
            img {
                width: 30px;
                height: 30px;
            }
        }
    }
}
</style>
