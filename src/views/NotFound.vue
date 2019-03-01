<template>
    <div class="notFound">
        <img src="@/assets/images/404.jpg" alt="">
        <div>
            <el-button type="primary" round class="btn" @click="goHome">
                <span>回到首页</span>
            </el-button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        goHome() {
            this.$router.push({path: '/'})
        }
    }
}
</script>
<style lang="scss" scoped>
.notFound {
    width: 100%;
    height: 100%;
    text-align: center;
    img {
        height: 100%;
        
    }
}
.btn {
    width: 200px;
    height: 70px;
    border-radius: 8px;
    span {
        color: #fff;
        font-size: 22px;
    }
}
</style>
