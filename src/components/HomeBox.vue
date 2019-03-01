<template>
    <div v-if="isShow">
        <div class="box">
            <div class="title">
            
                <p class="title-type">
                    <slot></slot>
                </p>
                <a href="#" @click="more($event)" class="more" target="_blank">
                    &nbsp;&nbsp;更多文章 &gt;
                </a>
            </div>
            <div class="content">
                <router-link to="">
                    <el-col  v-for="item in 1" :key="item.id" class="card-col">
                    <el-card :body-style="{ padding: '0px' }">
                    <div class="image-wrap"> 
                        <img src="@/assets/images/logo.png" class="image">
                        <div class="gradient"></div>
                        <span class="time">2018-08-12</span>
                    </div>
                    <div style="" class="content">
                        <h3 class="title-content">{{ item.title }}</h3>
                        <div class="bottom clearfix">
                            <p class="description">
                                {{ item.content }}
                            </p>
                        </div>
                    </div>
                    <div class="text-gradient"></div>
                    </el-card>
                </el-col>
            </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isShow: Boolean
    }
}
</script>