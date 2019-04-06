<template>
    <div class="findPassword">
        <nav-header></nav-header>
        <div class="content">
            <el-tabs type="border-card">
                <el-tab-pane label="密码找回">
                    <div class="type">
                        <div class="email">
                            <el-button type="text" @click="emailDialogVisible = true">
                                <img class="emailSvg" src="@/assets/svg/email_.svg" alt="">
                                <p>邮箱找回</p>
                            </el-button>

                            <el-dialog
                                title="验证密报"
                                :visible.sync="emailDialogVisible"
                                width="480px"
                                :center='true'
                                :before-close="handleClose"
                                >
                                <el-dialog
                                    width="480px"
                                    title="设置新的密码"
                                    :visible.sync="updateDialogVisible"
                                    :center='true'
                                    append-to-body>
                                    <el-form ref="form" :model="formData" label-width="80px">
                                        <el-form-item label="新的密码">
                                            <el-input type="password" maxlength="16" v-model="formData.newPassword"></el-input>
                                        </el-form-item>

                                        <el-form-item label="">
                                            <el-button style="float:right" type="primary" @click="update()">完 成</el-button>
                                            <el-button style="float:right;margin-right:20px;" @click="emailDialogVisible = updateDialogVisible = false">取 消</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-dialog>
                                <el-form ref="form" :model="formData" label-width="80px">
                                    <el-form-item label="邮箱">
                                        <el-input v-model="formData.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密保问题">
                                        <el-select v-model="formData.protectQuestion" placeholder="请选择密保问题">
                                        <el-option :label="item.question" :value="item.id" v-for="item in protectQuestion" :key="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="密保答案">
                                        <el-input v-model="formData.answer"></el-input>
                                    </el-form-item>
                                    <el-form-item label="">
                                        <el-button style="float:right" :loading="finishLoading" type="primary" @click="verify()">验 证</el-button>
                                        <el-button style="float:right;margin-right:20px;" @click="emailDialogVisible = false">取 消</el-button>
                                    </el-form-item>
                                </el-form>
                                
                            </el-dialog>
                            
                        </div>

                        <div class="protect">
                            <el-button type="text" @click="protectDialogVisible = true">
                                <img class="protectSvg" src="@/assets/svg/protect.svg" alt="">
                                <p>密保找回</p>
                            </el-button>

                            <el-dialog
                                title="提示"
                                :visible.sync="protectDialogVisible"
                                width="480px"
                                :center=true
                                :before-close="handleClose">

                                <el-dialog
                                    width="480px"
                                    title="设置新的密码"
                                    :visible.sync="update2DialogVisible"
                                    :center='true'
                                    append-to-body>

                                    <el-form ref="form" :model="formData" label-width="80px">
                                        <el-form-item label="新的密码">
                                            <el-input type="password" maxlength="16" v-model="formData.newPassword"></el-input>
                                        </el-form-item>

                                        <el-form-item label="">
                                            <el-button style="float:right" :loading="finishLoading" type="primary" @click="update()">完 成</el-button>
                                            <el-button style="float:right;margin-right:20px;" @click="protectDialogVisible = update2DialogVisible = false">取 消</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-dialog>

                                <el-form ref="form" :model="formData" label-width="80px">
                                    <el-form-item label="邮箱">
                                        <el-input maxlength="50" v-model="formData.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="验证码">
                                        <el-input style="width:200px;float:left" id="code" maxlength="6" v-model="code"></el-input>
                                        <el-button :loading="loading" style="float:right;width:144px;" type="default" @click="sendCode()"><span ref="codeSpan">发送验证码</span></el-button>
                                    </el-form-item>

                                    <el-form-item style="margin-top:40px" label="">
                                        <el-button style="float:right" type="primary" @click="codeVerfiy()">下一步</el-button>
                                        <el-button style="float:right;margin-right:20px;" @click="protectDialogVisible = false">取 消</el-button>
                                    </el-form-item>
                                    </el-form>

                            </el-dialog>
                        </div>
                        <div class="server">
                            <el-button @click="toHelp" type="text">
                                <img class="emailSvg" src="@/assets/svg/service.svg" alt="">
                                <p style="margin-top:20px;">客服找回</p>
                            </el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <nav-bottom></nav-bottom>
    </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import NavBottom from '@/components/NavBottom'
import DialogBox from '@/components/DialogBox'
import md5 from 'js-md5';

export default {
    components: {
        NavHeader,
        DialogBox,
        NavBottom
    },
    data() {
        return {
            emailDialogVisible: false,
            protectDialogVisible: false,
            updateDialogVisible: false, 
            emailTitle: '验证密保',
            formData: {
                protectQuestion: [],
                answer: '',
                email: '',
                newPassword: ''
            },
            protectQuestion: [],
            code: '',
            loading: false,
            finishLoading: false,
            qrCode: '',
            update2DialogVisible: false,
            isUpdate: false,
            intervalTime: '',
            oldTime: 0,
            oldSetTimeout: '',

        };
    },
    mounted() {
        this.getProtectQuestion()
    },
    destroyed() {
        clearInterval(this.intervalTime)
    },
    methods: {
        toHelp() {
            this.$router.push({path: '/sundry/help'})
        },
        getProtectQuestion() {
            this.$axios.post('/api/protect/getQuestion')
                .then(result => {
                    const { code, msg, data } = result.data
                    console.log(code, msg, data)
                    if( code === 0 ) {
                        this.$message({
                            type: 'error',
                            message: msg
                        })
                    }

                    if( code === 1 ) {
                        this.protectQuestion = data

                    }
                })
        },
        verify() {
            this.holdClick()
            if(this.formData.answer == '' || this.formData.email == '' || this.formData.protectQuestion.length == 0) {
                this.$message({
                    type: 'warning',
                    message: '请输入需要找回的账户邮箱并选择密保问题和输入密保答案'
                })
                return
            }

            // 正则验证 邮箱格式
            const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
            if( !reg.test(this.formData.email) ) {
                this.$message({
                    type: 'warning',
                    message: '邮箱格式错误'
                })
                return
            }

            this.$axios.post('/api/protect/verifyProtect',{question:this.formData.protectQuestion,email:this.formData.email,answer:this.formData.answer})
                .then(result => {
                    const { code, msg, data } = result.data
                    console.log(code, msg, data)
                    if( code === 0 ) {
                        this.$message({
                            type: 'error',
                            message: msg
                        })
                    }

                    if( code === 1 ) {
                        this.$message({
                            type: 'success',
                            message: msg
                        })
                        this.isUpdate = true
                        this.updateDialogVisible = true
                        this.emailDialogVisible = false
                    }
                })
            console.log(this.formData.protectQuestion,this.formData.answer)
        },
        update() {
            this.holdClick()
            //正则 密码验证
            if(!this.isUpdate) {
                this.$message.error('未验证')
                return
            }
            const passwordConfirm = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_@!#$%^&*()/]{8,16}$/
            if(!passwordConfirm.test(this.formData.newPassword)) {
                this.$message({
                    type: 'warning',
                    message: '密码格式错误，密码须包含字母和数字且不低于8位不多于16位'
                })
                return
            }
            this.loading = true
            console.log(this.formData.email, this.formData.newPassword)
            // 发起请求修改密码
            this.$axios.post('/api/protect/updatePassword',{email:this.formData.email,newpwd:this.formData.newPassword})
                .then( result => {
                    const { code, msg, data } = result.data
                    console.log(code, msg, data)

                    this.loading = false

                    if(sessionStorage.code) sessionStorage.removeItem('code');
                    this.isUpdate = false
                    if( code === 0 ) {
                        this.$message({
                            type: 'error',
                            message: msg
                        })
                    }

                    if( code === 1 ) {
                        this.$message({
                            type: 'success',
                            message: msg
                        })
                        this.updateDialogVisible = false
                        this.emailDialogVisible = false
                        setTimeout(() => {
                            this.$router.push({path: '/'})
                        }, 2800);
                    }

                    
                })
        },
        codeVerfiy() {


            if(this.code === '') {
                this.$message({
                    type: 'error',
                    message: '请输入正确的验证码'
                })
                return
            }
            
            // 发送请求 验证 验证码是否正确

            this.$axios.post('/api/code/verfiyCode',{email:this.formData.email, code: this.code})
                .then(result => {
                    const { code, msg, data } = result.data
                    console.log(code, msg, data)
                    // 验证失败
                    if( code === 0 ) {
                        this.$message.error(msg)
                        return
                    }
                    // 验证成功
                    if( code === 1 ) {
                        this.$message({
                            type: 'success',
                            message: msg
                        })
                        this.isUpdate = true
                        this.update2DialogVisible = true
                    }
                })


        },
        sendCode() {
            // 正则验证 邮箱格式
            const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
            if(!reg.test(this.formData.email)) {
                this.$message({
                    type: 'warning',
                    message: '邮箱格式错误'
                })
                return
            }
            this.$axios.post('/api/protect/emailIsExit',{email: this.formData.email})
                .then(result => {
                    const { code, msg, data } = result.data
                    console.log(code, msg, data)
                    if( code === 0 ) {
                        this.$message({
                            type: 'error',
                            message: msg
                        })
                        return
                    }
                    this.$axios.post('/api/code/sendQRCode',{email: this.formData.email})
                        .then( result => {
                            const { code, msg, data } = result.data
                            if( code === 0 ) {
                                this.$message.error(msg)
                                this.loading = false
                                return
                            }

                            if( code === 1 ) {
                                this.$message({
                                    type: 'success',
                                    message: msg
                                })
                                this.loading = true

                                // this.$refs.code.style.disabled = true
                                
                                console.log(data)
                                this.qrCode = data
                                localStorage.setItem('codeToken',data)
                                // console.log(this.qrCode)
                                this.isUpdate = true
                                let time = 60

                                this.intervalTime = setInterval(() => {
                                    time --
                                    this.$refs.codeSpan.innerHTML = '重新发送('+time + ')'
                                    if( time == 0 ) {
                                        clearInterval(this.intervalTime)
                                        this.$refs.codeSpan.innerHTML = '发送验证码'
                                        this.loading = false
                                    }
                                }, 1000);

                                if(this.oldSetTimeout!='') {
                                    clearTimeout(this.oldSetTimeout)
                                }
                                // 设置15分钟自动删除
                                this.oldSetTimeout = setTimeout(() => {
                                    if(localStorage.codeToken) localStorage.removeItem('codeToken');
                                }, 1000*60*15);
                            }
                        })
                })
        },
        holdClick() {
            if( this.oldTime == 0 ) {
                this.oldTime = new Date().getTime()
                console.log(1111)
            } else {
                console.log(2222)
                if(new Date().getTime() - this.oldTime < 5000) {
                    console.log(3333)
                    this.$message({
                        type: 'warning',
                        message: '请不要频繁点击操作'
                    })
                    return
                }
            }
        },
        handleClose() {
            this.formData.email = ''
            this.formData.answer = ''
            this.formData.newPassword = ''
            this.formData.protectQuestion = []
            this.code = ''
            this.emailDialogVisible = false
            this.protectDialogVisible = false
            this.updateDialogVisible = false
        }
        
    }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 2800px) and (max-width: 3440px) {
    .content {
        padding: 0 20% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 2550px) and (max-width: 2800px) {
    .content {
        padding: 0 15% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 2250px) and (max-width: 2550px) {
    .content {
        padding: 0 10% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 1500px) and (max-width: 2250px) {
    .content {
        padding: 0 6% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1500px) and  (min-width: 1200px) {
   .content {
        padding: 0 5% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1500px) and  (min-width: 1200px) {
   .content {
        padding: 0 5% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1200px) and  (min-width: 992px) {
   .content {
        padding: 0 3% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (max-width: 992px) {
   .content {
        padding: 0 2% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (max-width: 992px) and (min-width: 400px) {
  /* .content {
    width: 10% !important;
    margin: 0;
  } */
  
}

.content {
    padding: 0 10%;
    .type {
        height: 360px;
        display: flex;
        padding: 50px;
        div {
            flex: 1;
            width: 100%;
            height: 100%;
            // box-shadow: 0 0 11px rgba(180, 182, 211, 0.637);
            border-radius: 8px;
            text-align: center;
            // line-height: 500px;
            .emailSvg {
                width: 200px;
                height: 200px;
                display: block;
            }
            .protectSvg {
                width: 200px;
                height: 200px;
                margin-top: 10px;
                display: block;
            }
        }
        .protect {
            margin: 0 20px;
        }
    }
}
</style>
