<template>
    <div class="article">
        <nav-header></nav-header>
        <div class="content">
            <!-- <div class="left">
                
            </div>
            <div class="right">
            </div> -->
            <div class="main-content">
                <el-tabs type="border-card">
                    <el-tab-pane>
                        <span slot="label"><i class="el-icon-menu"></i> &nbsp;&nbsp;个人中心</span>
                        <div class="user-left">
                            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                                
                                <el-menu-item index="1" id="userInfo" @click="showUserInfo">
                                    <i class="el-icon-date"></i>
                                    <span slot="title">个人信息</span>
                                </el-menu-item>
                                
                                <el-menu-item index="2" id="favorite" @click="showFavorite">
                                    <i class="el-icon-star-on"></i>
                                    <span slot="title">我的收藏</span>
                                </el-menu-item>

                                <el-menu-item index="3" id="contribute" @click="showContribute">
                                    <i class="el-icon-edit-outline"></i>
                                    <span slot="title">我的投稿</span>
                                </el-menu-item>
                                <el-menu-item index="4" id="contribute" @click="showAvatar">
                                    <i class="el-icon-edit-outline"></i>
                                    <span slot="title">我的投稿</span>
                                </el-menu-item>
                            </el-menu>
                            <img src="@/assets/images/favicon.png" class="favicon" alt="">
                        </div>
                        <div class="line"></div>
                        <div class="user-right" ref="userInfo">
                            <user-info-box></user-info-box>
                        </div>
                        

                    </el-tab-pane>
                    <!-- <el-tab-pane label="消息中心">消息中心</el-tab-pane>
                    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
                </el-tabs>
            </div>
        </div>
        <nav-bottom></nav-bottom>
        <to-top-box></to-top-box>
    </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import Swiper from '@/components/Swiper'
import SourceBox from '@/components/SourceBox'
import AsideBox from '@/components/AsideBox'
import NavBottom from '@/components/NavBottom'
import BreakBox from '@/components/BreakBox'
import PaginationBox from '@/components/PaginationBox'
import ToTopBox from '@/components/ToTopBox'
import UserInfoBox from '@/components/UserInfoBox'
import ContributeBox from '@/components/ContributeBox'


export default {
    components: {
        NavHeader,
        SourceBox,
        Swiper,
        AsideBox,
        NavBottom,
        BreakBox,
        PaginationBox,
        ToTopBox,
        UserInfoBox,
        ContributeBox
    },
    data() {
        return {
            height: '200px',
            
            articleData: [],
            isOk: false,
            isShow: false,
            tabPosition: 'left',
            userInfo: {
                nickname: '',
                email: '',
                phone: '',
                createTime: '',
                isprotect: false,
                identityState: false,
                bindQq: false,
                bindWeibo: false
            },
            isCollapse: false,
            showChild: {
                userInfo: true,
                favorite: false,
            },
            // 需要给分页组件传递的信息
            paginations: {
                page_index: 1, // 当前页
                totalCount: 0, // 总数
                page_size: 5, // 一页显示条数
                page_sizes: [5, 10, 15], // 每页显示条数控制
                layout: "total, sizes, prev, pager, next, jumper"
            },
            Contpaginations: {
                page_index: 1, // 当前页
                totalCount: 0, // 总数
                page_size: 10, // 一页显示条数
                page_sizes: [10, 15, 20], // 每页显示条数控制
                layout: "total, sizes, prev, pager, next, jumper"
            },
            contributeData: []
        }
    },
    mounted() {
        // 设置分页数据
        

        this.getArticleData()
        
        // this.showUserInfo()
        // document.getElementById('userInfo').classList.remove('is-active')
        // document.getElementById('favorite').classList.add('is-active')
        // // this.showFavorite()
        // this.$route.params.type

        this.showWitch()
    },
    methods: {
        showWitch() {
            const type = this.$route.params.type
            if( type == 'favorite') {
                document.getElementById('favorite').classList.add('is-active')
                document.getElementById('userInfo').classList.remove('is-active')
                document.getElementById('contribute').classList.remove('is-active')
                this.showFavorite()
            } else if ( type == 'userInfo' ) {
                document.getElementById('userInfo').classList.add('is-active')
                document.getElementById('favorite').classList.remove('is-active')
                document.getElementById('contribute').classList.remove('is-active')
                this.showUserInfo()
            } else if ( type == 'contribute' ) {
                document.getElementById('contribute').classList.add('is-active')
                document.getElementById('userInfo').classList.remove('is-active')
                document.getElementById('favorite').classList.remove('is-active')
                this.showContribute()
            } else {
                document.getElementById('userInfo').classList.add('is-active')
                document.getElementById('contribute').classList.remove('is-active')
                document.getElementById('favorite').classList.remove('is-active')
                this.showUserInfo()
            }
        },
        showContribute() {
            this.$refs.contribute.style.display = "inline-block"
            this.$refs.userInfo.style.display = "none"
            this.$refs.favorite.style.display = "none"
            console.log(111)
            this.getContribute()
        },
        getContribute() {
            this.isOk = false
            this.$axios.post('/api/users/getContribute',
            {
                id: this.$store.state.user.id,
                pageIndex: 1,
                pageSize: 10,
            }).then(result => {
                // 每次获取数据回到顶部
                this.toTop()
                const { code, msg, data, totalCount } = result.data
                if ( code === 0 ) {
                    this.isOk = false
                    this.$message.error(msg)
                    return
                }

                if ( code === 1 ) {
                    this.isOk = true
                    this.contributeData = data
                    this.Contpaginations.totalCount = parseInt(totalCount)
                    setTimeout(() => {
                        this.isOk = true
                    }, 1);
                }
                console.log(code)
                console.log(msg)
                console.log(data)
                console.log(totalCount)
            })
        },
        showUserInfo() {
            // this.showChild.userInfo = true
            this.$refs.userInfo.style.display = "inline-block"
            this.$refs.contribute.style.display = "none"
            this.$refs.favorite.style.display = "none"
        },
        showFavorite() {
            this.$refs.favorite.style.display = "inline-block"
            this.$refs.userInfo.style.display = "none"
            this.$refs.contribute.style.display = "none"
        },
        showAvatar() {

        },
        handleOpen() {

        },
        handleClose() {

        },
        toTop() {
            window.scrollTo(0, 0)
        },
        // 处理分页大小 投稿
        ContHandleSize(size) {
            console.log(size)
            this.Contpaginations.page_size = size
            this.getContribute()

        },
        // 处理分页换页 投稿
        ContHandleCurrent(page_index) {
            console.log(page_index)
            this.Contpaginations.page_index = page_index
           this.getContribute()
            
        },
        // 处理分页大小 收藏
        handleSize(size) {
            console.log(size)
            this.paginations.page_size = size
            this.getArticleData()

        },
        // 处理分页换页 收藏
        handleCurrent(page_index) {
            console.log(page_index)
            this.paginations.page_index = page_index
           this.getArticleData()
            
        },
        getArticleData() {
            this.$axios.get('/api/users/getAllFavorite',
            {
                params: {
                    userId: this.$store.state.user.id,
                    page_index: this.paginations.page_index,
                    page_size: this.paginations.page_size,
                }
            })
            .then(result => {
                // 每次获取数据回到顶部
                this.toTop()
                const { code, msg, data, totalCount } = result.data

                // 处理 Img 路径 start
                let test = /(\")|(\])|(\[)/

                String.prototype.replaceAll = function(s1,s2){ 
                    return this.replace(new RegExp(s1,"gm"),s2); 
                }

                data.forEach( item => {
                    item.img = item.img + ""
                    item.img = item.img.replaceAll(test,"")
                    let img = []
                    if(item.img.indexOf(",") > -1) {
                    item.img.split(",").forEach( item2 => {
                        img.push("" + item2)
                    })
                    }else {
                    img.push("" + item.img)
                    }
                    item.img = img[0]
                })

                console.log(code)
                console.log(msg)
                console.log(data)
                console.log(totalCount)
                if ( code === 0 ) {
                    this.isOk = false
                    this.$message.error(msg)
                    return
                }

                if ( code === 1 ) {
                    this.isOk = false
                    this.articleData = data
                    this.paginations.totalCount = parseInt(totalCount)
                    setTimeout(() => {
                        this.isOk = true
                    }, 1);
                }
                
            })
        }
    },
    filters: {
        typeFormat: dataStr => {
            if(dataStr === "synthesizer"){
                return "合成器"
            }else if( dataStr === "effects") {
                return "效果器"
            }else if( dataStr === "samplePack") {
                return "采样包"
            }else if( dataStr === "host") {
                return "宿主"
            }else if( dataStr === "tutorial") {
                return "教程"
            }else if( dataStr === "project") {
                return "工程"
            }else if( dataStr === "kontakt") {
                return "Kontakt"
            }else if( dataStr === "preset") {
                return "预置"
            }else if( dataStr === "midi") {
                return "MIDI"
            }else if( dataStr === "last") {
                return "最新"
            }else if( dataStr === "search") {
                return "搜索"
            } else {
                return dataStr
            }
        }
    },
    watch: {
      // 监听路由变化，随时获取新的列表信息
      '$route': 'getArticleData'
    }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 2800px) and (max-width: 3440px) {
    .content,.swiper-div {
        padding: 0 20% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (min-width: 2550px) and (max-width: 2800px) {
    .content,.swiper-div {
        padding: 0 15% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (min-width: 2250px) and (max-width: 2550px) {
    .content,.swiper-div {
        padding: 0 10% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 1500px) and (max-width: 2250px) {
    .content,.swiper-div {
        padding: 0 6% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (max-width: 1500px) and  (min-width: 1200px) {
   .content,.swiper-div {
        padding: 0 5% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1200px) {
   .content,.swiper-div {
        padding: 0 1% !important;
        transition: all 0.3s ease;
    }
    
}



.content {
    padding: 0 10%;
    min-width: 992px;
    background-color: #fff;
    margin-top: 100px;
    .main-content {
        .user-left {
            float: left;
            width: 20%;
            margin-top: 0;
        }
        .user-left::after {
            clear: both;
            content: '';
            height: 0;
            visibility: hidden;
        }
        .user-right {
            display: inline-block;
            // text-align: center;
            width: 79%;
            .user-info {
                padding: 0 10%;
                .user-info-left {
                    display: inline-block;
                    width: 45%;
                    margin: 1%;
                }
                .user-info-right {
                    display: inline-block;
                    width: 45%;
                    margin: 1%;
                }
            }
        }

    }
}


.is-active {
    background: #fff;
}
.el-menu-item {
    padding: 0 !important;
    margin: 0 2%;

}
.el-menu-item:hover {
    background: #fff !important;

}
.el-menu-vertical-demo {
    border: 0 !important;
}

.line {
    position: absolute;
    top: 2%;
    left: 15%;
    width: 1px;
    background-color: #eee;
    height: 96%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.el-tab-pane {
    padding: 30px 0;
}

.favicon {
    width: 96px;
    height: 96px;
    margin-top: 250px;
}
</style>

