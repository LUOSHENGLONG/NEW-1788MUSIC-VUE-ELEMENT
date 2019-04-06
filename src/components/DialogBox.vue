<template>
    <el-dialog
        :title="title"
        :visible.sync="emailDialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>验证密保</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="switchEmail()">取 消</el-button>
            <el-button type="primary" @click="switchEmail()">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        emailDialogVisible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        switchEmail() {
            console.log(11)
            this.$emit('switchEmail')
        }
    }
}
</script>