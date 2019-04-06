<template>
    <div class="register" :class="{show: !isRegisterShow}" @click.self="closeWindow">
        <!-- Form -->
        
        <div class="register-content">
            <div class="close">
                <i class="el-icon-close" @click="closeWindow" title="关闭"></i>
            </div>
            <div class="logo">
                <img src="@/assets/images/favicon.png" alt="">
            </div>
            <div class="register-title">
                <div class="line"></div>
                <span class="title">注&nbsp;&nbsp;册</span>
            </div>
            <el-form :model="loginData" status-icon :rules="rules2" ref="loginData" label-width="60px"         class="demo-ruleForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginData.email" placeholder="请输入注册邮箱" autocomplete="off" style="width:280px;">
                    </el-input>
                </el-form-item>

                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="loginData.pass" placeholder="请输入注册密码"  autocomplete="off" style="width:280px;"></el-input>
                </el-form-item>
                
                <el-form-item label="" prop="qrcode">
                    <el-input v-model="loginData.qrcode" placeholder="请输入验证码" minlength="6" maxlength="6" autocomplete="off" class="inputQRCode" ></el-input>
                    <el-button class="qrcode" :loading="loading" @click="sendCode('loginData')">
                        <span ref='codeSpan'>发送验证码</span>
                    </el-button>
                </el-form-item>
                

                <el-form-item>
                    <el-button type="primary" :loading="submitLoading" class="button" @click="submitForm('loginData')">
                        <span ref="registerSpan">注&nbsp;&nbsp;册</span>
                    </el-button>
                    <!-- <el-button type="primary" :loading="true">加载中</el-button> -->
                </el-form-item>
                <el-form-item>
                    <span class="hidden-sm-and-down">已有帐号？</span> 
                    <a href="javascript:void(0)" @click="goLogin" style="color:#67c29a;">立即登录</a>
                    <router-link to="/findPassword" style="margin-left:90px;color:#6b11cb;">忘记密码</router-link>

                </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>
<script>
import md5 from 'js-md5';

export default {
    props: {
        isRegisterShow: Boolean
    },
    data() {
        // 验证密码
        const validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } 
            //正则 密码验证
            const passwordConfirm = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_@!#$%^&*()/]{8,16}$/
            if( !passwordConfirm.test(value)){
            //验证不匹配 密码格式错误
                callback(new Error('密码须包含字母和数字且不能含有某些特殊字符'));
            }
            callback();
        };
        // 验证邮箱
        const validateEmail = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入邮箱'));
            } 
            // 正则验证
            const re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
            if(!re.test(value)) {
                return callback(new Error('请输入正确的邮箱地址'));
            }
            callback();
            
        };
        // 验证 验证码
        const validateQrcode = (rule, value, callback) => {
            if (value === '') {
            } 
            // 验证码验证
            // if ( md5(md5(value)) != this.qrCode ) {
            //     console.log(1111111111)
            //     console.log(md5(md5(value)))
            //     console.log(this.qrCode)
            //     callback(new Error('请输入正确的验证码'));
            // }
            callback();
        };
        
        return {
            isRemember: false,
            loginData: {
                pass: '',
                email: '',
                qrcode: ''
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' },
                    { min: 8, max: 16, message: '密码长度须在8-16位区间'}
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' },
                    { min: 6, max: 32, message: '邮箱长度须在6-32位区间'}
                ],
                qrcode: [
                    { validator: validateQrcode, trigger: 'blur' },
                    { min: 6, max: 6, message: '请输入验证码'}
                ]
            },
            loading: false,
            oldTime: 0,
            qrCode: '',
            submitLoading: false

        };
    },
    methods: {
        sendCode(formName) {
            this.loading = true

            this.$refs[formName].validateField(['email'], err => {
                if(err) {
                    this.$message.error('请填写正确的未注册的邮箱地址')
                    this.loading = false
                    return false;
                }
            })
            this.$refs[formName].validateField(['pass'], err => {
                if(err) {
                    this.$message.error('密码格式错误，发送验证码失败。')
                    this.loading = false
                    return false;
                }
                // 阻止连续点击
                let newTime = new Date().getTime()
                if( this.oldTime != 0 ) {
                    if( parseInt(newTime) - parseInt(this.oldTime) < 10000 ) {
                        this.$message({
                            type: 'warning',
                            message: '发送验证码操作频繁，请稍后再试。'
                        })
                        // console.log(this.oldTime,newTime)
                        this.loading = false
                        return
                    }
                } else {
                    this.oldTime = newTime
                }
                this.$axios.post('/api/users/sendQRCode',{email: this.loginData.email})
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
                            
                            this.qrCode = data
                            console.log(this.qrCode)

                            let time = 60

                            let intervalTime = setInterval(() => {
                                time --
                                this.$refs.codeSpan.innerHTML = '重新发送('+time + ')'
                                if( time == 0 ) {
                                    clearInterval(intervalTime)
                                    this.$refs.codeSpan.innerHTML = '发送验证码'
                                    this.loading = false
                                }
                            }, 1000);

                            
                        }
                        
                    })
            })
            
        },
        closeWindow() {
            this.$emit("switchRegister")
        },
        goLogin() {
            this.$emit("closeRegOpenLog")
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.submitLoading = true
                // console.log(11111111111)
                this.$axios.post('/api/users/register',{account: this.loginData.email, password: this.loginData.pass, code: this.loginData.qrcode })
                    .then( result => {
                        const { code, msg, data } = result.data

                        if( code === 0 ) {
                            this.$message.error(msg)
                            // this.loginData.email  = ''
                            // this.loginData.pass  = ''
                            this.qrCode = ''
                            this.submitLoading = false
                            return
                        }

                        if( code === 1 ) {
                            this.$message({
                                type: 'success',
                                message: msg
                            })
                            this.loginData.email  = ''
                            this.loginData.pass  = ''
                            this.qrCode = ''
                            this.$refs.registerSpan.innerHTML = '注册成功，正在跳转登录页'
                            setTimeout(() => {
                                this.$refs.registerSpan.innerHTML = '注&nbsp;&nbsp;册'
                                this.$emit('closeRegOpenLog')
                                this.submitLoading = false
                            }, 1000);
                            
                        }
                        
                    })
            } else {
                this.$message.error('请完整正确填写表单后注册')
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


@media screen and (max-width: 992px) and (min-width: 400px) {
    .register-content {
        width: 320px !important;
        height: 450px !important;
    }
    .el-input {
        width: 230px !important;
    }
    .button {
        width: 230px !important;
        padding: 0;
        height: 45px;
        span {
            color: #fff;
            font-size: 18px;
            
        }
    }
    .tips {
        width: 230px !important;
    }
    .forget {
        margin-left: 20px !important;
    }
    .register-title {
        padding: 0 8% !important;
    }
    .title {
        left: 31% !important;
    }

    .inputQRCode {
        width: 120px !important;
    }
    .qrcode {
        width: 105px !important;
        span {
            font-size: 14px !important;
        }
    }
}


.register {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(34, 34, 34, 0.473);
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .register-content {
        position: absolute;
        width: 400px;
        height: 500px;
        background-color: #fff;
        left: 50%;
        top: 23%;
        transform: translateX(-50%);
        border-radius: 4px;
        padding: 20px;
        box-shadow: 0 6px 50px rgba(0, 0, 0, 0.123), 0 6px 50px rgba(0, 0, 0, 0.089) inset;
        .close {
            position: absolute;
            right:  -30px;
            top: -30px;
            i {
                font-size: 30px;
                color: #fff;
                cursor: pointer;
            }
            i:hover {
                transform: rotate(180deg);
                transition: all .3s ease;
            }
        }
        .logo {
            text-align: center;
            img {
                width: 60%;
                margin-top: -30%;
            }
        }

        .register-title {
            padding: 0 15%;
            margin-top: 15px;
            height: 50px;
            position: relative;
            .line {
                height: 2px;
                background-color: #653a9ec5;
                background: -webkit-linear-gradient(left ,#2575fc, #6b11cbb6); 
                background: -o-linear-gradient(right, #2575fc, #6b11cbb6); 
                background: -moz-linear-gradient(right, #2575fc, #6b11cbb6); 
                background: linear-gradient(to right ,#2575fc, #6b11cbb6); 
            }
            .title {
                font-size: 24px;
                position: absolute;
                left: 35%;
                width: 120px;
                text-align: center;
                top: -23px;
                background-color: #fff;
                color: #666;
                

            }
        }
    }
}

.button {
    width: 280px;
    padding: 0;
    height: 45px;
    background: -webkit-linear-gradient(left , #409EFF,#2574fce1); 
    background: -o-linear-gradient(right, #409EFF,#2574fce1); 
    background: -moz-linear-gradient(right, #409EFF,#2574fce1); 
    background: linear-gradient(to right , #409EFF,#2574fce1); 
    span {
        color: #fff;
        font-size: 18px;
        
    }


}



.el-input {
    input {
        padding: 0 50px;
    }
}

.show {
    display: none;
}

.qrcode, .qrcode:hover, .qrcode:focus {
    width: 138px;
    padding: 0;
    height: 40px;
    border: 0;
    border-radius: 4px;
    vertical-align: -1px;
    background-color: #3eaf99;
    border-color: #3eaf99;
    background: -webkit-linear-gradient(left ,#183db688, #6b11cb80); 
    background: -o-linear-gradient(right, #183db688, #6b11cb80); 
    background: -moz-linear-gradient(right, #183db688, #6b11cb80); 
    background: linear-gradient(to right ,#183db688, #6b11cb80); 
    span {
        color: #fff;
        font-size: 16px;
    }
}


// .el-form-item:nth-child(3) {
//     margin-left: 15px;
// }

.inputQRCode {
    width: 140px;
}
</style>
