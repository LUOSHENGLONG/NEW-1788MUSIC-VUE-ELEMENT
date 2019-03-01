<template>
    <!-- 导航栏 -->
                <ol class="breadcrumb" style="background-color: #fdfdfd;" v-if="isOk">
                    <li>
                        <router-link to="/">
                            <span class="fa fa-home"></span>&nbsp;首页
                        </router-link>
                        <i class="el-icon-arrow-right"></i>
                    </li>
                    <li>
                        <slot name="type"></slot>
                    </li>
                    <li class="active">
                        <slot name="articleTitle">
                        </slot>
                    </li>
                </ol>
</template>
<script>
export default {
    props: {
        infoData: Object,
        isOk: Boolean,
        articleType: String
    }
}
</script>
<style lang="scss" scoped>
.breadcrumb {
    padding-left: 15px;
    white-space: nowrap;
    overflow: hidden;
    margin: 0;
    border: 1px solid #eee;
    background-color: #fff !important;
    border-bottom: 0;
    border-radius: 4px;
    position: relative;
    height: 60px;
    line-height: 60px;
    li{
        font-size: 20px;
        line-height: 42px;
        display: inline-block;
        a {
            color: #409EFF;
        }
    }
}
</style>
