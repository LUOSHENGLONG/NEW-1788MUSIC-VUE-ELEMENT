<template>
  <div class="nav-header" style="" v-show="show">
    <el-container>
        <el-menu 
        class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/" style="padding: 0;width:100px;border:none" @click="goHome">
                <img src="@/assets/images/logo.png" alt="" title="首页" class="logo">
            </el-menu-item>

            <el-menu-item index="1" class="hidden-sm-and-down" @click="goHome">首页</el-menu-item>
            
            <el-menu-item index="2" @click="goPage('last')" class="hidden-sm-and-down">最新</el-menu-item>

            <el-submenu index="4" style="text-align:center">
                <template slot="title">资源类型</template>
                <el-menu-item index="4-1" @click="goPage('synthesizer')">合成器</el-menu-item>
                <el-menu-item index="4-2" @click="goPage('effects')">效果器</el-menu-item>
                <el-menu-item index="4-3" @click="goPage('samplePack')">采样包</el-menu-item>
                <el-menu-item index="4-4" @click="goPage('host')">宿主</el-menu-item>
                <el-menu-item index="4-5" @click="goPage('tutorial')">教程</el-menu-item>
                <el-menu-item index="4-6" @click="goPage('kontakt')">Kontakt</el-menu-item>
                <el-menu-item index="4-7" @click="goPage('project')">工程</el-menu-item>
                <el-menu-item index="4-8" @click="goPage('preset')">预置</el-menu-item>
                <el-menu-item index="4-9" @click="goPage('midi')">MIDI</el-menu-item>
            </el-submenu>
            
            <el-menu-item index="5" style="float:right;padding:0 2px;" @click="isRegisterShow = true" v-if="!isAuthenticated">注册</el-menu-item>

            <el-menu-item index="6" @click="isLoginShow = true" style="float:right;" v-if="!isAuthenticated">登录</el-menu-item>
            <el-menu-item index="" style="float:right;padding-right:0;padding-left: 10px;" v-if="isAuthenticated">
                <span class="el-dropdown-link" @mouseover="openDropMenu">
                    {{ user.nickname }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <ul class="dropdown-menu" ref="menu" @mouseleave="closeDropMenu">
                    <li class="dropdown-info">
                        <router-link to="/setting/userInfo">
                        <div class="dropdown-info-left">
                            <img :src="avatar" alt =".." class="img-info-circle" >
                        </div>
                        <div class="dropdown-info-right">
                            <p>{{ user.nickname }}</p>
                            <p>{{ user.email }}</p>
                        </div>

                        </router-link>
                    </li>
                    <li>
                        <router-link to="/setting/userInfo">
                            <img src="@/assets/svg/header/user.svg" alt="" class="img-left">
                            <span>个人中心</span>
                            <img src="@/assets/svg/header/right.svg" alt="" class="img-right">
                        </router-link>
                    </li>
                    
                    <!-- <li>
                        <router-link to="/setting/updateAvatar">
                        <img src="@/assets/svg/header/setting.svg" alt="" class="img-left">
                        <span>资料设置</span>
                        <img src="@/assets/svg/header/right.svg" alt="" class="img-right">
                        </router-link>
                    </li> -->
                    
                    
                    <li @mouseover="showQRCode" @mouseout="hiddenQRCode">
                        <a href="javascript: void(0)" style="position: relative" class="weixin">
                        <img src="@/assets/svg/header/wechat.svg" alt="" class="img-left">
                        <span>微信公众号</span>
                        <img src="@/assets/svg/header/qrcode.svg" alt="" class="img-right qrcode">
                        <div class="qrcode" style="" ref="qrcode">
                        <img src="@/assets/images/qrcode.jpg" alt="" style="">
                        </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://weibo.com/u/6725785449/home" target="_blank">
                        <img src="@/assets/svg/header/weibo.svg" alt="" class="img-left">
                        <span>官方微博</span>
                        <img src="@/assets/svg/header/link.svg" alt="" class="img-right link">
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="http://space.bilibili.com/380735644?">
                        <img src="@/assets/svg/header/bilibili.svg" alt="" class="img-left bilibili">
                        <span>&nbsp;哔哩哔哩</span>
                        <img src="@/assets/svg/header/link.svg" alt="" class="img-right link">
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://www.instagram.com/1788music/">
                        <img src="@/assets/svg/header/ins.svg" alt="" class="img-left ins">
                        <span>&nbsp;Instagram</span>
                        <img src="@/assets/svg/header/link.svg" alt="" class="img-right link">
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://www.youtube.com/channel/UC-zwZZMXX34hGRanbZ6rMDg">
                        <img src="@/assets/svg/header/youtube.svg" alt="" class="img-left">
                        <span>Youtube</span>
                        <img src="@/assets/svg/header/link.svg" alt="" class="img-right link">
                        </a>
                    </li>
                    <li>
                        <router-link to="/sundry/feedback">
                        <img src="@/assets/svg/header/send.svg" alt="" class="img-left send">
                        <span>发送反馈</span>
                        <img src="@/assets/svg/header/right.svg" alt="" class="img-right">
                        </router-link>
                    </li>
                    <li>
                        <router-link target="_blank" to="/sundry/help">
                        <img src="@/assets/svg/header/help.svg" alt="" class="img-left">
                        <span>帮助</span>
                        <img src="@/assets/svg/header/right.svg" alt="" class="img-right">
                        </router-link>
                    </li>
                    <li>
                        <router-link target="_blank" to="/sundry/sponsor">
                        <img src="@/assets/svg/header/sponsor.svg" alt="" class="img-left">
                        <span>赞助</span>
                        <img src="@/assets/svg/header/right.svg" alt="" class="img-right">
                        </router-link>
                    </li>
                    <li role="separator" class="divider"></li>
                    <li @click="logout" id="logout">
                        <a href="#" >
                        <img src="@/assets/svg/header/logout.svg" alt="" class="img-left logout">
                        <span>注销</span>
                        </a>
                    </li>
                </ul>
            </el-menu-item>

            <el-menu-item index="" style="float:right;padding-right:0;" v-if="isAuthenticated">
                <router-link to='/setting/userInfo'>
                <img :src="avatar" alt="" class="avatar">
                </router-link>
            </el-menu-item>

            <el-menu-item index="" style="float:right;padding-right:0;" v-if="isAuthenticated" class="hidden-sm-and-down">
                <button class="contributeBtn">
                    <span @click="goContribute"><i class="el-icon-edit"></i>投稿</span>
                </button>
            </el-menu-item>

            <el-menu-item index="" style="border:none;float:right;" class="hidden-sm-and-down">
                <el-input
                placeholder="请输入内容"
                v-model="search"
                >
                <i
                    class="el-icon-search el-input__icon"
                    slot="suffix"
                    @click="handleIconClick">
                </i>
                </el-input>
            </el-menu-item>
        </el-menu>
    </el-container>
    
    <login :isLoginShow=isLoginShow @switchLogin="switchLogin" @closeLogOpenReg="closeLogOpenReg" @closeLogAndReg="closeLogAndReg"></login>
    <register :isRegisterShow=isRegisterShow @switchRegister="switchRegister" @closeRegOpenLog="closeRegOpenLog" @closeLogAndReg="closeLogAndReg"></register>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'
    export default {
        
        data() {
            return {
                search: '',
                isLoginShow: false,
                isRegisterShow: false,
                show: true
            };
        },
        computed: {
            isAuthenticated() {
                // console.log(this.$store.state.isAuthenticated)
                return this.$store.state.isAuthenticated
            },
            user() {
                return this.$store.state.user
            },
            avatar() {
                // console.log(this.$store.state.user)
                return 'http://localhost:3006' +  this.$store.state.user.avatar
            }
        },
        mounted() {

        },
        methods: {
            
            showQRCode() {
                this.$refs.qrcode.style.display = 'block'
            },
            hiddenQRCode() {
                this.$refs.qrcode.style.display = 'none'
            },
            go(path) {
                this.$router.push({path: path})

            },
            goContribute() {
                this.$router.push({path: '/contribution'})
            },
            
            goPage(type) {

                const { href } = this.$router.resolve({
                    path: '/article',
                    query: {
                            type: `${type}`,
                            page_index: 1,
                            page_size: 10,
                            search: 'null'
                        }
                })
                window.open(href, '_blank')
            },
           
            goHome() {
                this.$router.push({path: '/'})
            },
            logout() {
                // if (sessionStorage.token) sessionStorage.removeItem("token");
                if (localStorage.token ) localStorage.removeItem("token");
                this.$store.dispatch('clearCurrentState')
                this.$message({
                    type: 'success',
                    message: '已退出当前账号'
                })
                setTimeout(() => {
                    this.$('.register').click()
                }, 1);
                // this.$axios.post('/api/users/logout')
                //     .then( result => {
                //         this.$store.dispatch('clearCurrentState')
                //         this.$message({
                //             type: 'success',
                //             message: '已退出当前账号'
                //         })
                //         setTimeout(() => {
                //             this.$('.register').click()
                //         }, 1200);
                //     })

                
            },
            handleIconClick() {
                // console.log(this.search)
                if ( this.search.trim() == null || this.search.trim() == '' ) {
                    this.$message({
                        type: 'warning',
                        message: '请输入搜索内容'
                    })
                    return
                }

                // window.location.href=`http://localhost:8080/#/article?type=last&page_index=1&page_size=10&search=${this.search}`;
                this.$router.push({path: '/article', query: {
                    type: 'last',
                    page_index: 1,
                    page_size: 10,
                    search: this.search
                }})
            },
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            },
            switchLogin() {
                this.isLoginShow = !this.isLoginShow
            },
            switchRegister() {
                this.isRegisterShow = !this.isRegisterShow
            },
            closeLogOpenReg() {
                this.isLoginShow = false
                this.isRegisterShow = true
            },
            closeRegOpenLog() {
                this.isLoginShow = true
                this.isRegisterShow = false
            },
            closeLogAndReg() {
                this.isLoginShow = false;
                this.isRegisterShow = false;
            },
            openDropMenu() {
                this.$refs.menu.style.display = "block"
            },
            closeDropMenu() {
                this.$refs.menu.style.display = "none"
            }
        },
        components: {
            Login,
            Register
        },
        
    }
</script>

<style lang="scss" scoped>

@media screen and (min-width: 2800px) and (max-width: 3440px) {
    .el-menu-demo {
        padding: 0 20% !important;
        transition: all 0.3s ease;
    }
    .el-menu-demo {
        width: 60% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 2550px) and (max-width: 2800px) {
    .el-menu-demo {
        padding: 0 15% !important;
        transition: all 0.3s ease;
    }
    .el-menu-demo {
        width: 70% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 2250px) and (max-width: 2550px) {
    .el-menu-demo {
        padding: 0 10% !important;
        transition: all 0.3s ease;
    }
    .el-menu-demo {
        width: 80% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 1500px) and (max-width: 2250px) {
    .el-menu-demo {
        padding: 0 6% !important;
        transition: all 0.3s ease;
    }
    .el-menu-demo {
        width: 88% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1500px) and  (min-width: 1200px) {
    .el-menu-demo {
        padding: 0 5% !important;
        transition: all 0.3s ease;
    }
    .el-menu-demo {
        width: 90% !important;
        transition: all 0.3s ease;
    }
}
@media screen and (max-width: 1200px) {
    .el-menu-demo {
        padding: 0 1% !important;
        transition: all 0.3s ease;
    }
    .el-menu-demo {
        width: 98% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1200px) and  (min-width: 992px) {
    .el-menu-demo {
        padding: 0 3% !important;
        transition: all 0.3s ease;
    }
    .el-menu-demo {
        width: 94% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (max-width: 992px) {
   
    .el-menu-demo {
        padding: 0 2% !important;
        transition: all 0.3s ease;
    }
    .el-menu-demo {
        width: 96% !important;
        transition: all 0.3s ease;
    }
    .dropdown-menu {
        width: 240px !important;
        li {
            a {
                width: 240px !important;
            }
        }
    }
}
.nav-header {
    margin-bottom: 80px;
}
.el-container {
    /* padding: 0 20%; */
    text-align: center;
}
.el-menu-demo {
    width: 100%;
    position:fixed;
    z-index:99;
    top:0;
    padding: 0 10%;
    width:80%;
    height: 60px;
    box-shadow: 0 6px 30px rgba(236, 236, 236, 0.938);
}
.logo {
    width: 100%;
    margin-left: -10px;
}

.avatar {
    width: 35px;
    height: 35px;
    margin-right: 2px;
    border-radius: 50%
}
.dropdown-menu {
    display: none;
    border: none;
    padding: 0;
    width: 300px;
    position: absolute;
    top: 61px;
    right: 0px;
    background-color: #fff;
    height: 560px;
    box-shadow: 0 6px 50px rgba(0, 0, 0, 0.144);
    border-radius: 4px;
    // overflow: hidden;
    li:hover {
        background-color: #eee;
    }
    li:first-child:hover {
        background-color: #fafafa;
        transition: all .5s ease;
        
    }
    li:last-child:hover {
        background-color: #fff;
        
    }
    li {
        margin: 6px 0;
        height: 40px;
        a {
            display: block;
            width: 300px;
            height: 40px;
            border: 0;
            margin: 0 auto;
            // padding: 4px 0;
            color: #333 !important;
            line-height: 40px;
            text-align: left;
            font-size: 16px;
            span {
                color: #333 !important;
                font-size: 16px;
                float: left;
            }
            .img-left {
                width: 30px;
                height: 30px;
                vertical-align: -10px;
                float: left;
                margin-top: 6px; 
                margin-right: 15px;
                margin-left: 20px;
            }
            .img-right {
                width: 16px;
                height: 16px;
                float: right;
                margin-top: 12px; 
                margin-right: 20px;
            }
            .qrcode, .link {
                width: 24px;
                height: 24px;
                float: right;
                margin-top: 8px; 
                margin-right: 20px;
            }
            .logout {
                width: 26px;
                height: 26px;
                margin-top: 6px; 
                margin-left: 24px;
            }
            .send {
                width: 26px;
                height: 26px;
                margin-top: 8px; 
                margin-left: 22px;
            }
            .ins {
                width: 28px;
                height: 28px;
                margin-top: 6px; 
                margin-left: 22px;
                margin-right: 10px;
            }
            .bilibili {
                width: 34px;
                height: 34px;
                margin-top: 0px; 
                margin-left: 18px;
                margin-right: 10px;
            }
        }
        
    }
    
    .divider {
        height: 1px ;
        margin: 9px 0;
        overflow: hidden;
        background-color: #e5e5e5;
    }
    .dropdown-info {
        margin: 0;
        padding: 6px 20px;
        background-color: rgba(238, 238, 238, 0.582);
        text-align: center;
        position: relative;
        overflow: hidden;
        height: 60px;
        a {
            height: 40px;
            border: 0;
            margin: 0 auto;
            padding: 4px 0;
            color: #333 !important;
            line-height: 40px;
            padding: 0 26px;
            text-align: left;
            font-size: 16px;
            .dropdown-info-left {
                position: absolute;
                left: 15px;
                top: 16px;
                width: 48px;
                height: 48px;
                .img-info-circle {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                }
            }
            .dropdown-info-right {
                text-align: left;
                position: absolute;
                overflow: hidden;
                left: 78px;
                top: 8px;
                p:first-child {
                    margin: 0;
                    font-weight: 700;
                    margin: 0;
                    height: 30px;
                }
                p:last-child {
                    font-size: 14px;
                    width: 200px;
                    margin: 0;
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
    }

}
.el-menu--horizontal .el-menu-item.is-active {
    border-bottom: 0 !important; 
    color: #909399;
}
.el-menu--horizontal .el-menu-item:hover, el-submenu:hover {
    color: #409EFF;
}
.contributeBtn {
    border: 0;
    margin-top: 4px;
    height: 38px;
    width: 76px;
    background-color: #409EFF;
    border-radius: 4px;
    cursor: pointer;
    span {
        color: #fff;
        margin-left: -6px;
    }
}
.el-icon-edit {
    color: #fff;
    margin-left: -3px;
    vertical-align: -1px;
}

div.qrcode {
    display: none;
    position: absolute;
    top: -10px;
    left: -152px;
    width: 150px;
    height: 165px;
    border-radius: 4px;
    img {
        width: 150px;
        height: 165px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
}






</style>
