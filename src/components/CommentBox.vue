<template>
    <section class="comment">
        <!-- 标题 -->
        <section class="section-title techniques-title clearfix">
            <h2>评论区</h2>
            <div class="main-comment">
                <div class="comment-head">
                    <span class="comment-count">{{ commentsData.length + replysData.length }} 评论</span>
                </div>
            </div>
        </section>
        <!-- 发表评论 -->
        <div class="comment-sendDiv">
            <div class="comment-send ">
                <div class="user-face">
                    <img class="user-head" :src="CommentAvatar">
                </div>
                <div class="textarea-container">
                <i class="ipt-arrow"></i>
                <textarea v-model="commentContent" cols="80" name="msg" rows="5" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" class="ipt-txt">
                </textarea>
                <button type="button" @click="SendComment" class="comment-submit">发表评论</button>
                </div>
            </div>
        </div>
        <!-- 评论列表 -->
        
        <div class="comment-list" v-for="(item, index) in commentsData" :key="item.id">
            <div class="list-item reply-wrap">
                <div class="user-face">
                    <a href="javascript:void(0);" target="_blank">
                        <img :src="`http://localhost:3006`+item.avatar" alt="">
                    </a>
                    
                    <div class="hot-follow" style="display: none">
                        <button class="follow-btn">关注</button>
                    </div>
                </div>

                <div class="con">
                
                <div class="user">
                    <a href="javascript:void(0);" target="_blank" :ref="`commentName`+3" class="name vip-red-name">{{ item.nickname }}</a>
                    <p class="text">{{ item.content }}</p>
                </div>
                
                <div class="info">
                    <span class="floor"># {{ commentsData.length - index }}</span>
                    <span class="plad">
                    来自<a href="javascript:void(0);" target="_blank">网页客户端</a>
                    </span>
                    <span class="time">{{ item.createTime | commentDateFormat}}</span>
                    <span :ref="`like`+3" @click="commentLike(3)" class="like " style="display: none">
                        <i class="fa fa-thumbs-o-up"></i>
                        <span :ref="`commentLikeCount`+3">{{ item.like }}</span>
                    </span>
                    <span @click="reply(item.id, item.nickname)" class="reply btn-hover btn-highlight">回复</span>

                    <div class="operation" style="display: none">
                        <div @click="showOpera(item.id)" class="spot"><i class="fa fa-ellipsis-v"></i></div>
                        <div @mouseleave="hiddenOpera(item.id)" :ref="`operaList`+item.id" class="opera-list">
                            <ul>
                            <li class="blacklist">加入黑名单</li>
                            <li class="report">举报</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="replay-box" v-for="reply of filter(item.id)" :key="reply.id">
                    <div class="replay-item reply-wrap">
                    <a href="javascript:void(0);" target="_blank" class="reply-face">
                        <img class="reply-face-img" :src="`http://localhost:3006`+reply.fromAvatar" alt="">
                    </a>
                    <div class="replay-con">
                        <div class="user">
                            <a href="javascript:void(0);" target="_blank" class="name vip-red-name" :ref="`commentName`+4" >{{ reply.fromNickname  }}</a>
                            <span class="text-con" v-if="reply.reply_type === 0">{{ reply.content }}</span>
                            <span class="text-con" v-if="reply.reply_type === 1"> <a href="javascript:void(0);">@{{ reply.nickname }}</a> : {{ reply.content }}</span>
                        </div>
                        <div class="info">
                            <span class="time">{{ reply.createTime | commentDateFormat}}</span>
                            <span :ref="`like`+4" @click="commentLike(4)" class="like " style="display: none">
                                <i class="fa fa-thumbs-o-up"></i>
                                <span :ref="`commentLikeCount`+4">24</span>
                            </span>
                            <span @click="replyToReply(item.id, reply.fromNickname, reply.from_uid)" class="reply btn-hover">回复</span>
                            <div class="operation btn-hover btn-hide-re" style="display: none">
                                <div  @click="showOpera(4)" class="spot"><i class="fa fa-ellipsis-v"></i></div>
                                <div @mouseleave="hiddenOpera(4)" :ref="`operaList`+4" class="opera-list" style="display: none;">
                                <ul>
                                    <li class="blacklist">加入黑名单</li>
                                    <li class="report">举报</li></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
                
                <!-- //回复@回复评论区 -->
                <div class="comment-send" :ref="item.id" >
                    <div class="user-face">
                        <img class="user-head" :src="CommentAvatar">
                    </div>
                    <div class="textarea-container">
                        <i class="ipt-arrow"></i>
                        <textarea v-model="replyComment" :ref="`text`+item.id" cols="80" name="msg" rows="5" maxlength="1000" placeholder="" class="ipt-txt"></textarea>
                        <button type="botton" @click="sendReply(item.id, item.from_uid)" class="comment-submit">发表评论</button>
                    </div>
                </div>

                </div>
            </div>
        </div>

        <div class="wrap" ref="tips">{{ tips }}</div>
    </section>
</template>
<script>

import moment from 'moment'

export default {
    props: {
        commentsData: Array,
        replysData: Array,
        // isShow: Boolean
    },
    data() {
        return {
            commentSendId: 0,
            commentContent: "",
            topicId: this.$route.params.id,
            replyComment: "",
            replyType: 0,
            toUid: "",
            tips: "",
            CommentAvatar: this.$store.state.isAuthenticated ? 'http://localhost:3006' + this.$store.state.user.avatar : 'http://localhost:3006/avatar/default.png',
            oldTime: 0

        }
    },
    filters: {
        commentDateFormat: dateStr => {
            dateStr = parseInt(dateStr)
            moment.locale('zh-cn') //设置中文显示
            return moment(dateStr).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    mounted() {
        
    },
    methods: {
        
        filter(id) {
            const result = this.replysData.filter( (reply, index) => {
                
                return reply.reply_id === id 
            })
            return result
        },
        SendComment() {
            
            console.log('sendComment')
            // 未登录则提示
            if( !this.$store.state.isAuthenticated ){
                this.$message({
                    type: 'warning',
                    message: '请登录后操作'
                })
                return
            }


            // 未填写评论内容
            if( this.commentContent.trim().length < 1 ) {
                this.$message({
                    type: 'warning',
                    message: '请填写评论内容，评论内容不能只含空格字符'
                })
                return
            }
            let newTime = new Date().getTime()
            if( this.oldTime != 0 ) {
                if( parseInt(newTime) - parseInt(this.oldTime) < 5000 ) {
                    this.$message({
                        type: 'warning',
                        message: '评论回复操作频繁，请稍后再试。'
                    })
                    console.log(this.oldTime,newTime)
                    return
                }
            } else {
                this.oldTime = newTime
            }

            this.$axios.post('/api/comments/sendComment',
                {
                    topicId: this.topicId,
                    topicType: 0,
                    content: this.commentContent,
                    fromUid: this.$store.state.user.id,
                    createTime: new Date().getTime(),
                    like: 0
                })
                .then( result => {
                    const { code, msg, data } = result.data
                    console.log(code)
                    console.log(msg)
                    console.log(data)

                    if ( code === 0 ) {
                        this.$message.error('服务器异常，评论失败')
                        this.commentContent = ""
                        return
                    }

                    if ( code === 1 ) {
                        this.$notify({
                            type: 'success',
                            title: '评论成功'
                        })
                        this.commentContent = ""
                        this.$emit('getCommentsAndReplys')
                    }
                })
                .catch( err=> {
                    if( sessionStorage.token ) {
                        sessionStorage.removeItem('token')
                    }
                    if( localStorage.token ) {
                        localStorage.removeItem('token')
                    }
                    this.$notify.error('登录失效，请重新登录')
                    this.$store.dispatch('clearCurrentState')
                })
            

            

        },
        commentLike(id) {

        },
        // 弹出回复框
        reply(id, nickname) {
            console.log('reply')
            console.log(id)
            console.log(nickname)

            // 未登录则提示
            if( !this.$store.state.isAuthenticated ){
                this.$message({
                    type: 'warning',
                    message: '请登录后操作'
                })
                return
            }

            this.commentSendId = id
            this.$(this.$refs[id]).css("display","block")
            this.$(this.$refs[`text`+id]).focus()
            this.$(this.$refs[`text`+id]).attr("placeholder",`回复 @`+ nickname + `: `)
            this.toUid = this.$store.state.user.id
            this.replyType = 0
        },
        showOpera(id) {
            // 获取对应dom
            const operaList = this.$refs[`operaList`+id];
            const status = operaList.style.display
            //  设置显示和隐藏
            if (status === "block") {
                $(operaList).css("display","none")
            }else {
                $(operaList).css("display","block")
            }
        },
        hiddenOpera(id) {

        },
        replyToReply(id, replyNickname, fromId) {
            console.log('replyToReply')
            //未登录
            if( this.$store.state.isAuthenticated === false ){
                this.$message({
                    type: 'warning',
                    message: '请登录后操作'
                })
                return
            }
            
            let newTime = new Date().getTime()
            if( this.oldTime != 0 ) {
                if( parseInt(newTime) - parseInt(this.oldTime) < 10000 ) {
                    this.$message({
                        type: 'warning',
                        message: '评论回复操作频繁，请稍后再试。'
                    })
                    return
                }
            } else {
                this.oldTime = newTime
            }
            this.commentSendId = id
            this.$(this.$refs[id]).css("display","block")
            this.$(this.$refs[`text`+id]).focus()
            this.$(this.$refs[`text`+id]).attr("placeholder",`回复 @`+ replyNickname + `: `)
            
            
            if(this.$store.state.user.nickname === replyNickname){
                this.replyType = 0
                return
            }
            this.toUid = fromId
            this.replyType = 1
        },
        sendReply(id, fromUid) {
            // 如果未登录
            if( this.$store.state.isAuthenticated == false ){
                this.$message({
                    type: 'warning',
                    message: '请登录后操作'
                })
                return
            }

            let newTime = new Date().getTime()
            if( this.oldTime != 0 ) {
                if( parseInt(newTime) - parseInt(this.oldTime) < 10000 ) {
                    this.$message({
                        type: 'warning',
                        message: '评论回复操作频繁，请稍后再试。'
                    })
                    return
                }
            } else {
                this.oldTime = newTime
            }

            if(this.replyComment.trim().length > 0) {
                this.$axios.post("/api/comments/sendReply",
                {
                    commentId: this.topicId,
                    replyId: id,
                    replyType: this.replyType,
                    content: this.replyComment,
                    fromUid: this.$store.state.user.id,
                    fromNickname: this.$store.state.user.nickname,
                    fromAvatar: this.$store.state.user.avatar,
                    toUid: this.toUid,
                })
                .then(result => {
                    console.log(result)
                    const { code, msg, data } = result.data
                    if( code === 0 ) {
                        this.$notify({
                            type: 'error',
                            title: msg
                        })
                        return
                    }

                    if( code === 1 ) {
                        this.$notify({
                            type: 'success',
                            title: msg
                        })
                    }
                    this.$emit('getCommentsAndReplys')
                })
                this.replyComment = ""
            } else {
                this.$message({
                    type: 'warning',
                    message: '请填写评论内容，评论内容不能只含空格字符'
                })
                return
            }
        }
    },
    
    watch: {
        // 回复模块隐藏和显示 回复下一条评论 则隐藏上一条回复框
        commentSendId(newVal, oldVal) {
            if( oldVal !== 0) {
                this.$(this.$refs[oldVal]).css("display","none")
            }

        },
    },
    components: {
    },
    computed: {
        reverseSum() {
            return this.commentsData.reverse();
        }
    },

}
</script>
<style lang="scss" scoped>

//评论区
.comment {
    margin: 15px 0;
    padding: 0 15px;
    background-color: #fff;
    border: 1px solid #eee;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.094);
    .section-title h2 {
        font-size: 24px;
        float: left;
        padding-bottom: 5px;
        margin-bottom: -2px;
        border-bottom: 2px solid;
        margin-top: 10px;
    }
    .section-title, .techniques-title h2  {
        border-bottom-color: #337ab7;
  
        .main-comment {
            padding: 15px 0;
            .comment-head {
                .comment-count {
                    font-size: 20px;
                    margin: 0 20px;;
                }
            }
        }
    }

    .comment-sendDiv {
        margin: 15px 0;
        .comment-send {
            .user-face {
                float: left;
                margin: 7px 0 0 5px;
                position: relative;
                .user-head {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                }
            }
            .textarea-container {
                .textarea {
                    
                }
            }
            .textarea-container {
                position: relative;
                margin-left: 85px;
                margin-right: 80px;
                textarea {
                    font-size: 16px;
                    display: inline-block;
                    box-sizing: border-box;
                    background-color: #f4f5f7;
                    border: 1px solid #e5e9ef;
                    overflow: auto;
                    border-radius: 4px;
                    color: #555;
                    width: 100%!important;
                    height: 65px;
                    transition: 0s;
                    padding: 5px 10px;
                    line-height: normal;
                    resize:none;
                    outline: none;
                    overflow-x: hidden;
                }
                textarea:focus, textarea:hover {
                    background-color: #fff;
                    background-color: #fff !important;
                    border: 1px solid #337ab7;
                }
                .comment-submit {
                    width: 70px;
                    height: 64px;
                    position: absolute;
                    right: -80px;
                    top: 0;
                    padding: 4px 15px;
                    font-size: 16px;
                    color: #fff;
                    border-radius: 4px;
                    text-align: center;
                    min-width: 60px;
                    vertical-align: top;
                    cursor: pointer;
                    background: -webkit-linear-gradient(left ,#2574fce1, #409EFF); 
                    background: -o-linear-gradient(right, #2574fce1, #409EFF); 
                    background: -moz-linear-gradient(right, #2574fce1, #409EFF); 
                    background: linear-gradient(111deg ,#2574fce1, rgb(143, 83, 255)); 
                    border: none;
                    transition: .1s;
                    user-select: none;
                    outline: none;
                }
            }
        }
    }
    // 评论列表
    .comment-list {
        .list-item {
            // max-height: 230px;
            // overflow: hidden;
            .user-face {
                float: left;
                margin: 14px 0 0 5px;
                position: relative;
                img {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                }
                .hot-follow {
                    text-align: center;
                    position: relative;
                    top: 18px;
                    .follow-btn {
                        width: 48px;
                        height: 24px;
                        padding: 0;
                        color: #fff;
                        font-size: 14px;
                        background-color: #337ab7;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        outline: none;
                    }
                }
            }
            // ------------------ con ------------------
            .con {
                position: relative;
                margin-left: 85px;
                padding: 22px 0 14px;
                border-top: 1px solid #e5e9ef;
                //------------------ user ------------------
                .user {
                    font-size: 14px;
                    font-weight: 700;
                    line-height: 18px;
                    padding-bottom: 4px;
                    display: block;
                    word-wrap: break-word;
                    .text {
                        line-height: 20px;
                        padding: 2px 0;
                        font-size: 16px;
                        text-shadow: none;
                        overflow: hidden;
                        word-wrap: break-word;
                        word-break: break-word;
                        font-weight: 400;
                        margin-bottom: 0;
                    }
                }
                // ------------------ info ------------------
                .info>span {
                    margin-right: 20px;
                }
                // ------------------info ----------------------------
                .info {
                    color: #99a2aa;
                    line-height: 26px;
                    font-size: 14px;
                .floor {

                }
                .plad {
                    a {
                        color: #99a2aa;
                    }
                }
                .time {

                }
                .like:hover, .hate:hover {
                    i {
                        color: #337ab7;
                    }
                }
                .like {
                    cursor: pointer;
                    i {
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        vertical-align: text-top;
                        margin-right: 5px;
                        
                        background-position: -153px -25px;
                    }
                }
                .hate {
                    cursor: pointer;
                    margin-right: 15px;
                    i {
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        vertical-align: text-top;
                        margin-right: 5px;
                        background-position: -153px -153px;
                    }
                }
                .reply {
                    padding: 0 5px;
                    border-radius: 4px;
                    margin-right: 15px;
                    cursor: pointer;
                    display: inline-block;
                }
                .operation {
                    position: relative;
                    width: 18px;
                    float: right;
                    margin-top: 5px;
                    margin-right: 0;
                    .spot {
                        width: 18px;
                        height: 18px;
                        cursor: pointer;
                        background-position: -151px -280px;
                    }
                    .opera-list {
                        display: none;
                        position: absolute;
                        width: 100px;
                        right: 0;
                        top: 20px;
                        z-index: 10;
                        background: #fff;
                        box-shadow: 0 0 5px rgba(0,0,0,.2);
                        border-radius: 4px;
                        color: #222;
                        font-size: 14px;
                        padding: 10px 0;
                        z-index: 999;
                        ul {
                            margin: 0;
                            padding: 0;
                            list-style: none;
                            li {
                            padding: 0 15px;
                            cursor: pointer;
                            height: 36px;
                            line-height: 36px;
                            transition: all .3s;
                            }
                            li:hover {
                            background: #337ab7;
                            color: #fff;
                            }
                            .blacklist {

                            }
                            .report {

                            }
                        }
                    }
                }
                }
                    // ---------------replay-box-------------------
                .replay-box {
                    .replay-item {
                        vertical-align: middle;
                        padding: 10px 0;
                        .reply-face {
                            float: left;
                            margin-top: 0px;
                            margin-left: 5px;
                            margin-right: 5px;
                            .reply-face-img {
                                width: 24px;
                                height: 24px;
                                border-radius: 50%;
                            }
                        }
                        .replay-con {
                            max-width: 85%;
                            display: inline-block;
                            margin-left: 6px;
                            .user {
                                .text-con {
                                    font-size: 16px;
                                    font-weight: 400;
                                    margin-left: 10px;
                                }
                            }
                            .info {
                                color: #99a2aa;
                                line-height: 26px;
                                font-size: 12px;
                                width: 100%;
                                display: block;
                            }
                            .info>span {
                                margin-right: 20px;
                                .like {
                                    cursor: pointer;
                                    i { 
                                        display: inline-block;
                                        width: 14px;
                                        height: 14px;
                                        vertical-align: text-top;
                                        margin-right: 5px;
                                        background-position: -153px -25px;
                                    }
                                }
                                .reply {
                                    padding: 0 5px;
                                    border-radius: 4px;
                                    margin-right: 15px;
                                    cursor: pointer;
                                    display: inline-block;
                                }
                                .operation {
                                    padding: 0;
                                    border-radius: 0;
                                    margin-right: 0;
                                    display: block;
                                    position: relative;
                                    width: 18px;
                                    float: right;
                                    margin-top: 5px;
                                    margin-right: 0;
                                    .spot {
                                        width: 18px;
                                        height: 18px;
                                        cursor: pointer;
                                        background-position: -151px -280px;
                                    }
                                    .opera-list {
                                        display: block;
                                        position: absolute;
                                        width: 100px;
                                        right: 0;
                                        top: 20px;
                                        z-index: 10;
                                        background: #fff;
                                        box-shadow: 0 0 5px rgba(0,0,0,.2);
                                        border-radius: 4px;
                                        color: #222;
                                        font-size: 16px;
                                        padding: 10px 0;
                                        z-index: 999;
                                        ul {
                                            li {
                                                padding: 0 15px;
                                                cursor: pointer;
                                                height: 36px;
                                                line-height: 36px;
                                                transition: all .3s;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // --------回复@回复评论区
                .comment-send {
                    margin: 10px 0;
                    display: none;
                    .user-face {
                        float: left;
                        margin: 0 auto;
                        position: relative;
                        .user-head {
                            width: 48px;
                            height: 48px;
                            border-radius: 50%;
                        }
                    }
                    .textarea-container {
                        position: relative;
                        margin-left: 85px;
                        margin-right: 80px;
                        .ipt-arrow {
                        position: absolute;
                        left: -12px;
                        top: 22px;
                        width: 13px;
                        height: 20px;
                        display: inline-block;
                        z-index: 2;
                        }
                        .ipt-txt:hover, .ipt-txt:focus {
                            background-color: #fff;
                            border: 1px solid #337ab7;
                        }
                        .ipt-txt {
                            font-size: 16px;
                            display: inline-block;
                            box-sizing: border-box;
                            background-color: #f4f5f7;
                            border: 1px solid #e5e9ef;
                            overflow: auto;
                            border-radius: 4px;
                            color: #555;
                            width: 100%!important;
                            height: 65px;
                            transition: 0s;
                            padding: 5px 10px;
                            line-height: normal;
                            outline: none;
                            resize: none;
                        }
                        .comment-submit {
                            width: 70px;
                            height: 64px;
                            position: absolute;
                            right: -80px;
                            top: 0;
                            padding: 4px 15px;
                            font-size: 14px;
                            color: #fff;
                            border-radius: 4px;
                            text-align: center;
                            min-width: 60px;
                            vertical-align: top;
                            cursor: pointer;
                            background-color: #337ab7;
                            border: 1px solid #337ab7;
                            transition: .1s;
                            user-select: none;
                            outline: none;
                        }
                    }
                }
            }
        }
    }
}

.comment-sendDiv {
    .comment-send {
            font-size: 18px;
        .textarea-container {
            font-size: 18px;
            .textarea {
            }
        }
    }
}

.wrap{
    position: fixed;
    left: 50%;
    top:50%;
    background: rgba(0,0,0,.35);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    display: none;
}

.con {
    overflow: hidden;
}

.showAllReply {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 12px;
    margin: 0 20px;
}
a {
    text-decoration: none;
    color: #337ab7;
}
.name {
    font-size: 17px;
}
</style>
