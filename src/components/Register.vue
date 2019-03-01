<template>
    <div class="login" :class="{show: !isRegisterShow}" @click.self="closeWindow">
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
                    <el-input v-model="loginData.qrcode" placeholder="请输入验证码" maxlength="6" autocomplete="off" style="width:140px;"></el-input>
                    <el-button class="qrcode">
                        <span>发送验证码</span>
                    </el-button>
                </el-form-item>
                

                <el-form-item>
                    <el-button type="primary" class="button" @click="submitForm('loginData')">
                        <span>注&nbsp;&nbsp;册</span>
                    </el-button>
                    <!-- <el-button type="primary" :loading="true">加载中</el-button> -->
                </el-form-item>
                <el-form-item>
                    已有帐号？ 
                    <a href="javascript:void(0)" @click="goLogin" style="color:#67c29a;">立即登录</a>
                    <a href="#" style="margin-left:90px">忘记密码</a>

                </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>
<script>

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
            callback(new Error('请输入验证码'));
            } 
            // 验证码验证
            
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
                    { min: 6, max: 18, message: '密码长度须在6-18位区间'}
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' },
                    { min: 6, max: 32, message: '密码长度须在6-32位区间'}
                ],
                qrcode: [
                    { validator: validateQrcode, trigger: 'blur' },
                    { min: 6, max: 6, message: '请输入验证码'}
                ]
            }
        };
    },
    methods: {
        closeWindow() {
            this.$emit("switchLogin")
        },
        goLogin() {
            this.$emit("closeRegOpenLog")
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
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
                background-color: #653a9ec5;

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


}



.el-input {
    input {
        padding: 0 50px;
    }
}

.show {
    display: none;
}

.qrcode {
    width: 138px;
    padding: 0;
    height: 40px;
    vertical-align: -1px;
    background-color: #3eaf99;
    border-color: #3eaf99;
    span {
        color: #fff;
        font-size: 16px;
    }
}

// .el-form-item:nth-child(3) {
//     margin-left: 15px;
// }
</style>
