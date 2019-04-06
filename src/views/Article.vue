<template>
    <div class="article">
        <nav-header></nav-header>
        <div class="content">
            <div class="left" v-if="loading">
                <break-box :isOk=breakIsOK :articleType="'/article?type='+this.$route.query.type+'&page_index=1&page_size=10&search=null'">
                    <slot slot="type">
                        <a href="#" @click="handleCurrent(1)">
                            {{ this.$route.query.search=='null'?this.$route.query.type:'搜索结果: '+this.$route.query.search | typeFormat}}
                        </a>
                    </slot>
                    
                </break-box>
                <source-box :articleData=articleData :isOk=isOk></source-box>
                <div class="pagination">
                    <pagination-box 
                        @handleSize=handleSize
                        @handleCurrent=handleCurrent
                        :paginations=paginations>

                    </pagination-box>
                </div>

                <div class="left" v-if="isEmpty" style="text-align: center">
                    <i class="el-icon-warning"></i>
                    <p class="emptyText"> 搜索结果为空 </p>
                </div>
            </div>
            <div class="left" v-if="!loading" style="text-align: center">
                <img src="@/assets/images/lazy8.gif" style="height:208px;width:208px;" alt="">
            </div>
            
            <div class="right hidden-xs-only">
                <swiper :height='height' :swiperData=swiperData :isShow=swiperIsShow></swiper>
                <aside-box></aside-box>
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


export default {
    components: {
        NavHeader,
        SourceBox,
        Swiper,
        AsideBox,
        NavBottom,
        BreakBox,
        PaginationBox,
        ToTopBox
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
            breakIsOK: false,
            isShow: false,
            swiperData: [],
            swiperIsShow: false,
            RankData: {},
            rankIsShow: false,
            loading: false,
            isEmpty: false
        }
    },
    
    mounted() {
        // 设置分页数据
        if(this.$route.query.page_index) 
        this.paginations.page_index = parseInt(this.$route.query.page_index);

        if(this.$route.query.page_size) 
        this.paginations.page_size = parseInt(this.$route.query.page_size);

        this.getArticleData()
        
        this.getSwiperData()
    },
    methods: {
        toTop() {
            window.scrollTo(0, 0)
        },
        // 处理分页大小
        handleSize(size) {
            // console.log(size)
            this.paginations.page_size = size
            // console.log('----------------')
            // console.log("type: " + this.$route.query.type)
            // console.log("size: " + size)
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
            // console.log(page_index)
            this.paginations.page_index = page_index
            // console.log('----------------')
            // console.log("type: " + this.$route.query.type)
            // console.log("page_index: " + page_index)
            // console.log("page_size: " + this.paginations.page_size)
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
            // console.log('getData-----------------')
            // console.log('this.$route.query.type: ' + this.$route.query.type)
            // console.log('page_index: ' + this.$route.query.page_index)
            // console.log('page_size: ' + this.paginations.page_size)
            // console.log('search: ' + this.$route.query.search)
            this.loading = false
            this.paginations.page_index = parseInt(this.$route.query.page_index)

            this.$axios.get('/api/articles/articleData',
            {
                params: {
                    type: this.$route.query.type,
                    page_index: this.paginations.page_index,
                    page_size: this.paginations.page_size,
                    search: this.$route.query.search
                }
            })
            .then(result => {
                // 每次获取数据回到顶部
                this.loading = true
                this.toTop()
                const { code, msg, data, totalCount } = result.data
                console.log(data,totalCount)
                if ( code === 0 ) {
                    this.isOk = false
                    this.$message.error(msg)
                    return
                }

                // console.log(totalCount)
                // 处理 Img 路径 start
                let test = /(\")|(\])|(\[)/

                String.prototype.replaceAll = function(s1,s2){ 
                    return this.replace(new RegExp(s1,"gm"),s2); 
                }

                if(data != null) {
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
                
                this.articleData = data
                // console.log(this.articleData)
                if( totalCount > 0 ) {
                    this.breakIsOK = true
                    this.isOk = true
                    this.isEmpty = false
                } else {
                    this.breakIsOK = false
                    this.isOk = false
                    this.isEmpty = true
                }
                this.paginations.totalCount = parseInt(totalCount)
            })
        },
        getSwiperData() {
            
            this.swiperIsShow = false
            this.$axios.post('/api/articles/swiperData')
                .then(result => {
                    // console.log(22222222)
                    const { code , msg, data } = result.data
                    // console.log(data)
                    if( code === 0 ) {
                        this.$message.error(msg)
                        return
                    }
                    if( code === 1 ) {
                        this.swiperData = data
                        this.swiperIsShow = true
                    }
                })
        },
        
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
.swiper-div {
    padding: 0 10%;
    ul {
        padding: 0;
        li {
            width: 19.6%;
            display: inline-block;
        }
    }
}
.content {
    padding: 0 10%;
    // min-width: 992px;
    display: flex;
    .left {
        flex: 4;
    }
    .right {
        padding: 0 1%;
        padding-right: 0;
        flex: 1;
    }
}
.pagination {
    text-align: center;
    margin-top: 80px;
}
.el-icon-warning {
    font-size: 120px;
    color: #ea6f5a;
}
.emptyText {
    font-size: 22px;
    margin-top: 40px;
    color: #ea6f5a;
}

</style>

