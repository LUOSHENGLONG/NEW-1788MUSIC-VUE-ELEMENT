<template>
    <div class="login" :class="{show: !isLoginShow}" @click.self="closeWindow">
        <!-- Form -->
        
        <div class="login-content">
            <div class="close">
                <i class="el-icon-close" @click="closeWindow" title="关闭"></i>
            </div>
            <div class="logo">
                <img src="@/assets/images/favicon.png" alt="">
            </div>
            <div class="login-title">
                <div class="line"></div>
                <span class="title">登&nbsp;&nbsp;录</span>
            </div>
            <el-form :model="loginData" status-icon :rules="rules2" ref="loginData" label-width="60px" class="demo-ruleForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginData.email" autocomplete="off" style="">
                    </el-input>
                </el-form-item>

                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="loginData.pass" autocomplete="off" style=""></el-input>
                </el-form-item>
                
                <el-form-item class="hidden-sm-and-down">
                    <img src="@/assets/svg/flag.svg" style="width:6%;vertical-align:-5px;margin-right:10px;" alt="">
                    记住账号，并自动登录
                    <img src="@/assets/svg/login.svg" style="width:7%;vertical-align:-5px;margin-right:35px;" alt="">
                    <el-switch
                        v-model="isAutoLogin"
                        active-color="#13ce66"
                        style=""
                        inactive-color="#ff4949">
                    </el-switch>

                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="button" :loading="loading" @click="submitForm('loginData')">
                        <span>登&nbsp;&nbsp;录</span>
                    </el-button>
                    <!-- <el-button type="primary" :loading="true">加载中</el-button> -->
                
                </el-form-item>
                <el-form-item class="tips">
                    <span class="hidden-sm-and-down">没有帐号？</span> 
                    <a href="javascript:void(0)" @click="goRegister" style="color:#67c29a;">立即注册</a>
                    <router-link to="/findPassword" class="forget">忘记密码</router-link>

                </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>
<script>

import jwt_decode from 'jwt-decode'

export default {
    mounted() {
        
    },
    props: {
        isLoginShow: Boolean
    },
    data() {
        // 验证密码
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } 
            //正则 密码验证
            const passwordConfirm = /^[a-zA-Z][a-zA-Z0-9_]{7,16}$/
            if( !passwordConfirm.test(value)){
            //验证不匹配 密码格式错误
                callback(new Error('密码须包含字母和数字且在8-16位区间'));
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
        
        return {
            isAutoLogin: false,
            loginData: {
                pass: '',
                email: ''
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' },
                    { min: 8, max: 16, message: '密码长度须在8-16位区间'}
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' },
                    { min: 6, max: 32,type: 'email', message: '邮箱长度须在6-32位区间'}
                ]
            },
            loading: false
        };
    },
    methods: {
        
        closeWindow() {
            this.$emit("switchLogin")
        },
        goRegister() {
            this.$emit("closeLogOpenReg")
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 验证通过 
                    this.loading = true

                    const account = this.loginData.email
                    const password = this.loginData.pass
                    this.$axios.post('/api/users/login', {account: account, password: password, isAutoLogin: this.isAutoLogin})
                        .then( result => {
                            const { code, msg, data} = result.data
                            if ( code === 0 ) {
                                this.$message.error(msg)
                                this.loading = false
                                return
                            }
                            // 此时data返回的是 token
                            // console.log(document.cookie)
                            const token = data
                            // sessionStorage.setItem('token', token)
                            localStorage.setItem('token', token)

                            // 如设置自动登录 token时长15天 并储存到localStorage
                            // this.isAutoLogin == true ? localStorage.setItem('token', token) : ''
                            const decode = jwt_decode(token)
                            // console.log(decode)
                            // 存储数据
                            this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode))
                            this.$store.dispatch("setUser", decode)
                            // 
                            // sessionStorage.setItem('login',decode.nickname)
                            this.$notify({
                                title: decode.nickname + '， 欢迎回来！',
                                type: 'success'
                            });
                            this.loading = false

                            this.$emit("closeLogAndReg")
                            // this.$router.go(0)
                        })

                } else {
                    this.$message.error('请输入正确的邮箱地址和匹配的密码');
                    return false;
                }
            });
        },
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
  }


    


    

</script>

<style lang="scss" scoped>
@media screen and (max-width: 992px) and (min-width: 400px) {
    .login-content {
        width: 320px !important;
        height: 400px !important;
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
    .login-title {
        padding: 0 8% !important;
    }
    .title {
        left: 31% !important;
    }
    
}

.login {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(34, 34, 34, 0.473);
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .login-content {
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

        .login-title {
            padding: 0 15%;
            margin-top: 15px;
            height: 50px;
            position: relative;
            .line {
                height: 2px;
                background: -webkit-linear-gradient(left, #6b11cbb6 ,#2575fc); 
                background: -o-linear-gradient(right, #6b11cbb6, #2575fc); 
                background: -moz-linear-gradient(right, #6b11cbb6, #2575fc); 
                background: linear-gradient(to right, #6b11cbb6 ,#2575fc); 

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
    span {
        color: #fff;
        font-size: 18px;
        
    }
    background: -webkit-linear-gradient(left ,#2574fce1, #409EFF); 
    background: -o-linear-gradient(right, #2574fce1, #409EFF); 
    background: -moz-linear-gradient(right, #2574fce1, #409EFF); 
    background: linear-gradient(to right ,#2574fce1, #409EFF); 

}



.el-input {
    width:280px;
    input {
        padding: 0 50px;
    }
}

.show {
    display: none;
}

.forget {
    margin-left: 90px;
    color:#6b11cb;
}
</style>
