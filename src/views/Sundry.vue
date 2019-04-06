<template>
    <div class="article">
        <nav-header></nav-header>
        <div class="content">
            <!-- <div class="left">
                
            </div>
            <div class="right">
            </div> -->
            <div class="main-content">
                <el-tabs type="border-card" v-model="selectTab">
                    <el-tab-pane>
                        <span slot="label"><i class="el-icon-question"></i> 帮助</span>
                        <div class="help">
                            <div class="logo">
                                <img src="@/assets/images/1788.png" alt="">
                            </div>
                            <div class="qrcode">
                                <img src="@/assets/images/qrcode.jpg" alt="">
                            </div>
                            <p class="helpTips">
                                如需帮助请关注微信公众号并留言或留下客服QQ：2085203270，邮箱：1788music@gmail.com
                            </p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><img src="@/assets/svg/header/send.svg" class="sendImg" alt=""> 发送反馈</span>
                        <div class="feedback">
                            <div class="form">
                                <el-form :model="feedback" status-icon :rules="rules2" ref="feedback" label-width="40px" class="demo-ruleForm">
                                <el-form-item label="标题" prop="title">
                                    <el-input v-model="feedback.title" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="内容" prop="content">
                                    <el-input type="textarea" v-model="feedback.content" autocomplete="off"></el-input>
                                </el-form-item>
                                
                                <el-form-item style="text-align:center;margin-top:50px;">
                                    <el-button @click="resetForm('feedback')">重置</el-button>
                                    <el-button type="primary" :loading=loading @click="submitForm('feedback')">提交反馈</el-button>
                                </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><img src="@/assets/svg/copyright.svg" class="sendImg" alt=""> 版权中心</span>
                        <div class="copyright">
                            
                            <img src="@/assets/images/1788.png" alt="">
                            <p>
                                1·* 本站点上的所有文章均为用户投稿,仅供学习和研究使用。
                            </p>
                            <p style="color: #FF6A6A">
                                2·* 如本站内容有侵犯你的权益,请来信到邮箱：1788music@qq.com收到邮件后,本站将会立即审核并做出改正。1788MUSIC绝对尊重互联网版权,努力净化网络版权环境。
                            </p>
                            <p>
                                3·* 访问本站的用户必须明白,1788MUSIC对本站文章内容等不拥有任何权利,其版权归该投稿者所有;
                            </p>
                            <p>
                                4·* 用户投稿须原创,或经授权拥有版权，如有侵权行为,将立即删除侵权内容并做出相应侵权机制措施。

                            </p>
                            <p>
                                5·* 根据二〇〇二年一月一日《计算机软件保护条例》规定：为了学习和研究软件内含的设计思想和原理,通过安装、显示、
                                传输或者存储软件等方式使用软件的,可以不经软件著作权人许可,不向其支付报酬。
                                不论何种情形我们都不对任何由于使用或无法使用本网站提供的信息所造成的直接的、间接的、附带的、特殊的或余波
                                所及的损失、丢失、债务或中断负任何责任（不论是可预见的或是不可预见的,即使我们巳被告知这种可能性）。
                                未经本站的明确许可,任何人不得大量链接本站下载资源；不得复制或仿造本网站。
                            </p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><img src="@/assets/svg/header/sponsor.svg" class="sendImg" alt=""> 赞助</span>
                        <div class="sponsor">
                            <div class="sponsorQrcode">
                                <img src="@/assets/images/sponsor.png" alt="">
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><i class="el-icon-share"></i> 关于我们</span>
                        <div class="about-me">
                            <img src="@/assets/images/1788.png" alt="">
                            <p>
                                1·* 1788MUSIC创站旨在为广大音乐制作人提供更多优质资源。
                            </p>
                            <p>
                                2·* 1788MUSIC网站只由站长一人开发上线管理维护，如有意加入1788MUSIC，请来信到邮箱1788MUSIC@gmail.com
                            </p>
                            <p>
                                3·* 1788MUSIC网站每月需要支付高昂的服务器费用，如果本站能够帮助到你，能为你创造价值，希望能为本站提供
                                <router-link to="/sponsor" target="_blank">赞助</router-link>
                                ，以帮助本站能保持正常运营。
                            </p>
                            <p style="color:rgb(255, 106, 106);">
                                4·* 1788MUSIC对本站文章内容等不拥有任何权利,其版权归该投稿者所有。
                            </p>
                            <p>
                                5·* 1788MUSIC官方微信公众号 1788MUSIC ，哔哩哔哩 1788MUSIC ，官方微博 1788MUSIC ，欢迎订阅关注我们。
                            </p>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <nav-bottom></nav-bottom>
        <to-top-box></to-top-box>
    </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavBottom from '@/components/NavBottom'
import ToTopBox from '@/components/ToTopBox'

export default {
    components: {
        NavHeader,
        NavBottom,
        ToTopBox,
    },
    mounted() {
        window.scrollTo(0,0)
        this.tab()
        this.$(Array.prototype.slice.call(this.$('textarea'))[0]).css('height','250px')
    },
    data() {
        let validateTitle = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('反馈标题不能为空'));
            }
            callback();
        };
        let validateContent = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('反馈内容不能为空'));
            }
            callback();
        };
        
        return {
            feedback: {
                title: '',
                content: ''
            },
            rules2: {
                title: [
                    { validator: validateTitle, trigger: 'blur' }
                ],
                content: [
                    { validator: validateContent, trigger: 'blur' }
                ]
            },
            oldTime: 0,
            loading: false,
            selectTab: '0',
        };
    },
    methods: {
        tab() {
            if( this.$route.params.type == 'help') {
                this.selectTab = '0'
            } else if( this.$route.params.type == 'feedback') {
                this.selectTab = '1'
            } else if( this.$route.params.type == 'copyright') {
                this.selectTab = '2'
            } else if( this.$route.params.type == 'sponsor') {
                this.selectTab = '3'
            } else if( this.$route.params.type == 'aboutme') {
                this.selectTab = '4'
            } else {
                this.selectTab = '0'
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let newTime = new Date().getTime()
                if( this.oldTime != 0 ) {
                    if( parseInt(newTime) - parseInt(this.oldTime) < 60000 ) {
                        this.$message({
                            type: 'warning',
                            message: '提交反馈操作频繁，请稍后再试。'
                        })
                        return
                    }
                } else {
                    this.oldTime = newTime
                }
                console.log(this.oldTime,newTime)
                this.loading = true
                this.$axios.post('/api/users/sendFeedback',
                    {userId: this.$store.state.user.id,title: this.feedback.title,content: this.feedback.content})
                    .then( result =>{
                        this.feedback.title = ''
                        this.feedback.content = ''
                        this.loading = false
                        const { code , msg, data } = result.data
                        if( code === 0 ) {
                            
                            this.$message.error(msg)
                            return
                        }
                        if( code === 1 ) {
                            this.$notify({
                                type: 'success',
                                title: msg
                            })
                        }
                    })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
    .feedback {
        padding:  2% 10% !important;
        transition: all 0.3s ease;
    }
    .copyright p {
        padding: 0 10% !important;
        transition: all 0.3s ease;
    }
}

@media screen and (max-width: 1200px) {
   .content,.swiper-div {
        padding: 0 1% !important;
        transition: all 0.3s ease;
    }
    .feedback {
        padding:  2% 6% !important;
        transition: all 0.3s ease;
    }
    .copyright p {
        padding: 0 5% !important;
        transition: all 0.3s ease;
    }
}

.help {
    text-align: center;
    margin-bottom: 50px;
    .logo {
        width: 100%;
        height: 100%;
        img {
            height: 100%;
        }
    }
    .qrcode {
        margin-top: -50px;
        img {
            width: 30%;
        }
    }
    .helpTips {
        text-align: center;
        font-size: 18px;
        color: #555;
        word-wrap:break-word;
        word-break:break-all;
    }
}
.sendImg {
    width: 14px;
    height: 14px;
    vertical-align: -2px;
}
.feedback {
    padding:  2% 20%;
}

.copyright {
    text-align: center;
    margin-bottom: 50px;
    img {
        margin-bottom: -30px;
    }
}

.copyright p {
    margin: 20px 0;
    font-size: 20px;
    background-color: #fff;
    border: 0;
    padding: 0 20%;
    text-align: left;
    word-wrap:break-word;
    word-break:break-all;
}
.sponsor {
    text-align: center;
    margin-bottom: 50px;
    img {
        width: 60%;
    }
}
.about-me {
    text-align: center;
    margin-bottom: 50px;
    img {
        margin-bottom: -30px;
    }
}
.about-me p {
    font-size: 20px;
    background-color: #fff;
    border: 0;
    padding: 0 10%;
    text-align: left;
    color: #555;
    word-wrap:break-word;
    word-break:break-all;
}
</style>

