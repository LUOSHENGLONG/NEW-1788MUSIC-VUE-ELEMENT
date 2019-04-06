<template>
    <div class="user-info-box">
        
        <div class="box-card">
            <div class="clearfix header">
                <h3>昵称</h3>
            </div>
            <div class="line"></div>
            <div class="content">
                <div class="description">
                    <div class="description-content">
                        <p class="nickname-p" style="margin: 17px 0;" v-show="!showNickNameInput">{{ user.nickname }}</p>
                        <el-form :label-position="'left'" label-width="20%" v-show="showNickNameInput"  :model="formLabelAlign">
                            <el-form-item label="" style="width: 80%">
                                <el-input v-model="userInfo.nickname" maxlength="8" :placeholder="user.nickname"></el-input>
                            </el-form-item>
                        </el-form>
                        <div v-show="!showNickNameInput" >
                            <el-button style="padding:0;" type="text" @click="showNickName">
                                <span style="color:#409EFF">修改</span>
                            </el-button>
                        </div>
                        <div v-show="showNickNameInput" >
                            <el-button style="padding:0;" type="text" @click="closeNickName">
                                <span style="color:#409EFF">取消</span>
                            </el-button>
                            <el-button style="padding:0;" type="text" @click="submitNickname">
                                <span style="color:#409EFF">更新</span>
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="box-card">
            <div class="clearfix header">
                <h3>邮箱</h3>
            </div>
            <div class="line"></div>

            <div class="content">
                <div class="description">
                    <div  class="description-content">
                        <p style="margin: 17px 0;">{{ user.email }}</p>
                        <div>
                            <el-button style="padding:0;" type="text" disabled>
                                <span style="color:#bbb">不可修改</span>
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="box-card">
            <div class="clearfix header">
                <h3>密保设置</h3>
            </div>
            <div class="line"></div>
            <div class="content">
                <div class="description">
                    <div  class="description-content">
                        <p style="margin: 17px 0;">{{ isSettingProtect == 0 ? '未设置' : '已设置' }}</p>
                        <div>
                            <!-- <el-button style="padding:0;" type="text">
                                <span style="color:#409EFF">设置</span>
                            </el-button> -->
                            <el-button type="text" @click="dialogFormVisible = true" style="padding: 0;">{{ isSettingProtect == 0 ? '设置' : '修改' }}</el-button>
                            <el-dialog width="480px" :title="isSettingProtect == 0 ? '密保设置' : '密保验证'" :visible.sync="dialogFormVisible" >
                            
                            <el-dialog
                                width="480px"
                                title="设置新的密保"
                                center
                                :visible.sync="innerVisible"
                                append-to-body>

                                <el-form :model="protect" ref="protectData" style="width: 90%;">
                                <el-form-item label="密保问题" :label-width="'100px'">
                                <el-select v-model="protect.question" placeholder="请选择密保问题" style="width: 100%;">
                                    <el-option :label="item.question" :value="item.id"  v-for="item in protectQuestion" :key="item.id"></el-option>
                                    
                                </el-select>
                                </el-form-item>

                                <el-form-item label="密保答案" :label-width="'100px'">
                                <el-input v-model="protect.answer" autocomplete="off"></el-input>
                                </el-form-item>
                                
                                <el-form-item label="" :label-width="'100px'" style="margin:0;margin-top: 60px;">
                                    
                                    <el-button type="primary" @click="updataProtect" style="float: right;">更新密保</el-button>
                                    <el-button @click="innerVisible = false" style="float: right;margin-right: 10px;">取 消</el-button>
                                </el-form-item>

                            </el-form>
                            </el-dialog>
                            
                            <el-form :model="protect" ref="protectData" style="width: 90%;">
                                <el-form-item label="密保问题" :label-width="'100px'">
                                <el-select v-model="protect.question" placeholder="请选择密保问题" style="width: 100%;">
                                    <el-option :label="item.question" :value="item.id"  v-for="item in protectQuestion" :key="item.id"></el-option>
                                    
                                </el-select>
                                </el-form-item>

                                <el-form-item label="密保答案" :label-width="'100px'">
                                <el-input v-model="protect.answer" autocomplete="off"></el-input>
                                </el-form-item>
                                
                            </el-form>

                            <div slot="footer" class="dialog-footer"  style="width: 90%;">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" v-if="isSettingProtect==0" @click="settingProtect">确 定</el-button>
                                <el-button type="primary" v-if="isSettingProtect==1" @click="verifyProtect">验证密保</el-button>
                            </div>
                            </el-dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-card">
            <div class="clearfix header">
                <h3>手机号码</h3>
            </div>
            <div class="line"></div>

            <div class="content">
                
                <div class="description">
                    <div class="description">
                        <div  class="description-content">
                            <p style="margin: 17px 0;">未绑定</p>
                            <div>
                                <el-button style="padding:0;" type="text" disabled>
                                    <span style="color:#bbb">等待开放</span>
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="box-card">
            <div class="clearfix header">
                <h3>注册时间</h3>
            </div>
            <div class="line"></div>
            <div class="content">
                <div class="description">
                    <div class="description">
                        <div  class="description-content">
                            <p style="margin: 17px 0;">{{ user.createTime | dateFormat }}</p>
                            <div>
                                <el-button style="padding:0;" type="text" disabled>
                                    <span style="color:#bbb">不可修改</span>
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="box-card">
            <div class="clearfix header">
                <h3>
                    实名状态
                    <!-- <el-button style="float: right; padding: 5px 0;" type="text">
                        <span style="color:#409EFF">修改</span>
                    </el-button> -->
                </h3>
                
            </div>
            <div class="line"></div>

            <div class="content">
                
                <div class="description">
                    
                    <div class="description">
                        <div  class="description-content">
                            <p style="margin: 17px 0;">未开通</p>
                            <div>
                                <el-button style="padding:0;" type="text" disabled>
                                    <span style="color:#bbb">等待开放</span>
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

import jwt_decode from 'jwt-decode'
import moment from 'moment'

export default {
    
    data() {
        

        return {
            labelPosition: 'left',
            
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            userInfo: {
                nickname: '',
                avatar: '',

            },
            showNickNameInput: false,
            oldTime: 0,
            dialogFormVisible: false,
            innerVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            protect: {
                question: '',
                answer: ''
            },
            isSettingProtect: 0,
            protectQuestion: []

        }
    },
    mounted() {
        this.getProtect()
        this.getProtectQuestion()
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    methods: {
        updataProtect() {
            if( this.protect.question == "") {
                this.$message.error('请选择新的密保问题进行修改')
                return
            }
            if( this.protect.answer == "") {
                this.$message.error('请输入新的密保答案进行修改')
                return
            }

            this.$axios.post('/api/protect/updataProtect',
                {
                    email: this.$store.state.user.email,
                    question: this.protect.question,
                    answer: this.protect.answer,
                })
                .then(result => {
                    const { code, msg ,data } = result.data
                    if( code === 0 ) {
                        this.$message.error(msg)
                        return
                    }

                    if( code === 1 ) {
                        this.protect.question = ''
                        this.protect.answer = ''
                        this.$notify({
                            type: 'success',
                            title: msg
                        })
                        this.protect.question = ''
                        this.protect.answer = ''
                        this.innerVisible = false
                        this.dialogFormVisible = false
                        return
                    }
                })
        },
        verifyProtect() {
            if( this.protect.question == "") {
                this.$message.error('请选择密保问题进行验证')
                return
            }
            if( this.protect.answer == "") {
                this.$message.error('请输入密保答案进行验证')
                return
            }

            this.$axios.post('/api/protect/verifyProtect',
                {
                    email: this.$store.state.user.email,
                    question: this.protect.question,
                    answer: this.protect.answer,
                })
                .then(result => {
                    const { code, msg ,data } = result.data
                    if( code === 0 ) {
                        this.$message.error(msg)
                        return
                    }

                    if( code === 1 ) {
                        this.protect.question = ''
                        this.protect.answer = ''
                        this.$message({
                            type: 'success',
                            message: msg
                        })
                        this.innerVisible = true
                        this.dialogFormVisible = false
                        return
                    }
                })
        },
        settingProtect() {
            
            if( this.protect.question == "") {
                this.$message.error('请选择密保问题')
                return
            }
            if( this.protect.answer == "") {
                this.$message.error('请输入密保答案')
                return
            }

            this.$axios.post('/api/protect/settingProtect',
                {
                    email: this.$store.state.user.email,
                    question: this.protect.question,
                    answer: this.protect.answer,
                })
                .then(result => {
                    const { code, msg ,data } = result.data
                    if( code === 0 ) {
                        this.$message.error(msg)
                        return
                    }

                    if( code === 1 ) {
                        this.getProtect()
                        this.dialogFormVisible = false
                        this.$message({
                            type: 'success',
                            message: msg
                        })
                        this.protect.question = ''
                        this.protect.answer = ''
                        return
                    }
                })
        },
        getProtectQuestion() {
            this.$axios.post("/api/protect/getQuestion")
                .then( result => {
                    const { code, msg ,data } = result.data
                    if( code === 0 ) {
                        this.$message.error(msg)
                        return
                    }

                    if( code === 1 ) {
                        this.protectQuestion = data
                        
                        return
                    }
                })
        },
        getProtect() {
            this.$axios.post('/api/protect/getProtect',{email: this.$store.state.user.email})
                .then( result => {
                    const { code, msg ,data } = result.data
                    if( code === 0 ) {
                        this.$message.error(msg)
                        return
                    }

                    if( code === 1 ) {
                        this.isSettingProtect = parseInt(data.count)
                        return
                    }
                })
        },
        showNickName() {
            this.showNickNameInput = true
        },
        closeNickName() {
            this.showNickNameInput = false
        },
        submitNickname() {
            let nickname = this.userInfo.nickname

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

            // 如果存在空格则替换
            String.prototype.replaceAll = function(s1,s2){ 
                return this.replace(new RegExp(s1,"gm"),s2); 
            }
            nickname = nickname.replaceAll(/\s/, "")

            // 判断新昵称是否与旧昵称相同
            if(this.user.nickname == nickname) {
                this.$message({
                    type: 'warning',
                    message: '新昵称与旧昵称相同'
                })
                return
            }

            // 判断新昵称是否为空
            if( nickname == '') {
                this.$message({
                    type: 'warning',
                    message: '新昵称不能为空'
                })
                return
            }

            // 判断昵称长度 
            if( nickname.length > 8 ) {
                this.$message({
                    type: 'warning',
                    message: '新昵称长度大于8位'
                })
                return
            }
            // 判断新昵称是否为包含特殊字符 和 空格
            const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");

            if( pattern.test(nickname) ) {
                this.$message({
                    type: 'warning',
                    message: '新昵称包含特殊字符'
                })
                return
            }

            this.$axios.post('/api/users/updateNickname',{nickname: nickname,id:this.$store.state.user.id})
            .then(result => {
                const { code, msg, data} = result.data
                if ( code === 0 ) {
                    this.$message.error(msg + 'updateNickename')
                    return
                }
                
                if( code === 1) {
                    // 修改成功 重新获取token
                    const token = data
                    sessionStorage.setItem('token', token)
                    localStorage.setItem('token', token)

                    const decode = jwt_decode(token)
                    // 存储数据
                    this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode))
                    this.$store.dispatch("setUser", decode)
                    // this.$router.go(0)
                    this.closeNickName()
                    this.$message({
                        type: 'success',
                        message: msg
                    })
                }
            })
            

        },
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        },
    },
    filters: {
        dateFormat: dataStr => {
            dataStr = parseInt(dataStr)
            moment.locale('zh-cn') //设置中文显示
            return moment(dataStr).format('YYYY-MM-DD HH:mm:ss');
        },
    }
}
</script>

<style lang="scss" scoped>

@media screen and (max-width: 992px) {
   .content {
        padding: 0 1% !important;
        margin-top: 0px !important;
        transition: all 0.3s ease;
    }
    .box-card {
        width: 98% !important;
    }
    .user-info-box {
        padding: 0 !important;
        padding-left: 12% !important;
    }
    
    
}


.user-info-box {
    padding: 0 5%;
}
.box-card {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;
    display: inline-block;
    width: 30%;
    margin: 2% 1%; 
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .header {
        padding: 5px 20px;
        
    }
    .line {
        height: 1px;
        width: 100%;
        background: #ebeef5;
    }
}
.content {
    display: flex;
    margin: 0;
    padding: 10px 20px;
    text-align: center;
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
        font-size: 16px;
        height: 115px;
        color: #444;
        overflow: hidden;
        display: block;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        .description-content {
            margin: 0;
            margin: 20px 0;
        }
        .info {
            margin: 0;
            ul{
                margin: 0;
                padding: 0;
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
    font-size: 20px;
    font-weight: 400;
    color: #444555;
    text-align: center;
}

</style>
