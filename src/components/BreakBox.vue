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

@media screen and (max-width: 992px){
   
    .breadcrumb {
        height: 40px !important;
        line-height: 40px !important;
        li{
            font-size: 16px !important;
        }
    }
}
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
            background-image: -webkit-gradient(linear, left 0, right 0, from(rgba(107, 17, 203, 0.714)), to(rgb(65, 88, 208)));
            -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
            -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
        }
    }
}
</style>
