<template>
    <div class="user-info-box">
        
        <div class="box-card">
            <div class="clearfix header">
                <h3>用户名</h3>
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
                        <p style="margin: 17px 0;">未设置</p>
                        <div>
                            <el-button style="padding:0;" type="text">
                                <span style="color:#409EFF">设置</span>
                            </el-button>
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
                <h3>
                    注册时间
                    
                </h3>
                
            </div>
            <div class="line"></div>

            <div class="content">
                
                <div class="description">
                    <div class="description">
                        <div  class="description-content">
                            <p style="margin: 17px 0;">{{user.createTime}}</p>
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

export default {
    
    data() {
        return {
            labelPosition: 'left',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            user: this.$store.state.user,
            userInfo: {
                nickname: '',
                avatar: '',

            },
            showNickNameInput: false

        }
    },
    methods: {
        showNickName() {
            this.showNickNameInput = true
        },
        closeNickName() {
            this.showNickNameInput = false
        },
        submitNickname() {
            let nickname = this.userInfo.nickname

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

                    const decode = jwt_decode(token)
                    console.log(decode)
                    // 存储数据
                    this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode))
                    this.$store.dispatch("setUser", decode)
                    this.$router.go(0)
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
    }
}
</script>

<style lang="scss" scoped>
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
        color: #444;
        overflow: hidden;
        display: -webkit-box;
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
