<template>
    <div class="source-box" v-if="isOk">
        <div  class="card-div" v-for="item in articleData" :key=item.id>
            <el-row>
                <div class="box-card">
                    <div class="clearfix header">
                        <a href="#" class="type" :style="item.type | colorFormat">{{ item.type | typeFormat }}</a>
                        <router-link to="">
                            <h3>
                                {{ item.title }}
                            </h3>
                        </router-link>
                    </div>
                    <div class="line"></div>

                    <router-link :to="'/articleInfo/' + item.id" target="_blank">
                        <div class="content">
                            <div class="img">
                                <img v-lazy="'http://localhost:3006'+item.img" alt="" class="">
                            </div>
                            <div class="description">
                                <div class="info">
                                    <ul class="clearfix">
                                        <li>
                                            <img src="@/assets/svg/user.svg" alt="">
                                            <span>{{ item.nickname }}</span>
                                        </li>
                                        <li>
                                            <img src="@/assets/svg/time.svg" alt="" class="time">
                                            <span>{{ item.releaseTime | dateFormat }}</span>
                                        </li>
                                        <li>
                                            <img src="@/assets/svg/size.svg" alt="" class="size">
                                            <span>{{ item.size | sizeFormat }}</span>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <p  class="description-content">
                                    {{ item.content }}
                                </p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </el-row>
        
        </div>
    </div>
</template>
<script>
import moment from 'moment'

export default {
    props: {
        articleData: Array,
        isOk: Boolean
    },
    methods: {
        
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
            }
        },

        colorFormat: dataStr => {
            if(dataStr === "synthesizer"){
                return "background: #663a9e"
            }else if( dataStr === "effects") {
                return "background: #CC3366"
            }else if( dataStr === "samplePack") {
                return "background: #03A9F4"
            }else if( dataStr === "host") {
                return "background: #3366FF"
            }else if( dataStr === "tutorial") {
                return "background: #9708cc"
            }else if( dataStr === "project") {
                return "background: #9452a5"
            }else if( dataStr === "kontakt") {
                return "background: #CC0033"
            }else if( dataStr === "preset") {
                return "background: #9452a5"
            }else if( dataStr === "midi") {
                return "background: #CC0033"
            }
        },

        dateFormat: dataStr => {
            dataStr = parseInt(dataStr)
            moment.locale('zh-cn') //设置中文显示
            return moment(dataStr).format('YYYY-MM-DD HH:mm:ss');
        },
        
        sizeFormat: dataStr => {
            if( dataStr === "" || dataStr === null) {
                return "未知"
            }
            return dataStr
        },
    },
}
</script>
<style lang="scss" scoped>

.box-card {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .header {
        padding: 5px 20px;
        .type {
            float: left;
            font-size: 16px;
            text-decoration: none;
            margin-top: 7px;
            margin-right: 10px;
            color: #fff;
            padding: 0 12px;
            border-radius: 4px;

        }
    }
    .line {
        height: 1px;
        width: 100%;
        background: #ebeef5;
    }
}
.box-card:first-child {
    box-shadow: 0 ;
}
.text {
font-size: 14px;
}

.item {
margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
display: table;
content: "";
}
.clearfix:after {
clear: both
}



.content {
    display: flex;
    margin: 0;
    padding: 10px 20px;
    .img {
        flex: 1;
        width: 220px;
        height: 150px;
        border-radius: 4px;
        overflow: hidden;
        background-position: center;
        text-align: center;
        background-color:rgba(0,0,0,0.02);
        img {
            height: 100%;
            background-position: center;
            background-size: cover;
        }
    }
    .description {
        flex: 4;
        margin-left: 20px;
        font-size: 16px;
        color: #444;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        .description-content {
            margin: 0;
            margin-top: 5px;
        }
        .info {
            margin: 0;
            height: 28px;
            ul{
                margin: 0;
                padding: 0;
                height: 28px;
                li {
                    list-style: none;
                    float: left;
                    img {
                        width: 16px;
                        height: 16px;
                        margin-right: 4px;
                        vertical-align: -1px;
                    }
                    .size {
                        vertical-align: -2px;
                    }
                    span {
                        margin-right: 20px;
                    }
                }
            }
        }
    }
}
h3{
    margin:  0;
    font-size: 22px;
    color: #444555;
}
.card-div {
    margin-bottom: 20px;
}
.card-div:hover {
    h3 {
        color: #663a9e;
    }
    .description-content {
        color: #444555;
    }
    .img {
        background-color: #b9a2d61f;
        transition: all .3s ease;
        img {
            transform: scale(1.1);
            transition: all .3s ease;
        }
    }
}
</style>