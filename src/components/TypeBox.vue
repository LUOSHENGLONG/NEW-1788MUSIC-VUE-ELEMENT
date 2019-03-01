<template>
    
    <el-row class="type-box" v-if="isShow">
        <div class="title">
            
            <p class="title-type">
                <slot></slot>
            </p>
            <router-link :to="'/article?type='+type+'&page_index=1&page_size=10&search=null'" class="more" target="_blank">
                &nbsp;&nbsp;更多文章 &gt;
            </router-link>
        </div>
        <el-row>
            <el-col  v-for="item in data" :key="item.id" class="card-col">
                <router-link :to="'/articleInfo/'+item.id"  target="_blank">
                <el-card :body-style="{ padding: '0px' }">
                <div class="image-wrap"> 
                    <img v-lazy="'http://localhost:3006'+item.img" class="image">
                    <div class="gradient"></div>
                    <span class="time">{{ item.releaseTime | dateFormat }}</span>
                </div>
                <div style="" class="content">
                    <h3 class="title-content">{{ item.title }}</h3>
                    <div class="bottom clearfix">
                        <p class="description">
                            {{ item.content }}
                        </p>
                    </div>
                </div>
                <div class="text-gradient"></div>
                </el-card>
            </router-link>
            </el-col>
        </el-row>
    </el-row>
    
</template>

<script>
import moment from 'moment'
export default {
    props: {
        isShow: Boolean,
        data: Array,
        type: String
    },
    data() {
        return {
        }
    },
    methods: {
        more() {
            this.$router.push({path: `/`+this.type})
        }
    },
    filters: {
        dateFormat: dataStr => {
            dataStr = parseInt(dataStr)
            moment.locale('zh-cn') //设置中文显示

            // 864000000毫秒等于10天
            let now = new Date().getTime()
            if ( now - dataStr < 864000000 ) {
                dataStr = moment(dataStr).format('YYYY-MM-DD HH:mm:ss');
                return moment(dataStr).startOf('hour').fromNow();
            } else {
                return moment(dataStr).format('YYYY-MM-DD');
            }
        },
    }

    
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1920px)  {
    
    .el-col:nth-child(5), .el-col:nth-child(10) {
        margin-right: 0 !important;
    }
    
}
@media screen and (max-width: 1920px) and  (min-width: 1200px) {
    
    .el-col:nth-child(5), .el-col:nth-child(10) {
        margin-right: 0 !important;
    }
    
}
@media screen and (max-width: 1200px) {
    .card-col {
        width: 32.5% !important;
    }
    .el-col:nth-child(3), .el-col:nth-child(6), .el-col:nth-child(9) {
        margin-right: 0 !important;
    }
    
}


.title {
    border-bottom: 2px solid #eee;
    margin-bottom: 25px;
    height: 80px;
    line-height: 80px;
    .title-type {
        height: 40px;;
        line-height: 35px;
        margin: 0;
        margin-top: 40px;
        font-size: 26px;
        color: #555;
        border-bottom: 2px solid #409EFF;
        float: left;
    }
    
}
.content {
    padding: 14px;height:165px;
    box-shadow: 0 6px 50px rgba(0, 0, 0, 0.054) inset;
}

.description {
    font-size: 16px;
    color: #999;
    line-height: 20px;
    margin: 0;
    word-wrap: break-word;
    word-break: break-all;
}

.bottom {
margin-top: 13px;
line-height: 12px;
}

.button {
padding: 0;
float: right;
}

.image-wrap {
    position: relative;
    overflow: hidden;
    text-align: center;
    height: 180px;
    background-image: url(../assets/images/favicon.png);
    background-size: 10%;
    background-repeat: no-repeat;
    background-position-x: 96%;
    background-position-y: 4%;
}

.image {
    height: 100%;
    background-position: center;
    background-size: cover;

}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}



.gradient {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.15);
    background-image: none;
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(0, 0, 0, 0) 35%), to(rgba(0, 0, 0, 0.8) 100%));
    background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.8) 100%);
    background-image: linear-gradient(top, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.8) 100%);
    background-repeat: repeat-x;
    background-color: rgba(0, 0, 0, 0);
}

.text-gradient {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, white 75%);
    background-repeat: repeat-x;
}

.time {
    position: absolute;
    right: 20px;
    bottom: 10px;
    color: #fff;
}
.title-content {
    margin: 0;
    line-height: 1.3;
    font-size: 20px;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 20px;
    font-weight: bold;
    
}
.more {
    color: rgb(255, 255, 255);
    height: 30px;
    width: 80px;
    margin-top: 45px;
    line-height: 30px;
    float: right;
    background: #337ab7;
    padding: 0px 12px;
    border-radius: 80px;
    text-decoration: none;
}

.el-card:hover {
    margin-top: -5px;
    background: #fff;
    transition: all 0.3s ease;
    .image-wrap .image {
        transform: scale(1.2);
        transition: all 0.5s ease;
    }
    .description {
        color: #653a9eb7;
        transition: all 0.3s ease;
    }
    .gradient {
        background-image: -webkit-gradient(linear, left top, left bottom, color-stop(35%, rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.6)));
        transition: all 0.5s ease;
    }
    .text-gradient {
        background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 10%, white 85%);
        transition: all 0.5s ease;
    }
    .content {
        color: #663a9e;
        box-shadow: 0 6px 50px rgba(0, 0, 0, 0.014) inset;
        transition: all 0.3s ease;

    }
}

.card-col {
    margin-right: 1%;
    margin-bottom: 30px;
    height: 376px;
    width: 19.20%;
    position: relative;
    // padding: 0 !important;
}

.el-row {
    max-height: 1300px;
    overflow: hidden;
    
}
.type-box {
    margin-bottom: 20px;

}

</style>

