<template>
    <div class="preview" v-if="isShow" @click="close">
        <div class="article">
            
            <div class="originImg" ref="originImg" @click="hiddenOrg">
                <img ref="showOrigin" src="@/assets/images/1788.png" alt="" title="点击返回">
                <i class="el-icon-close" @click="hiddenOrg" title="关闭"></i>
            </div>

            <div class="content clearfix" ref="content">
                <div class="top">投稿预览
                    <i class="el-icon-close" @click="close"></i>
                </div>
                <div class="left clearfix">
                    
                    <section class="main-content" ref="mainContent">
                        <div class="main-title">
                            <h2>{{ infoData.title}}</h2>
                        </div>
                        
                        <div class="main-info">
                            <ul class="message">
                                <li>
                                    <img src="@/assets/svg/user.svg" alt="">
                                    <span>{{ infoData.nickname }}</span>
                                </li> 
                                <li>
                                    <img src="@/assets/svg/time.svg" alt="">
                                    <span>{{ new Date().getTime() | dateFormat }}</span>
                                </li>
                                <li class="hidden-xs">
                                    <img src="@/assets/svg/size.svg" alt="">
                                    <span>{{ infoData.downloadSize | sizeFormat}}</span>
                                
                                </li>
                            </ul>
                            
                        </div>
                        <div class="post-content mdf_connect">
                            
                            <div class="post-content-img" v-for="item of infoData.img" :key="item"> 
                            <br>
                            <img class="content-img" 
                                ref="infoImg"
                                alt="" 
                                title="点击查看原图" 
                                :data-original="item" 
                                :src="item" 
                                style="display: inline-block;">
                                <div class="topShade"></div>
                                <div class="bottomShade"></div>
                                <div class="leftShade"></div>
                                <div class="rightShade"></div>
                            <br>
                            </div>


                            <p class="post-content-text post-content-text-content">
                            <!-- <span class="intexthighlight">Kenny Chesney</span> -->
                            {{ infoData.content }}
                            </p>
                            
                            <!-- <p class="post-content-text">Kenny Chesney此次巡演舞台工程师Chris Rabold：</p> -->
                            <blockquote v-if="infoData.description === '' ? false : true">
                            <pre class="post-content-text post-content-text-description">{{ infoData.description }}</pre>
                            </blockquote>
                            <div class="video-responsive" v-if="haveVideoLink">
                            <iframe :src="infoData.videoLink" frameborder="0" allowfullscreen="true"> </iframe>
                            <br>
                            <hr>
                            </div>
                            <div class="download">

                            <blockquote v-if="infoData.downloadLink === '' ? false:true">
                                <p class="post-content-text post-content-text-downloadLink"> 
                                下载地址：
                                <a :href="infoData.downloadLink" target="_blank" 
                                style="color:#337ab7;" 
                                v-text="infoData.downloadLink === '' ? '无':infoData.downloadLink">
                                    {{ infoData.downloadLink }}
                                </a>
                                <br>
                                提取码: <span ref="tqm" id="tqm" v-text="infoData.downloadPassword === '' ? '无':infoData.downloadPassword"></span>&nbsp;&nbsp;
                                
                                

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                解压密码: <span ref="jymm" id="jymm" v-text="infoData.downloadUnzip === '' ? '无':infoData.downloadUnzip">{{infoData.downloadUnzip}}</span>  &nbsp;&nbsp;

                                
                                </p>
                            </blockquote>
                            </div>
                            <div class="description">
                            <blockquote>
                                <p class="post-content-text post-content-text-copyright"> 
                                1788MUSIC绝对尊重互联网版权，如本文章侵犯你的权益请来信到邮箱1788music@gmail.com。
                                <br>
                                如本站内容资源能为你创造价值，望能赞助我们减轻网站运营负担。
                                <router-link target="_blank" to="/sundry/sponsor">
                                    <i class="fa fa-angle-double-left" style="font-size: 20px;"></i>
                                    <span style="color: #337ab7;font-size:20px">赞助我们</span>
                                    <i class="fa fa-angle-double-right" style="font-size: 20px;"></i>
                                </router-link>
                                </p>
                            </blockquote>
                            </div>
                        </div>
                    </section>
                </div>
                
            </div>
        </div>
        <div class="shade"></div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    props: {
        infoData: Object,
        isShow: Boolean
    },
    components: {
    },
    data() {
        return {
            haveVideoLink: false,
            height: '200px',
            isOk: false,
            oldTime: 0,
        }
    },
    
    filters: {
        dateFormat: dateStr => {
            dateStr = parseInt(dateStr)
            moment.locale('zh-cn') //设置中文显示
            return moment(dateStr).format('YYYY-MM-DD HH:mm:ss');
        },
        sizeFormat: dataStr => {
            if( dataStr === "" || dataStr === null) {
                return "未知"
            }
            return dataStr
        },
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
            }
        }
    },
    mounted() {
       
        // 如果图片宽度大于内容宽度 则把img 设置 成 width 100%
        window.onload = () => {

            let content = this.$(this.$refs.content).height()
            let mainContent = this.$(this.$refs.mainContent).width()
            let img = this.$(this.$refs.infoImg).width()
            console.log(content,mainContent,img)
            if (img > mainContent) {
                this.$(this.$refs.infoImg).css("width","100%")
            }
        }
    },
    updated() {
        let content = this.$(this.$refs.content).height()
        let mainContent = this.$(this.$refs.mainContent).width()
        let img = this.$(this.$refs.infoImg).width()
        console.log(content,mainContent,img)
        if (img > mainContent) {
            this.$(this.$refs.infoImg).css("width","100%")
        }
    },
    methods: {
        close() {
            this.$emit('closePreview')
        },
        hiddenOrg() {
            this.$refs.originImg.style.display = "none"
            this.$(".shadeLayer").css("display","none")
        },
        
        showOrigin(src) {
            // window.scrollTo(0,0)
            this.$refs.showOrigin.src = `http://localhost:3006` + src
            console.log(src)
            this.$refs.originImg.style.display = "block"
            let clientHeight = this.$(window).height()
            let imgHeight = this.$refs.showOrigin.height

            let imgWidht = this.$refs.showOrigin.widht


            if (imgHeight < clientHeight) {
            this.$refs.showOrigin.style.top = clientHeight / 2  - imgHeight / 2 + "px"
            }
            this.$refs.originImg.style.height = this.$(document).height() + "px"
            this.$(".shadeLayer").css("display","block")
        },
        
        // 回到顶部
        toTop() {
            window.scrollTo(0, 0)
        },
        
    }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 2800px) and (max-width: 3440px) {
    .content,.swiper-div {
        margin: 0 20% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (min-width: 2550px) and (max-width: 2800px) {
    .content,.swiper-div {
        margin: 0 15% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (min-width: 2250px) and (max-width: 2550px) {
    .content,.swiper-div {
        margin: 0 10% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 1500px) and (max-width: 2250px) {
    .content,.swiper-div {
        margin: 0 6% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (max-width: 1500px) and  (min-width: 1200px) {
   .content,.swiper-div {
        margin: 0 5% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1200px){
   .content,.swiper-div {
        margin: 0 1% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (max-width: 992px) and (min-width: 555px){
   .content,.swiper-div {
        padding: 0 1% !important;
        transition: all 0.3s ease;
    }
    .left {
        width: 100% !important;
        transition: all 0.3s ease;
    }
    .main-content {
        padding: 10px 10px 0px 10px !important;
        transition: all 0.3s ease;
        .post-content-text {
            font-size: 16px !important;
        }
    }
    .main-title {
        h2 {
            font-size: 20px !important;
            padding-bottom: 6px !important;
            transition: all 0.3s ease;
        }
    }
    .main-info {
        .message {
            span {
                font-size: 12px !important;
                transition: all 0.3s ease;
            }
            img {
                width: 14px !important;
                height: 14px !important;
                margin-right: 4px !important;
                vertical-align: -1px !important;
            transition: all 0.3s ease;
            }
        }
    }

    .video-responsive {
        iframe {
            height: 700px !important;
            transition: all 0.3s ease;
        }
    }
    
}

@media screen and (max-width: 555px){
   .content,.swiper-div {
        padding: 0 1% !important;
        transition: all 0.3s ease;
    }
    .left {
        width: 100% !important;
        transition: all 0.3s ease;
    }
    .main-content {
        padding: 10px 10px 0px 10px !important;
        transition: all 0.3s ease;
        .post-content-text {
            font-size: 16px !important;
        }
    }
    .main-title {
        
        h2 {
            font-size: 20px !important;
            padding-bottom: 6px !important;
            transition: all 0.3s ease;
        }
    }
    .main-info {
        .message {
            span {
                font-size: 12px !important;
                transition: all 0.3s ease;
            }
            img {
                width: 14px !important;
                height: 14px !important;
                margin-right: 4px !important;
                vertical-align: -1px !important;
            transition: all 0.3s ease;
            }
        }
    }

    .video-responsive {
        iframe {
            height: 300px !important;
            transition: all 0.3s ease;
        }
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
    margin: 0 10%;
}
.clearfix:before,
.clearfix:after {
display: table;
content: "";
}
.clearfix:after {
clear: both
}
.main-content {
    box-shadow: 0 6px 23px rgba(0, 0, 0, 0.094);
    background-color: #fff;
    border: 1px solid #eee;
    padding: 20px 40px 0px 40px;
    
    .main-title {
        text-align: left;
        border-bottom: 1px solid #eee;
        position: relative;
        .title-left {
            position: absolute;
            left: -70px;
            width:0;
            height:0;
            border-width:20px 30px 20px 0;
            border-style:solid;
            border-color:transparent #7645b8 transparent transparent;/*透明 灰 透明 透明 */
            top: 0;
        }
        h2 {
            font-size: 30px;
            border-bottom: 3px solid #7645b8;
            padding-bottom: 18px;
            margin-bottom: -2px;
            font-weight: 700;
            white-space: pre-line;
        }
    }
    .main-info {
        .mark {
            float: right;
            i {
                font-size: 40px;
                margin-top: 10px;
                cursor: pointer;
            }
            .el-icon-star-on {
                color: #337ab7;
            }
            
        }
        .message {
            text-align: left;
            vertical-align: middle;
            padding: 0;
            margin: 10px 0;
            display: inline-block;
            li {
                margin-right: 10px;
                list-style: none;
                display: inline-block;
                height: 25px;
                text-align: left;
                color: rgba(0, 0, 0, 0.5);
                font-size: 16px;
                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 4px;
                    vertical-align: -1px;
                }
                a {
                    display: inline-block;
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.7);
                    
                    span {
                    font-size: 20px;
                    padding-left: 5px;
                    padding-right: 3px;
                    color: rgba(0, 0, 0, 0.5);
                    }
                }
                span {
                    font-size: 20px;
                    padding-left: 5px;
                    padding-right: 3px;
                }
                .qrcode {
                    color: #337AB7;
                }
            }
        } 
    }
    .post-content {
      .post-content-text-content {
        // text-indent: 2em;
        border-left: 5px solid #7645b8;
        background-color: #7745b809;
      }
      .post-content-text-description {
        // text-indent: 2em;
        border-left: 5px solid #ccc;
        background-color: rgba(238, 238, 238, 0.4);
      }
      .post-content-text-downloadLink {
        // text-indent: 2em;
        border-left: 5px solid #0ebd9a;
        background-color: #35b69c11;
      }
      .post-content-text-copyright {
        // text-indent: 2em;
        border-left: 5px solid #337ab7;
        background-color: #3379b70e;
      }
      .post-content-text {
        margin: 30px 0;
        padding: 10px 20px;
        font-size: 18px;
        .intexthighlight {
          color: rgb(26, 117, 255);
          line-height: 32.4px;
        }
      }
      .post-content-img {
        text-align: center;
        position: relative;
        overflow: hidden;
        .content-img {
          cursor: pointer;
        }
      }
      blockquote {
        background-color: rgba(238, 238, 238, 0.4);
        p {
          color: rgba(0, 0, 0, 0.9);
        }
      }
      .video-responsive {
        iframe {
          width: 100%;
          height: 720px;
        }
      }
      .download {
        position: relative;
        blockquote {
          background-color: #35b69c11;
          border-color: #0ebd9a;
          p {
            color: #086653;
          }
          // .tqm:hover,.jymm:hover {
          //   color: #449d44;
          //   background-color: #fff;
          //   border-color: #fff;
          // }
        }
      }
      .description {
        blockquote {
          background-color: #3379b70e;
          border-color: #337ab7;
          p {
            color: rgba(0, 0, 0, 0.801);
          }
        }
      }
    }
  }

blockquote {
    margin: 0;
}

.emptyStar {

}

.tqm, .jymm {
    border: 0;
    border-radius: 40px;
    background-color: #47b39d;
    border-color: #47b39d;
    outline: 0;
    padding: 8px 10px;
    margin-top: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}

.shadeLayer {
    position: fixed;
    background-color: rgba(146, 143, 143, 0.771);
    width: 100%;
    height: 110%;
    display: none;
    left: 0;
    top: -50px;
    z-index: 99;
    text-align: right;
}

.originImg {
    position: fixed;
    background-color: rgba(146, 143, 143, 0.2);
    z-index: 999;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    margin: 0 auto;
    text-align: center;
    display: none;
    img {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
    }
    .el-icon-close {
        position: absolute;
        color: #fff;
        right: 0;
        top: 0;
        font-size: 36px;
        cursor: pointer;
    }
}
h2 {
    margin: 0;
}
.preview {
    width: 100%;
}
pre {
    white-space:pre-wrap; /* css3.0 */ 
    white-space:-moz-pre-wrap; /* Firefox */ 
    white-space:-pre-wrap; /* Opera 4-6 */ 
    white-space:-o-pre-wrap; /* Opera 7 */ 
    word-wrap:break-word; /* Internet Explorer 5.5+ */ 
}
.article {
    margin-top: 80px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    margin-bottom: 40px;
}
.shade {
    background-color: rgba(238, 238, 238, 0.582);
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 998;
    
}
.top {
    text-align: center;
    background-color: #fbfbfb;
    border: 1px solid rgba(238, 238, 238, 0.719);
    border-bottom: 0;
    padding: 10px;
    font-size: 20px;
    color: #409eff;
    position: relative;
    i {
        position: fixed;
        right: 0;
        top: 0;
        font-size: 40px;
    }
}
</style>
