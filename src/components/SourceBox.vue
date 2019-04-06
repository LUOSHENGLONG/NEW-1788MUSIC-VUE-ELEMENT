<template>
    <div class="source-box" v-if="isOk">
        <div  class="card-div" v-for="item in articleData" :key=item.id>
            <el-row>
                <div class="box-card">
                    <div class="clearfix header">
                        <a href="#" class="type" :style="item.type | colorFormat">{{ item.type | typeFormat }}</a>
                        <router-link :to="'/articleInfo/' + item.id">
                            <h3>
                                {{ item.title }}
                            </h3>
                        </router-link>
                        <i class="el-icon-star-on" title="取消收藏" v-if="favorite" @click="unlike(item.id)"></i>
                    </div>
                    <div class="line"></div>

                    <router-link :to="'/articleInfo/' + item.id" target="_blank">
                        <div class="content hidden-xs-only">
                            <div class="img hidden-sm-and-down">
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
        isOk: Boolean,
        favorite: Boolean
    },
    methods: {
        unlike(id) {
            this.$emit('cancelFavorite', id)
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
            }
        },

        colorFormat: dataStr => {
            if(dataStr === "synthesizer"){
                return "background: -webkit-linear-gradient(left, #FC466B ,#3F5EFB);background: -o-linear-gradient(right, #FC466B, #3F5EFB);background: -moz-linear-gradient(right, #FC466B, #3F5EFB);background: linear-gradient(to right, #FC466B ,#3F5EFB);"
            }else if( dataStr === "effects") {
                return "background: -webkit-linear-gradient(left, #4e54c8 ,#8f94fb);background: -o-linear-gradient(right, #4e54c8, #8f94fb);background: -moz-linear-gradient(right, #4e54c8, #8f94fb);background: linear-gradient(to right, #4e54c8 ,#8f94fb);"
            }else if( dataStr === "samplePack") {
                return "background: -webkit-linear-gradient(left, #8E2DE2 ,#8CA6DB);background: -o-linear-gradient(right, #8E2DE2, #8CA6DB);background: -moz-linear-gradient(right, #8E2DE2, #8CA6DB);background: linear-gradient(to right, #8E2DE2 ,#8CA6DB);"
            }else if( dataStr === "host") {
                return "background: -webkit-linear-gradient(left, #636FA4 ,#6A82FB);background: -o-linear-gradient(right, #636FA4, #6A82FB);background: -moz-linear-gradient(right, #636FA4, #6A82FB);background: linear-gradient(to right, #636FA4 ,#6A82FB);"
            }else if( dataStr === "tutorial") {
                return "background: -webkit-linear-gradient(left, #6441A5 ,#9D50BB);background: -o-linear-gradient(right, #6441A5, #9D50BB);background: -moz-linear-gradient(right, #6441A5, #9D50BB);background: linear-gradient(to right, #6441A5 ,#9D50BB);"
            }else if( dataStr === "project") {
                return "background: -webkit-linear-gradient(left, #6b11cbb6 ,#2575fc);background: -o-linear-gradient(right, #6b11cbb6, #2575fc);background: -moz-linear-gradient(right, #6b11cbb6, #2575fc);background: linear-gradient(to right, #6b11cbb6 ,#2575fc);"
            }else if( dataStr === "kontakt") {
                return "background: -webkit-linear-gradient(left, #a8c0ff ,#3f2b96);background: -o-linear-gradient(right, #a8c0ff, #3f2b96);background: -moz-linear-gradient(right, #a8c0ff, #3f2b96);background: linear-gradient(to right, #a8c0ff ,#3f2b96);"
            }else if( dataStr === "preset") {
                return "background: -webkit-linear-gradient(left, #FBD3E9 ,#BB377D);background: -o-linear-gradient(right, #FBD3E9, #BB377D);background: -moz-linear-gradient(right, #FBD3E9, #BB377D);background: linear-gradient(to right, #FBD3E9 ,#BB377D);"
            }else if( dataStr === "midi") {
                return "background: -webkit-linear-gradient(left, #a8c0ff ,#3f2b96);background: -o-linear-gradient(right, #a8c0ff, #3f2b96);background: -moz-linear-gradient(right, #a8c0ff, #3f2b96);background: linear-gradient(to right, #a8c0ff ,#3f2b96);"
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
@media screen and (max-width: 992px) {
    .card-div {
        margin-bottom: 0 !important;
    }
    .box-card {
        border: 0 !important;
        box-shadow: none !important;
    }
    .box-card:first-child {
        border-top: 1px solid #ebeef5 !important;
    }
    h3{
        font-size: 18px !important;
    }
    .type {
        font-size: 14px !important;
        margin-top: 5px !important;
        padding: 0 6px !important;
        border-radius: 4px !important;

    }
    
}
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
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        position: relative;
        .description-content {
            position: absolute;
            top: 30px;
            margin: 0;
            margin-top: 5px;
        }
        .info {
            position: absolute;
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
                        font-size: 15px;
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
.el-icon-star-on {
    position: absolute;
    right: 1%;
    top: 4%;
    font-size: 36px;
    color: #40a0ffdd;
    cursor: pointer;
    background-image: -webkit-gradient(linear, left 0, right 0, from(rgba(139, 10, 128, 0.74)), to(rgb(65, 88, 208)));
    -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
    -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
}
</style>