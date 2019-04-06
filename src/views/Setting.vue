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
                                
                            </el-menu>
                        </div>
                        <div class="line"></div>
                        <div class="user-right" ref="userInfo">
                            <user-info-box></user-info-box>
                        </div>
                        <div class="user-right" ref="favorite">
                            <div v-if="this.paginations.totalCount != 0">
                                <source-box :articleData=articleData :isOk=isOk :favorite="favorite" @cancelFavorite="cancelFavorite"></source-box>
                                <pagination-box 
                                    @handleSize=handleSize
                                    @handleCurrent=handleCurrent
                                    :paginations=paginations>
                                </pagination-box>
                            </div>
                            <div style="text-align:center" v-if="this.paginations.totalCount == 0">
                                <i class="el-icon-tickets"></i>
                                <p class="favoriteTips">暂无收藏数据</p>
                            </div>
                        </div>
                        <div class="user-right" ref="contribute" >
                            <contribute-box @getContribute=getContribute :contributeData=contributeData  :isOk=isOk></contribute-box>
                            <pagination-box 
                                @handleSize=ContHandleSize
                                @handleCurrent=ContHandleCurrent
                                :paginations=Contpaginations>
                            </pagination-box>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="修改头像">
                        <span slot="label"><i class="el-icon-picture"></i> &nbsp;&nbsp;修改头像</span>
                         <div>
                             <avatar-box></avatar-box>
                         </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane>
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
import AvatarBox from '@/components/AvatarBox'


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
        ContributeBox,
        AvatarBox
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
            contributeData: [],
            favorite: true
        }
    },
    mounted() {

        this.getArticleData()
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
            this.$router.push({path: '/setting/contribute'})
            this.$refs.contribute.style.display = "inline-block"
            this.$refs.userInfo.style.display = "none"
            this.$refs.favorite.style.display = "none"
            console.log(111)
            document.getElementById('favorite').classList.remove('is-active')
            document.getElementById('userInfo').classList.remove('is-active')
            document.getElementById('contribute').classList.add('is-active')
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
            this.$router.push({path: '/setting/userInfo'})
            this.$refs.userInfo.style.display = "inline-block"
            this.$refs.contribute.style.display = "none"
            this.$refs.favorite.style.display = "none"
            
            document.getElementById('favorite').classList.remove('is-active')
            document.getElementById('userInfo').classList.add('is-active')
            document.getElementById('contribute').classList.remove('is-active')
            console.log(111111)
            
        },
        showFavorite() {
            this.$router.push({path: '/setting/favorite'})
            this.$refs.favorite.style.display = "inline-block"
            this.$refs.userInfo.style.display = "none"
            this.$refs.contribute.style.display = "none"

            document.getElementById('favorite').classList.add('is-active')
            document.getElementById('userInfo').classList.remove('is-active')
            document.getElementById('contribute').classList.remove('is-active')
            console.log(111111)
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

                if( data != null ) {
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
                }

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
        },
        cancelFavorite(id) {
            this.$axios.post('/api/users/cancelFavorite',{articleId: id, userId: this.$store.state.user.id})
                .then( result => {
                    console.log(result)
                    this.getArticleData()
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

@media screen and (max-width: 1200px) and  (min-width: 992px) {
   .content,.swiper-div {
        padding: 0 1% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 992px) {
   .content {
        padding: 0 1% !important;
        margin-top: 30px !important;
        transition: all 0.3s ease;
    }
    .line {
        display: none !important;
    }
    .user-left {
        width: 28% !important;
        span {
            font-size: 14px !important;
        }
    }
    .user-right {
        width: 71% !important;
    }
    
}



.content {
    padding: 0 10%;
    background-color: #fff;
    margin-top: 100px;
    .main-content {
        .user-left {
            float: left;
            width: 20%;
            margin-top: 0;
            .el-menu {
                width: 100px;;
            }
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
.el-icon-tickets {
    font-size: 260px;
    color: rgba(64, 160, 255, 0.781);
}
.favoriteTips {
    font-size: 22px;
    color: #666;
}
</style>

