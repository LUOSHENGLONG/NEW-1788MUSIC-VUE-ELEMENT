<template>
    <div class="totop">
        <ul ref="totopul" class="totopul">
            <li @click="goContribution">
                <i class="el-icon-edit"></i>
            </li>
            <li @click="goSetting">
                <img src="@/assets/svg/user.svg" alt="" title="个人中心">
            </li>
            <li @click="goHome">
                <img src="@/assets/svg/home.svg" alt="" title="首页">
            </li>
            <li @click="totop">
                <img src="@/assets/svg/top.svg" alt="" title="回到顶部">
            </li>
            
        </ul>

        <i @click="switchShow" class="el-icon-menu"></i>
    </div>
</template>
<script>
export default {
    methods: {
        switchShow() {
            console.log()
            if( this.$(this.$refs.totopul).css('display') == 'block') {
                this.$refs.totopul.style.display = 'none'
            } else {
                this.$refs.totopul.style.display = 'block'
            }
        },
        goSetting() {
            if( this.$store.state.isAuthenticated == true) {
                this.$router.push({path: '/setting/userInfo'})
            } else {
                this.$notify({
                    title: '跳转个人中心页失败',
                    message: '请登录后操作。',
                    type: 'error'
                });
            }
        },
        goContribution() {
            if( this.$store.state.isAuthenticated == true) {
                this.$router.push({name: 'Contribution'})
            } else {
                this.$notify({
                    title: '跳转投稿页失败',
                    message: '请登录后操作。',
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
    height: 250px;
    width: 60px;
    float: right;
    right: 0;
    position: fixed;
    bottom: 50px;
    border-radius: 4px;
    overflow: hidden;
    .el-icon-menu {
        position: absolute;
        bottom: 0;
        font-size: 28px;
        margin-left: 16px;
        cursor: pointer;
        color: #409EFF;
    }
    ul {
        display: block;
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
            i {
                font-size: 30px;
                color: #555;
            }
        }
        
        li:hover {
            img {
                width: 30px;
                height: 30px;
            }
            i {
                font-size: 32px;
            }
            
            
        }
        


    }
}
</style>
