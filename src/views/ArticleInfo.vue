<template>
    <div>
        <div class="article">
            <nav-header></nav-header>
            
            <div class="shadeLayer" @click="hiddenOrg">
            </div>
            <div class="originImg" ref="originImg" @click="hiddenOrg">
                <img ref="showOrigin" src="@/assets/images/1788.png" alt="" title="点击返回">
                <i class="el-icon-close" @click="hiddenOrg" title="关闭"></i>
            </div>

            <div class="content clearfix" v-if="loading" ref="content">
                <div class="left clearfix">
                    
                    <break-box :isOk=isOk :articleType="'/article'">
                        <slot slot="type">
                            <router-link :to="'/article?type='+ infoData.type +'&page_index=1&page_size=10&search=null'">
                                {{ infoData.type | typeFormat}}
                            </router-link>
                        </slot>
                        <slot slot="articleTitle">
                            <i class="el-icon-arrow-right"></i>
                            {{ infoData.title }}
                        </slot>
                    </break-box>
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
                                    <span>{{ infoData.releaseTime | dateFormat }}</span>
                                </li>
                                <li class="hidden-xs">
                                    <img src="@/assets/svg/size.svg" alt="">
                                    <span>{{ infoData.size | sizeFormat}}</span>
                                
                                </li>
                            </ul>
                            
                            <div class="mark">
                                
                                <el-tooltip class="item" effect="dark" content="点击收藏" placement="bottom" v-if="!isFavorite">
                                <i class="el-icon-star-off" @click="favorite(1,infoData.id)"></i>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="取消收藏" placement="bottom" v-if="isFavorite">
                                <i class="el-icon-star-on" @click="favorite(0,infoData.id)"></i>
                                </el-tooltip>
                            </div>
                        </div>
                        <div class="post-content mdf_connect">
                            
                            <div class="post-content-img" v-for="item of infoData.img" :key="item"> 
                            <br>
                            <img class="content-img" 
                                ref="infoImg"
                                alt="" 
                                title="点击查看原图" 
                                :data-original="item" 
                                :src="'http://localhost:3006'+item" 
                                @click="showOrigin(item)"
                                style="display: inline-block;">
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
                                style="color:#337ab7;word-wrap: break-word;word-break: break-all;" 
                                v-text="infoData.downloadLink === '' ? '无':infoData.downloadLink">
                                    {{ infoData.downloadLink }}
                                </a>
                                <br>
                                提取码: <span ref="tqm" id="tqm" v-text="infoData.downloadPassword === '' ? '无':infoData.downloadPassword"></span>&nbsp;&nbsp;
                                
                                <el-tooltip class="item" effect="dark" content="点击复制提取码" placement="bottom" >
                                <button 
                                    @click="copyCode1"
                                    @mouseover="copyCode1"
                                    id="btnTips1" type="button" 
                                    class="tqm btn btn-success" 
                                    data-toggle="popover" 
                                    title="" data-content="已复制"
                                    ref="btnTips1"
                                    data-clipboard-target="#tqm"
                                    v-if="infoData.downloadPassword === '' ? false:true"
                                >复制提取码</button>
                                </el-tooltip>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                解压密码: <span ref="jymm" id="jymm" v-text="infoData.downloadUnzip === '' ? '无':infoData.downloadUnzip">{{infoData.downloadUnzip}}</span>  &nbsp;&nbsp;

                                <el-tooltip class="item" effect="dark" content="点击复制解压密码" placement="bottom" >
                                    
                                <button 
                                    @mouseover="copyCode2"
                                    @click="copyCode2"
                                    id="btnTips2" type="button" 
                                    class="jymm btn btn-success" 
                                    data-toggle="popover" title="" 
                                    data-content="已复制"
                                    ref="btnTips2"
                                    data-clipboard-target="#jymm"
                                    v-if="infoData.downloadUnzip === '' ? false:true"
                                >复制解压密码</button>
                                </el-tooltip>
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

                    <!-- 评论组件 -->
                    <comment-box :commentsData=commentsData :replysData=replysData :isShow=commentShow @getCommentsAndReplys=getCommentsAndReplys></comment-box>
                </div>
                <div class="right clearfix hidden-sm-and-down">
                    <swiper :height='height' :swiperData=swiperData :isShow=swiperIsShow></swiper>
                    <aside-box></aside-box>
                </div>
            </div>
            <div v-if="!loading" style="text-align: center;margin: 100px;">
                <img src="@/assets/images/lazy8.gif" style="height:208px;width:208px;" alt="">
            </div>
            <nav-bottom></nav-bottom>
            <to-top-box></to-top-box>
        </div>
        
    </div>
</template>
<script>
import moment from 'moment'
import NavHeader from '@/components/NavHeader'
import AsideBox from '@/components/AsideBox'
import NavBottom from '@/components/NavBottom'
import BreakBox from '@/components/BreakBox'
import Swiper from '@/components/Swiper'
import CommentBox from '@/components/CommentBox'
import ToTopBox from '@/components/ToTopBox'

import Clipboard from 'clipboard';

export default {
    components: {
        NavHeader,
        Swiper,
        AsideBox,
        NavBottom,
        BreakBox,
        CommentBox,
        ToTopBox
    },
    data() {
        return {
            isFavorite: false,
            haveVideoLink: false,
            height: '200px',
            infoData: {},
            clipboard: {},
            isOk: false,
            oldTime: 0,
            commentShow: false,
            commentsData: [],
            replysData: [],
            swiperData: [],
            swiperIsShow: false,
            loading: false
        }
    },
    filters: {
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
        this.getArticleInfoData();
        this.checkIsFavorite()
        this.getCommentsAndReplys()
        // const copybtn = this.$refs.btnTips1
        // this.clipboard = new Clipboard(copybtn);

        this.getSwiperData()
        // 如果图片宽度大于内容宽度 则把img 设置 成 width 100%
        window.onload = () => {

            let content = this.$(this.$refs.content).height()
            let mainContent = this.$(this.$refs.mainContent).width()
            let img = this.$(this.$refs.infoImg).width()
            // console.log(content,mainContent,img)
            if (img > mainContent) {
                this.$(this.$refs.infoImg).css("width","100%")
            }
        }
    },
    updated() {
        let content = this.$(this.$refs.content).height()
        let mainContent = this.$(this.$refs.mainContent).width()
        let img = this.$(this.$refs.infoImg).width()
        // console.log(content,mainContent,img)
        if (img > mainContent) {
            this.$(this.$refs.infoImg).css("width","100%")
        }
    },
    methods: {
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
        hiddenOrg() {
            this.$refs.originImg.style.display = "none"
            this.$(".shadeLayer").css("display","none")
        },
        favorite(type,id) {
            // 验证是否登录
            if( !this.$store.state.isAuthenticated) {
                this.$message.error('请登录后操作')
                return 
            }
            // 禁止连续点击收藏
            let newTime = new Date().getTime()
            if( this.oldTime != 0 ) {
                if( parseInt(newTime) - parseInt(this.oldTime) < 5000) {
                    this.$message({
                        type: 'warning',
                        message: '点击操作频率过快'
                    })
                    return
                } else {
                    this.oldTime = parseInt(newTime)
                }               
            } else {
                this.oldTime = parseInt(newTime)
            }
            // 收藏
            if(type == 1) {
                // console.log('addFavorite')
                this.$axios.post('/api/users/addFavorite',
                    {
                        userId: this.$store.state.user.id,
                        articleId: this.infoData.id
                    })
                    .then( result => {
                        const { code, msg, data} = result.data
                        
                        if ( code === 0 ) {
                            this.$message.error(msg)
                            this.$router.push({path: '/notFound'})
                            return
                        }

                        if( code === 1 ) {
                            this.isFavorite = true
                            this.$notify({
                                type: 'success',
                                title: '文章收藏成功'
                            })
                        }
                    })
            }
            // 取消收藏
            if(type == 0) {
                this.$axios.post('/api/users/cancelFavorite',
                    {
                        userId: this.$store.state.user.id,
                        articleId: this.infoData.id
                    })
                    .then( result => {
                        const { code, msg, data} = result.data
                        if ( code === 0 ) {
                            this.$message.error(msg)
                            this.$router.push({path: '/notFound'})
                            return
                        }

                        if( code === 1 ) {
                            this.isFavorite = false
                            this.$notify({
                                type: 'success',
                                title: '已取消文章收藏'
                            })
                        }
                    })
            }
        },
        go() {
            const type = this.infoData.type
            
        },
        copyCode1() {
            const copybtn = this.$refs.btnTips1
            this.clipboard = new Clipboard(copybtn);
        },
        copyCode2() {
            const copybtn = this.$refs.btnTips2
            this.clipboard = new Clipboard(copybtn);
        },
        like() {

        },
        
        showOrigin(src) {
            // window.scrollTo(0,0)
            this.$refs.showOrigin.src = `http://localhost:3006` + src
            // console.log(src)
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
        
        showAndhideTips2() {

        },
        // 获取文章数据
        getArticleInfoData() {
            this.loading = false
            this.$axios.post('/api/articleInfos/',{id: this.$route.params.id})
            .then( result => {
                this.loading = true
                this.toTop()
                const { code, msg, data} = result.data
                if ( code === 0 ) {
                    this.$message.error(msg)
                    this.$router.push({path: '/notFound'})
                    return
                }
                
                // console.log(data)
                this.infoData = data
                this.isOk = true

                // 处理图片路径 
                String.prototype.replaceAll = function(s1,s2){ 
                    return this.replace(new RegExp(s1,"gm"),s2); 
                }
                let test = /(\")|(\])|(\[)/
                let img = []
                // test = /\[\]\"/ img路径
                if(this.infoData.img === "" | this.infoData.img === null) {
                    return
                }
                // 大小
                if(this.infoData.size !=null ) {
                    this.infoData.size = this.infoData.size.toUpperCase().replaceAll(/^\s+|\s+$/g, '')
                }
                this.infoData.img = this.infoData.img.replaceAll(test,"")
                if(this.infoData.img.indexOf(",") > -1) {
                    this.infoData.img.split(",").forEach( item => {
                    img.push("" + item)
                    })
                }else {
                    img.push("" + this.infoData.img)
                }
                this.infoData.img = img
                if( this.infoData.videoLink === "" || this.infoData.videoLink === null ) {
                    this.haveVideoLink = false
                    return
                }

                let videoStart = this.infoData.videoLink.toString().indexOf("/av") + 3
                this.infoData.videoLink = "//player.bilibili.com/player.html?aid=" + this.infoData.videoLink.substring(videoStart,videoStart+8)
                this.haveVideoLink = true

            })
        },
        // 如果登录访问 则查询该文章用户是否已收藏
        checkIsFavorite() {
            // 如果未登录
            if( !this.$store.state.isAuthenticated ) return;

            this.$axios.post('/api/users/isFavorite',
                {userId: this.$store.state.user.id, articleId: this.$route.params.id})
                .then( result => {
                    const { code, msg, data} = result.data
                    // console.log(code)
                    // console.log(msg)
                    // console.log(data)
                    if ( code === 0 ) {
                        this.$message.error(msg)
                        this.$router.push({path: '/notFound'})
                        return
                    }

                    if( code === 1 ) {
                        this.isFavorite = parseInt(data) == 1? true : false
                    }
                })
        },
        // 回到顶部
        toTop() {
            window.scrollTo(0, 0)
        },
        // 获取该文章的评论回复数据
        getCommentsAndReplys() {
            this.commentShow = false
            const articleId = this.$route.params.id
            this.$axios.post('/api/comments/getComments',{articleId: articleId})
                .then( result => {
                    const { code, msg, data} = result.data
                    // console.log(code)
                    // console.log(msg)
                    // console.log(data)
                    if ( code === 0 ) {
                        this.$message.error(msg)
                        this.$router.push({path: '/notFound'})
                        return
                    }

                    if( code === 1 ) {
                        this.commentsData = data.comments
                        this.replysData = data.replys
                        setTimeout(() => {
                            this.commentShow = true
                        }, 1);
                    }
                })
        }
    }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 2800px) and (max-width: 3440px) {
    .content,.swiper-div {
        padding: 0 20% !important;
        transition: all 0.3s ease;
    }
    .video-responsive {
        iframe {
            height: 1100px !important;
            transition: all 0.3s ease;
        }
    }
}
@media screen and (min-width: 2550px) and (max-width: 2800px) {
    .content,.swiper-div {
        padding: 0 15% !important;
        transition: all 0.3s ease;
    }
    .video-responsive {
        iframe {
            height: 900px !important;
            transition: all 0.3s ease;
        }
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
    .video-responsive {
        iframe {
            height: 700px !important;
            transition: all 0.3s ease;
        }
    }
    
}
@media screen and (max-width: 1500px) and  (min-width: 1200px) {
   .content,.swiper-div {
        padding: 0 5% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1200px) and (min-width: 992px) {
   .content,.swiper-div {
        padding: 0 1% !important;
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
.content {
    padding: 0 10%;
    // min-width: 992px;
    // display: flex;
    .left {
        // flex: 4;
        width: 80%;
        float: left;
    }
    
    .right {
        padding: 0 1%;
        padding-right: 0;
        // flex: 1;
        width: 19%;
        float: left;
    }
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
        // border-bottom: 1px solid #eee;
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
            word-wrap: break-word;
            word-break: break-all;
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
                color: #40a0ffdd;
                background-image: -webkit-gradient(linear, left 50, right 0, from(rgba(252, 88, 252, 0.993)), to(rgb(88, 116, 255)));
                -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
                -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
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
        word-wrap: break-word;
        word-break: break-all;
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
          // width: 100%;
        //   height: 100%;
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
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>
