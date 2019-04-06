<template>
    <div class="contribution">
        <nav-header></nav-header>
        <div class="content">
            <img src="@/assets/svg/fail.svg" alt="">
            <p>抱歉，服务器异常，投稿失败 ！</p>
            <div>
                <button @click="contribution">继续投稿</button>
                <button>查看我的投稿</button>
            </div>
        </div>
        <nav-bottom></nav-bottom>
        <to-top-box></to-top-box>
    </div>
</template>

<script>

import NavHeader from '@/components/NavHeader'
import NavBottom from '@/components/NavBottom'
import BreakBox from '@/components/BreakBox'
import ToTopBox from '@/components/ToTopBox'
const imageConversion = require("image-conversion");


export default {
    components: {
        NavHeader,
        NavBottom,
        BreakBox, 
        ToTopBox, 
    },
    mounted() {
        window.scrollTo(0,0)
    },
    methods: {
        contribution() {
            this.$router.push({ path: '/contribution'})
        }
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

@media screen and (max-width: 1200px) {
   .content,.swiper-div {
        padding: 0 1% !important;
        transition: all 0.3s ease;
    }
    
}
.contributionForm {
    padding: 2% 10%;
    border: 1px solid #eee;
}
.content {
    text-align: center;
    img {
        width: 40%;
    }
    p {
        font-size: 24px;
        color: #409eff;
    }
    button {
        border: 0;
        background-color: #409eff;
        color: #fff;
        padding: 15px 30px;
        border-radius: 4px;
        margin: 50px 10px;
        font-size: 16px;
        cursor: pointer;

    }
    button:first-child {
        background-color: #fdfdfd;
        color: #555;
        border: 1px solid #eee;
    }
}
</style>
