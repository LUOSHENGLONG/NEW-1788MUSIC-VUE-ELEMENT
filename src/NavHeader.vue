<template>
  <div class="nav-header" style="">
    <el-container>
        <el-menu :default-active="activeIndex" 
        class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
            <el-menu-item index="" style="padding: 0;width:180px;border:none">
                <img src="@/assets/images/logo.png" alt="" class="logo">
            </el-menu-item>

            <el-menu-item index="/articleInfo/2">首页</el-menu-item>

            <el-submenu index="2">
                <template slot="title">音乐类型</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>

            <el-submenu index="3" style="text-align:center">
                <template slot="title">资源类型</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
                <el-menu-item index="3-3">选项3</el-menu-item>
            </el-submenu>
            
            <el-menu-item index="" style="float:right;" @click="isRegisterShow = true" v-if="!isAuthentication">注册</el-menu-item>

            <el-menu-item index="" @click="isLoginShow = true" style="float:right;" v-if="!isAuthentication">登录</el-menu-item>
            <el-menu-item index="" style="float:right;" v-if="isAuthentication">
                <el-dropdown>
                    <span class="el-dropdown-link">
                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <ul class="dropdown-menu">
                            <li class="dropdown-info">
                                <router-link to="/user/personalInfo">
                                <div class="dropdown-info-left">
                                    <img src="" alt =".." class="img-info-circle">
                                </div>
                                <div class="dropdown-info-right">
                                    <p></p>
                                    <p></p>
                                </div>

                                </router-link>
                            </li>
                            <li>
                                <router-link to="/user/personalInfo">
                                <i class="fa fa-user-circle" style="margin-right: 20px;font-size: 24px;vertical-align: -3px;"></i>
                                <span>个人中心</span>
                                <i class="fa fa-angle-right" style="font-size: 24px;float: right;margin-top:8px"></i>
                                </router-link>
                            </li>
                            
                            <li>
                                <router-link to="/setting/updateAvatar">
                                <i class="fa fa-cog" style="margin-right: 20px;font-size: 24px;vertical-align: -3px;"></i>
                                <span>资料设置</span>
                                <i class="fa fa-angle-right" style="font-size: 24px;float: right;margin-top:8px"></i>
                                </router-link>
                            </li>
                            
                            
                            <li>
                                <a href="javascript: void(0)" style="position: relative" class="weixin">
                                <i class="fa fa-weixin" style="margin-right: 20px;font-size: 24px;vertical-align: -3px;"></i>
                                <span>微信公众号</span>
                                <i class="fa fa-qrcode" style="font-size: 24px;float: right;margin-top:8px"></i>
                                <div class="qrcode" style="">
                                <img src="" alt="" style="">
                                </div>
                                </a>
                            </li>
                            <li>
                                <a href="https://weibo.com/u/6725785449/home" target="_blank">
                                <i class="fa fa-weibo" style="margin-right: 20px;font-size: 24px;vertical-align: -3px;"></i>
                                <span>官方微博</span>
                                <i class="fa fa-link" style="font-size: 20px;float: right;margin-top:8px"></i>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="http://space.bilibili.com/380735644?">
                                <i class="fa fa-tv" style="margin-right: 20px;font-size: 18px;vertical-align: -3px;"></i>
                                <span>&nbsp;哔哩哔哩</span>
                                <i class="fa fa-link" style="font-size: 20px;float: right;margin-top:8px"></i>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.instagram.com/1788music/">
                                <i class="fa fa-instagram" style="margin-right: 20px;font-size: 24px;vertical-align: -3px;"></i>
                                <span>&nbsp;Instagram</span>
                                <i class="fa fa-link" style="font-size: 20px;float: right;margin-top:8px"></i>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.youtube.com/channel/UC-zwZZMXX34hGRanbZ6rMDg">
                                <i class="fa fa-youtube" style="margin-right: 20px;font-size: 24px;vertical-align: -3px;"></i>
                                <span>Youtube</span>
                                <i class="fa fa-link" style="font-size: 20px;float: right;margin-top:8px"></i>
                                </a>
                            </li>
                            <li>
                                <router-link to="/feedback">
                                <i class="fa fa-send" style="margin-right: 22px;font-size: 20px;vertical-align: -3px;"></i>
                                <span>发送反馈</span>
                                <i class="fa fa-angle-right" style="font-size: 24px;float: right;margin-top:8px"></i>
                                </router-link>
                            </li>
                            <li>
                                <router-link target="_blank" to="/help">
                                <i class="fa fa-question-circle" style="margin-right: 20px;font-size: 24px;vertical-align: -3px;"></i>
                                <span>帮助</span>
                                <i class="fa fa-angle-right" style="font-size: 24px;float: right;margin-top:8px"></i>
                                </router-link>
                            </li>
                            <li>
                                <router-link target="_blank" to="/sponsor">
                                <i class="fa fa-archive" style="margin-right: 20px;font-size: 22px;vertical-align: -3px;"></i>
                                <span>赞助</span>
                                <i class="fa fa-angle-right" style="font-size: 24px;float: right;margin-top:8px"></i>
                                </router-link>
                            </li>
                            <li role="separator" class="divider"></li>
                            <li>
                                <a href="#" @click="logout($event)">
                                <i class="fa fa-sign-out" style="margin-right: 20px;font-size: 24px;vertical-align: -3px;"></i>
                                <span>注销</span>
                                </a>
                            </li>
                        </ul>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu-item>

            <el-menu-item index="" style="float:right;padding-right:0;" v-if="isAuthentication">
                <img src="@/assets/svg/user.svg" alt="" class="avatar">
            </el-menu-item>

            <el-menu-item index="" style="border:none;float:right;" class="hidden-md-and-down">
                <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="search">
                </el-input>
            </el-menu-item>
        </el-menu>
    </el-container>
    
    <login :isLoginShow=isLoginShow @switchLogin="switchLogin" @closeLogOpenReg="closeLogOpenReg"></login>
    <register :isRegisterShow=isRegisterShow @switchLogin="switchRegister" @closeRegOpenLog="closeRegOpenLog"></register>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'
  export default {
    data() {
      return {
        activeIndex: '1',
        search: '',
        isLoginShow: false,
        isRegisterShow: false,
        isAuthentication: true,
        
      };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
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
        }
    },
    components: {
        Login,
        Register
    }
  }
</script>

<style scoped>
@media screen and (min-width: 2800px) and (max-width: 3440px) {
    .el-menu-demo {
        padding: 0 20% !important;
    }
    .el-menu-demo {
      width: 60% !important;
    }
    
}

@media screen and (min-width: 2550px) and (max-width: 2800px) {
    .el-menu-demo {
        padding: 0 15% !important;
    }
    .el-menu-demo {
      width: 70% !important;
    }
    
}

@media screen and (min-width: 2250px) and (max-width: 2550px) {
    .el-menu-demo {
        padding: 0 10% !important;
        transition: all 0.3s ease;
    }
    .el-menu-demo {
      width: 80% !important;
    }
    
}

@media screen and (min-width: 1500px) and (max-width: 2250px) {
    .el-menu-demo {
        padding: 0 6% !important;
        transition: all 0.3s ease;
    }
    .el-menu-demo {
      width: 88% !important;
    }
    
}

@media screen and (max-width: 1500px) and  (min-width: 1200px) {
    .el-menu-demo {
      padding: 0 5% !important;
    }
    .el-menu-demo {
      width: 90% !important;
    }
}
@media screen and (max-width: 1200px) {
    .el-menu-demo {
      padding: 0 1% !important;
    }
    .el-menu-demo {
      width: 98% !important;
    }
    
}
.nav-header {
    margin-bottom: 80px;
    box-shadow: 0 6px 50px rgba(0, 0, 0, 0.054);
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
    overflow: hidden;
}
.logo {
    width: 100%;
}

.avatar {
    width: 20px;
    height: 20px;
    vertical-align: -2px;
}


</style>
