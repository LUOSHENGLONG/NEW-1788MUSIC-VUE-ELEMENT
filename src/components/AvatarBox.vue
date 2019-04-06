<template>
    <div>
        <form>
            <div class="form-group">
                <!-- <p>
                当前我的头像
                    如果您还没有设置自己的头像，系统会显示为默认头像，您需要自己上传一张新照片来作为自己的个人头像
                    设置我的新头像
                    请选择一个新照片进行上传编辑。
                    头像保存后，您可能需要刷新一下本页面(按F5键)，才能查看最新的头像效果
                </p> -->
                <div class="currentAvatar">
                <div class="uploadAvatar">
                    <label  @click="toggleShow">
                    <i class="el-icon-picture-outline"></i>
                    <i class="el-icon-upload"></i>
                    <span>选择图片</span>
                    </label>
                    <input type="file" class="form-control" id="examplexxxs" name="file" @change="imgSrc" placeholder="Email" accept="image/*">
                </div>
                <div class="showAvatar">
                    <img id="showImg" :src="'http://localhost:3006'+avatar" alt="">
                    <p>当前我的头像</p>
                </div>
                </div>
                <!-- <a class="btn" @click="toggleShow">设置头像</a> -->
                <my-upload field="img" @crop-success="cropSuccess" id="examplexxxs" v-model="show" :width="200" :height="200" img-format="png" :size="size"></my-upload>
            </div>

            <p ref="uploadTips" style="text-align:center;color:#999">
                请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于10M
            </p>

            <div class="mybtn">
                <button type="button" @click="uploadAvatar" :loading='loading' class="btn btn-success">更新</button>
            </div>
        </form>
    </div>
</template>

<script>


import myUpload from 'vue-image-crop-upload';
import jwt_decode from 'jwt-decode'

const imageConversion = require("image-conversion")

export default {
    data() {
        return {
            minHeight: 0,
            avatar: this.$store.state.user.avatar,
            show: false,
            size:2.1,
            formData: {},
            isUpload: false,
            id: "",
            userData: {},
            loading:false,
            oldTime: 0
        }
    },
    methods: {
        imgSrc() {
            this.formData = new FormData();
            const file = this.$("#examplexxxs")[0].files[0]

            // 图片格式、大小验证
            if(file.type.indexOf("image/") === -1 || Math.ceil(parseInt(file.size)/1024) > 2048) {
            this.$refs.uploadTips.style.color = "#a94442"

            setTimeout(() => {
                this.$refs.uploadTips.style.color = "#999"
            }, 2000);
            this.isUpload = false
            return
            }
            
            let finalFile = {}
            imageConversion.compressAccurately(file,100).then(res => {
            // 得到Blob对象
            finalFile = res
            let imgUrl = URL.createObjectURL(finalFile)
            this.$("#showImg").attr("src",imgUrl)
            // 将Blob对象转成base64
            blobToDataURL(finalFile, result => {
                // 将base64转出file
                finalFile = dataURLtoFile(result,"1.png")
                this.formData.append('file',finalFile);
                this.formData.append('id',this.$store.state.user.id);
                this.formData.append('imgUrl',imgUrl);
                this.formData.append('avatar',this.avatar.substring(this.avatar.lastIndexOf("/")));
                this.isUpload = true
            })
            })
            

            function blobToDataURL(blob, callback) {
                let a = new FileReader();
                a.onload = function (e) { callback(e.target.result); }
                a.readAsDataURL(blob);
            }

            function dataURLtoFile(dataurl, filename) {//将base64转换为文件
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type:mime});
            }
      },
        uploadAvatar() {
            let newTime = new Date().getTime()
            if( this.oldTime != 0 ) {
                if( parseInt(newTime) - parseInt(this.oldTime) < 50000 ) {
                    this.$message({
                        type: 'warning',
                        message: '更新操作频繁，请稍后再试。'
                    })
                    console.log(this.oldTime,newTime)
                    return
                }
            } else {
                this.oldTime = newTime
            }

            this.loading = true
            let that = this 
            if( this.isUpload === true ) {
                let userData = this.$store.state.user
                this.$.ajax({
                    url : 'http://localhost:3006/api/avatar/fileUpload',
                    async: true,
                    type : 'POST',
                    data : this.formData,
                    headers: {'Authorization': sessionStorage.token || localStorage.token},
                    processData: false,
                    contentType: false, 
                    success : function(result){
                        const { code, msg, data } = result
                        if( code === 0 ) {
                            this.$notify({
                                type: 'error',
                                title: msg
                            })
                            return
                        }
                        if( code === 1 ) {
                            // sessionStorage.setItem('updateAvatar',msg)
                            // 修改成功 重新获取token
                            const token = data
                            // sessionStorage.setItem('token', token)
                            localStorage.setItem('token', token)

                            const decode = jwt_decode(token)
                            console.log(decode)
                            // 存储数据
                            that.$store.dispatch("setIsAuthenticated", !that.isEmpty(decode))
                            that.$store.dispatch("setUser", decode)
                            // that.$router.go(0)
                            that.$notify({
                                type: 'success',
                                title: msg
                            })
                        }
                        this.loading = false
                        this.formData = {}

                    },
                    error : function(ret){
                        that.$notify({
                            type: 'error',
                            title: '服务器异常，请稍后再试'
                        })
                        this.formData = {}

                        return
                    } 
                })
            } else {
                this.$message.warning('请选择上传图片')
                this.$refs.uploadTips.style.color = "#F56C6C"
                setTimeout(() => {
                    this.$refs.uploadTips.style.color = "#999"
                }, 2000);
            }
        },
        toggleShow() {
            this.show = !this.show;
        },
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        },
        cropSuccess(imgDataUrl) {
            //  imgDataUrl其实就是经过base64转码过的图片
            // this.avatar = imgDataUrl;
            //console.log(imgDataUrl) //这里打印出来的是base64格式的资源，太长了
            //base64转blob格式
            let arr = imgDataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            let blob = new Blob([u8arr], { type: mime })
            // console.log(new Blob([u8arr], { type: mime })) ;//这里打印base64转成blob的资源，根据自己的项目需求去转吧
            this.$("#showImg").attr("src",URL.createObjectURL(blob))

            let finalFile = {}
            
            this.formData = new FormData()

            imageConversion.compressAccurately(blob,100).then(res => {
            // 得到Blob对象
            finalFile = res
            let imgUrl = URL.createObjectURL(finalFile)
            this.$("#showImg").attr("src",imgUrl)
            // 将Blob对象转成base64
            blobToDataURL(finalFile, result => {
                // 将base64转出file
                finalFile = dataURLtoFile(result,"1.png")
                
                this.formData.append('file',finalFile);
                this.formData.append('id',this.$store.state.user.id);
                this.formData.append('imgUrl',imgUrl);
                this.formData.append('avatar',this.avatar.substring(this.avatar.lastIndexOf("/")));
                this.isUpload = true
            })
            })
            

            function blobToDataURL(blob, callback) {
            let a = new FileReader();
            a.onload = function (e) { callback(e.target.result); }
            a.readAsDataURL(blob);
            }

            function dataURLtoFile(dataurl, filename) {//将base64转换为文件
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
      }
    },
    components: {
        "my-upload": myUpload,
    }
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 992px) {
    .currentAvatar {
        margin-bottom: 20px !important;
        height: 180px !important;
        transition: all 0.3s ease;
    }
    .uploadAvatar {
        width: 120px !important;
        height: 120px !important;
        transition: all 0.3s ease;
        label {
            width: 120px !important;
            height: 120px !important;
            transition: all 0.3s ease;
        }
    }
    .showAvatar {
        width: 120px !important;
        height: 120px !important;
        transition: all 0.3s ease;
        img {
            width: 120px !important;
            height: 120px !important;
            transition: all 0.3s ease;
        }
        p {
            left: 18px !important;
            bottom: -40px !important;
            transition: all 0.3s ease;
        
        }
    }
    .el-icon-picture-outline {
        top: 10% !important;
        font-size: 40px !important;
        transition: all 0.3s ease;
    }
    .el-icon-upload {
        top: 50% !important;
        font-size: 20px !important;
        transition: all 0.3s ease;
    }
    span {
        font-size: 14px !important;
        top: 70% !important;
        bottom: 1% !important;
        transition: all 0.3s ease;
    }
    
}
// AVATAR 
.currentAvatar {
    margin-bottom: 50px;
    display: flex;
    flex: 2;
    height: 220px;
    .uploadAvatar {
            flex: 1;
            text-align: right;
            border-right: 1px solid #eee;
            margin: 20px;
        input {
            display: none;
        }
        label:hover {
            cursor: pointer;
        }
        label {
            text-align: center;
            background-color: #f1f2f5;
            border: 1px solid #e5e9ef;
            margin-right: 30px;
            display: inline-block;
            width: 180px;
            height: 180px;
            position: relative;
        .el-icon-picture-outline {
            font-size: 80px;
            position: absolute;
            left: 50%;
            top: 20%;
            transform: translateX(-50%)
        }
        .el-icon-upload {
            font-size: 20px;
            position: absolute;
            left: 50%;
            bottom: 26%;
            transform: translateX(-50%)
        }
        span {
            font-size: 16px;
            position: absolute;
            left: 50%;
            bottom: 10%;
            transform: translateX(-50%)
        }
        }
    }
    .showAvatar {
        position: relative;
        flex: 1;
        margin: 20px;
        margin-left: 10px;
        text-align: left;
        img {
            width: 180px;
            height: 180px;
            border-radius: 50%;
        }
        p {
            position: absolute;
            font-size: 14xp;
            color: rgba(0, 0, 0, 0.719);
            padding-top: 5px;
            left: 50px;
            bottom: -38px;
        
        }
    }
}

.mybtn {
    width: 100%;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 0;
    
    button {
        width: 150px;
        height: 40px;
        border-radius: 20px;
        border: 0;
        background-color: #409EFF;
        color: #fff;
        cursor: pointer;
    }
}
</style>
