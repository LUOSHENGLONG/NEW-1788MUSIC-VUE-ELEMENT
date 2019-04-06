<template>
    <div class="contribution">
        <nav-header :activeIndex=activeIndex></nav-header>
        <div class="content">
            <break-box :isOk=isOk>
                <slot slot="type">
                    <span style="font-size:18px">投稿页</span>
                </slot>
            </break-box>
            <div class="contributionForm">
                <div class="top">
                    <i class="el-icon-edit-outline">
                    <span>投稿中心</span>
                </i>
                </div>
                <el-form :model="contribution" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="文章类型" prop="type">
                        <el-radio-group v-model="contribution.type">
                        <el-radio label="synthesizer">合成器</el-radio>
                        <el-radio label="effects">效果器</el-radio>
                        <el-radio label="samplePack">采样包</el-radio>
                        <el-radio label="host">宿主</el-radio>
                        <el-radio label="tutorial">教程</el-radio>
                        <el-radio label="kontakt">Kontakt</el-radio>
                        <el-radio label="project">工程</el-radio>
                        <el-radio label="preset">预置</el-radio>
                        <el-radio label="midi">MIDI</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="文章标题" prop="title">
                        <el-input v-model="contribution.title" placeholder="填写文章标题 如 Echo Sound Works Xhere for XFER RECORDS SERUM 音色包"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="文章内容" prop="content">
                        <el-input type="textarea" v-model="contribution.content" placeholder="填写文章内容"></el-input>
                    </el-form-item>

                    <el-form-item label="文章描述" prop="description">
                        <el-input type="textarea" v-model="contribution.description" placeholder="选填 音色包如下
023 x (Leads) 音色
022 x (Basses) 音色
022 x (Plucks) 音色
"></el-input>
                    </el-form-item>

                    <el-form-item label="下载链接" prop="downloadLink">
                        <el-input v-model="contribution.downloadLink" placeholder="如有提供资源下载请填写百度云链接"></el-input>
                    </el-form-item>

                    <el-form-item label="下载提取码" prop="downloadTqm">
                        <el-input v-model="contribution.downloadTqm" placeholder="如提供资源需提取码请填写"></el-input>
                    </el-form-item>

                    <el-form-item label="资源大小" prop="downloadSize">
                        <el-input v-model="contribution.downloadSize" placeholder="如提供资源请填写资源大小 如：3.2GB / 201MB / 565KB 如未知大小无需填写"></el-input>
                    </el-form-item>

                    <el-form-item label="解压密码" prop="downloadPassword">
                        <el-input v-model="contribution.downloadPassword" placeholder="如资源需解压密码请填写"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="文章图片" prop="img">
                        <div>
                            <el-upload
                                action="http://127.0.0.1:3006/api/contribution/upload"
                                list-type="picture-card"
                                ref="upload"
                                :limit=5
                                :multiple=true
                                :on-preview="handlePictureCardPreview"
                                :on-success="handleSuccess"
                                :before-upload="beforeUpload"
                                :on-exceed="overLimit"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </el-form-item>

                    <el-form-item label="文章视频链接" prop="videoLink">
                        <el-input placeholder="如文章需要插入视频请上传到B站后复制视频链接" v-model="contribution.videoLink"></el-input>
                    </el-form-item>
                    <div class="copyright">
                        * 用户投稿须原创,或经授权拥有版权，如有侵权行为,将立即删除侵权内容并做出相应侵权机制措施。 
                        <router-link to="/sundry/copyright" class="">版权中心</router-link>
                    </div>
                    <el-form-item style="text-align:center;margin-top:60px;">
                        <el-button @click="resetForm('ruleForm')"><span>重置</span></el-button>
                        
                        <el-button type="primary" @click="submitForm('ruleForm')"><span style="color:#fff">提交投稿</span></el-button>

                        <el-button type="danger" @click="preview('ruleForm')"><span style="color:#fff;">预览投稿</span></el-button>
                    </el-form-item>
                </el-form>

                
            </div>
        </div>
        <preview :infoData=contribution @closePreview=closePreview :isShow=previewIsShow></preview>

        <nav-bottom></nav-bottom>
        <to-top-box></to-top-box>
    </div>
</template>

<script>

import NavHeader from '@/components/NavHeader'
import NavBottom from '@/components/NavBottom'
import BreakBox from '@/components/BreakBox'
import ToTopBox from '@/components/ToTopBox'
import Preview from '@/components/Preview'
const imageConversion = require("image-conversion");


export default {
    components: {
        NavHeader,
        NavBottom,
        BreakBox, 
        ToTopBox, 
        Preview
    },
    mounted() {
        window.scrollTo(0,0)
        this.$(Array.prototype.slice.call(this.$('textarea'))[0]).css('height','200px')
        this.$(Array.prototype.slice.call(this.$('textarea'))[1]).css('height','100px')
    },
    data() {
        return {
            isOk: true,
            previewIsShow:false,
            contribution: {
                title: '',
                type: '',
                content: '',
                description: '',
                downloadLink: '',
                downloadTqm: '',
                downloadSize: '',
                downloadPassword: '',
                img: [],
                videoLink: '',
                nickname: this.$store.state.user.nickname,
            },
            rules: {
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 6, max: 200, message: '长度在 6 到 200 个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择文章类型', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请填写文章内容', trigger: 'blur' }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            formData: new FormData(),
            activeIndex: '6'
        }
    },
    methods: {
        overLimit() {
            this.$message.warning('上传图片数量不超过5张')
        },
        preview(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    window.scrollTo(0,0)
                    this.previewIsShow = true
                    console.log(this.contribution.img)
                } else {
                    this.$message.warning('请完整填写表单必填项后预览')
                    return false;
                }
            })
            
            
        },
        closePreview() {
            this.previewIsShow = false
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // 验证通过
                console.log(this.contribution)

                this.fileList.forEach((item, index) => {
                    this.formData.append('file',item);
                })

                this.formData.append("title",this.contribution.title)
                this.formData.append("type",this.contribution.type)
                this.formData.append("content",this.contribution.content)
                this.formData.append("description",this.contribution.description)
                this.formData.append("videoLink",this.contribution.videoLink)
                this.formData.append("downloadLink",this.contribution.downloadLink)
                this.formData.append("size",this.contribution.size)
                this.formData.append("downloadPassword",this.contribution.downloadTqm)
                this.formData.append("downloadUnzip",this.contribution.downloadPassword)
                this.formData.append("contributeTime",new Date().getTime())
                this.formData.append("userId", this.$store.state.user.id)
                
                console.log('===========')
                console.log(this.formData)
                let that = this
                this.$.ajax({
                    url: "http://localhost:3006/api/contribution/submit",
                    type: "POST",
                    data: this.formData,
                    headers: {'Authorization': localStorage.token},
                    processData: false,
                    contentType: false,
                    success: function(result) {
                        const { code, msg, data } = result
                        console.log(code, msg ,data)
                        if( code === 0) {
                            that.$message.error(msg)
                            that.$router.push({path: '/contribution/fail'})
                            that.formData = new FormData()
                            return
                        }
                        if( code === 1 ) {
                            that.$notify({
                                type: 'success',
                                title: msg
                            })
                            that.formData = new FormData()
                            that.$router.push({path: '/contribution/success'})
                            return
                        }
                        // 投稿成功
                        // that.$router.push({path: '/success'})
                    },
                    error: err => {
                        if( err.status == 401 ) {
                            that.formData = new FormData()
                            this.$store.dispatch('clearCurrentState')
                            if( sessionStorage.token ) {
                                sessionStorage.removeItem('token')
                            }
                            if( localStorage.token ) {
                                localStorage.removeItem('token')
                            }
                            this.$notify.error('登录失效，请重新登录')
                        }
                        that.formData = new FormData()
                        that.$router.push({path: '/contribution/fail'})
                        return
                        // 投稿失败
                        // that.$router.push({path: '/fail'})
                    }
                });
                
                

            } else {
                this.$message.warning('请完整填写表单必填项')
                return false;
            }
            });
        },
        resetForm(formName) {
            window.scrollTo(0,0)
            this.$refs[formName].resetFields();
            this.$refs.upload.clearFiles();
        },
        handleRemove(file, fileList) {
            console.log('file==============');
            console.log(file);
            // 删除已上传图片 遍历fileList删除对应file
            this.fileList.forEach((item, index) => {
                if(item.uid == file.uid ) {
                    console.log(item.uid,file.uid)
                    this.fileList.splice(index, 1)
                    return
                }
            })
            // 
            this.contribution.img.forEach((url, index) => {
                if(url == file.url) {
                    this.contribution.img.splice(index, 1)
                }
            })
        },
        handleSuccess(response,file, fileList) {
            // 上传成功添加到fileList
            console.log(222222222222222)
            console.log(response)
            console.log(file)
            this.contribution.img.push(file.url)
            console.log(fileList)
            console.log('fileList.raw')
            console.log(file.raw)

            imageConversion.compressAccurately(file.raw, 50).then(res => {
                // 得到Blob对象
                let finalFile = res;
                console.log(finalFile)
                // 将Blob对象转成base64
                blobToDataURL(finalFile, result => {
                    // 将base64转出file
                    finalFile = dataURLtoFile(result, new Date().getTime()+".png");
                    // 加uid属性 删除时用到
                    finalFile.uid = file.raw.uid
                    this.fileList.push(finalFile);
                    console.log(this.fileList)
                });
            });

            // blob转base64
            function blobToDataURL(blob, callback) {
                let a = new FileReader();
                a.onload = function(e) {
                    callback(e.target.result);
                };
                a.readAsDataURL(blob);
            }

            // 将base64转换为文件
            function dataURLtoFile(dataurl, filename) {
                var arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: mime });
            }

            console.log(this.fileList);
        },
        beforeUpload(file) {
            // 图片文件 图片尺寸不能大于1MB 
            if( file.type.indexOf("image/") === -1 || Math.ceil(parseInt(file.size) / 1024 / 1024 ) > 1 ) {
                this.$message.warning('请选择图片格式文件上传且投稿文章图片每张不能大于1MB')
                return false
            }
            
        },

        handlePictureCardPreview(file) {
            console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    
    },
    watch: {
        
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
    
}

@media screen and (max-width: 1200px) and  (min-width: 992px) {
   .content,.swiper-div {
        padding: 0 1% !important;
        transition: all 0.3s ease;
    }
    
}


@media screen and (max-width: 992px) {
   .content,.swiper-div {
        padding: 0 1% !important;
        transition: all 0.3s ease;
    }
    .contributionForm {
        padding: 2% !important;
        padding-right: 4% !important;
    }
    
}
.contributionForm {
    padding: 2% 10%;
    border: 1px solid #eee;
}

span, label {
    font-size: 16px;
}
button {
    margin-bottom: 15px;
}
.top {
    text-align: center;
    margin-bottom: 20px;
    i {
        font-size: 36px;
        color: #409EFF;
    }
    span {
        font-size: 22px;
        color: #666;
        vertical-align: 5px;
        margin-left: 10px;
    }
}
.copyright {
    margin-top: 40px;
    text-align: center;
    color: #666;
    a {
        color: #409EFF;
    }
}
</style>
