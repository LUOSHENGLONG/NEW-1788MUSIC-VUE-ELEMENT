<template>
    <div class="aside-box">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="最新" name="1" style="font-size: 20px;" class="">
                <ul class="row">
                    <li class="row-li" v-for="item in RankData.lastRank" :key="item.id">
                        <router-link target="_blank" :to="'/articleInfo/'+ item.id" class="row-a">
                            <p class="row-a-b" ref="p">{{ item.title }}</p>
                        </router-link>
                    </li>
                    
                </ul>
                
            </el-collapse-item>
            
            <el-collapse-item title="收藏排行" name="2">
                <ul class="row">
                    <li class="row-li" v-for="item in RankData.likeRank" :key="item.id">
                        <router-link target="_blank" :to="'/articleInfo/'+ item.id" class="row-a">
                            <p class="row-a-b" ref="p">{{ item.title }}</p>
                        </router-link>
                    </li>
                </ul>
            </el-collapse-item>
            <el-collapse-item title="浏览排行" name="3">
                <ul class="row">
                    <li class="row-li" v-for="item in RankData.lookRank" :key="item.id">
                        <router-link target="_blank" :to="'/articleInfo/'+ item.id" class="row-a">
                            <p class="row-a-b" ref="p">{{ item.title }}</p>
                        </router-link>
                    </li>
                </ul>
            </el-collapse-item>
            <el-collapse-item title="下载排行" name="4">
                <ul class="row">
                    <li class="row-li" v-for="item in RankData.downloadRank" :key="item.id">
                        <router-link target="_blank" :to="'/articleInfo/'+ item.id" class="row-a">
                            <p class="row-a-b" ref="p">{{ item.title }}</p>
                        </router-link>
                    </li>
                </ul>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import Swiper from '@/components/Swiper'
    export default {
        
        data() {
            return {
                activeNames: ['1','2','3','4'],
                RankData: [],
                rankIsShow: false
            };
        },
        mounted() {
            this.getRank()
        },
        methods: {
            handleChange(val) {
                // console.log(val);
            },
            scrollTitle() {
                let width = this.$(this.$refs.p).width()
                width = width - 290
                // console.log(width)
                this.$(this.$refs.p).animate({left: -width + 'px'},3000)
            },
            initTitle() {
                this.$(this.$refs.p).animate({left: '0px'},500)
            },
            
            getRank() {
                this.rankIsShow = false
                this.$axios.post('/api/articles/getRank')
                    .then(result => {
                        
                        const { code , msg, data } = result.data
                        // console.log(data)
                        if( code === 0 ) {
                            this.$message.error(msg)
                            return
                        }
                        if( code === 1 ) {
                            this.RankData = data
                            this.rankIsShow = true
                        }
                    })
            }
        },
        components: {
            Swiper,
        },
    }
</script>

<style lang="scss" scoped>
.aside-box {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10% 6%;
    margin-top: 22px;
    margin-bottom: 20px;
}

.el-collapse-item {
    font-size: 16px;
    .el-collapse-item__header {
        font-size: 16px !important;
    }
}

.row {
    padding: 0;
    font-size: 16px;
    li {
        position: relative;
        height: 42px;
        border-radius: 4px;
        margin: 8px 0;
        overflow: hidden;
        .row-a {
            display: inline-block;
            height: 42px;
            color: #444;
            .row-a-b {
                position: absolute;
                left: 0;
                margin: 0;
                line-height: 20px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
        
    }
    li:hover {
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.054);
        .row-a {
            color: #7645b8;
        }
    }
}

.el-collapse-item__wrap {
    // display: none;
    height: 1px;
}


</style>
