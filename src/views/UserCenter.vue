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
                        <span slot="label"><i class="el-icon-date"></i>个人中心</span>
                        <div class="user-left">
                            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                                
                                <el-menu-item index="1" @click="showUserInfo">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">导航二</span>
                                </el-menu-item>
                                
                                <el-menu-item index="4" @click="showFavorite">
                                    <i class="el-icon-setting"></i>
                                    <span slot="title">导航四</span>
                                </el-menu-item>
                            </el-menu>
                        </div>
                        <div class="line"></div>
                        <div class="user-right" ref="userInfo">
                            <user-info-box></user-info-box>
                        </div>
                        <div class="user-right" ref="favorite">
                            <source-box :articleData=articleData :isOk=isOk></source-box>
                            <pagination-box 
                                @handleSize=handleSize
                                @handleCurrent=handleCurrent
                                :paginations=paginations>
                            </pagination-box>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="消息中心">消息中心</el-tab-pane>
                    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
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
        UserInfoBox
    },
    data() {
        return {
            height: '200px',
            // 需要给分页组件传递的信息
            paginations: {
                page_index: 1, // 当前页
                totalCount: 0, // 总数
                page_size: 5, // 一页显示条数
                page_sizes: [10, 15, 20], // 每页显示条数控制
                layout: "total, sizes, prev, pager, next, jumper"
            },
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
                page_sizes: [10, 15, 20], // 每页显示条数控制
                layout: "total, sizes, prev, pager, next, jumper"
            },
        }
    },
    mounted() {
        // 设置分页数据
        if(this.$route.query.page_index) 
        this.paginations.page_index = parseInt(this.$route.query.page_index);

        if(this.$route.query.page_size) 
        this.paginations.page_size = parseInt(this.$route.query.page_size);

        this.getArticleData()
        
        this.showUserInfo()
    },
    methods: {
        showUserInfo() {
            this.showChild.userInfo = true
            this.$refs.userInfo.style.display = "inline-block"
            this.$refs.favorite.style.display = "none"
        },
        showFavorite() {
            this.$refs.userInfo.style.display = "none"
            this.$refs.favorite.style.display = "inline-block"

        },
        handleOpen() {

        },
        handleClose() {

        },
        toTop() {
            window.scrollTo(0, 0)
        },
        // 处理分页大小
        handleSize(size) {
            console.log(size)
            this.paginations.page_size = size
            this.$router.push(
                {
                    path: `article`,
                    query: {
                        type: this.$route.query.type,
                        page_index: size,
                        page_size: this.paginations.page_size,
                        search: this.$route.query.search
                    }
                })

        },
        // 处理分页换页
        handleCurrent(page_index) {
            console.log(page_index)
            this.paginations.page_index = page_index
            this.$router.push(
                {
                    path: `article`,
                    query: {
                        type: this.$route.query.type,
                        page_index: page_index,
                        page_size: this.paginations.page_size,
                        search: this.$route.query.search
                    }
                })
            
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
                    this.articleData = data
                    this.paginations.totalCount = parseInt(totalCount)
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
</style>

