<template>
  <el-carousel :interval="5000" arrow="always" :height="height" v-if="isShow">
    <el-carousel-item v-for="item in swiperData" :key="item.id">
      <!-- <img :src="'http://127.0.0.1:3006'+item.img" alt="" class="swiperImg"> -->
      <div class="bgImg">
        <img class="bottomImg" :src="'http://127.0.0.1:3006'+item.img" alt="">
        <img class="topImg" :src="'http://127.0.0.1:3006'+item.img" alt="">
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
    props: {
        height:String,
        swiperData: Array,
        isShow: Boolean
    }
}
</script>
<style lang="scss">
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.swiperImg {
    border-radius: 4px;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
}
.bgImg {
    .bottomImg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 997;
        width: 100%;
        height: 100%;
        filter: blur(20px);
    }
    .topImg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 999;
        border-radius: 4px;
    }
}
.el-carousel{
    border-radius: 4px;

}
</style>