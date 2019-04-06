<template>
    <div class="home">
        <nav-header></nav-header>
        <div class="content">
            <swiper :height='height' :swiperData=swiperData :isShow=swiperIsShow class="hidden-xs-only"></swiper>
            <swiper :height='"250px"' :swiperData=swiperData :isShow=swiperIsShow class="hidden-sm-and-up"></swiper>
            <div v-if="loading">
                <type-box :isShow=isShow :data=homeData[9] :type="'last'">
                <span style="font-size:20px;line-height:0;">最新</span>
                </type-box>
                <!-- <div class="ad">
                    <div class="left">
                        <img src="@/assets/images/sb.png" alt="">
                    </div>
                    <div class="right">
                        <img src="@/assets/images/sb.png" alt="">
                    </div>
                </div> -->
                <type-box :isShow=isShow :data=homeData[0] :type="'synthesizer'">
                    <span style="font-size:20px;line-height:0;">合成器</span>
                </type-box>
                <type-box :isShow=isShow :data=homeData[1] :type="'effects'">
                    <span style="font-size:20px;line-height:0;">效果器</span>
                </type-box>
                <type-box :isShow=isShow :data=homeData[2] :type="'samplePack'">
                    <span style="font-size:20px;line-height:0;">采样包</span>
                </type-box>
                <type-box :isShow=isShow :data=homeData[3] :type="'tutorial'">
                    <span style="font-size:20px;line-height:0;">教程</span>
                </type-box>
                <type-box :isShow=isShow :data=homeData[4] :type="'host'">
                    <span style="font-size:20px;line-height:0;">宿主</span>
                </type-box>
                <type-box :isShow=isShow :data=homeData[5] :type="'project'">
                    <span style="font-size:20px;line-height:0;">工程</span>
                </type-box>
                <type-box :isShow=isShow :data=homeData[6] :type="'kontakt'">
                    <span style="font-size:20px;line-height:0;">Kontakt</span>
                </type-box>
                <type-box :isShow=isShow :data=homeData[7] :type="'preset'">
                    <span style="font-size:20px;line-height:0;">预置</span>
                </type-box>
                <type-box :isShow=isShow :data=homeData[8] :type="'midi'">
                    <span style="font-size:20px;line-height:0;">MIDI</span>
                </type-box>
            </div>
            <div v-if="!loading" style="text-align: center;margin: 100px;">
                <img src="@/assets/images/lazy8.gif" style="height:208px;width:208px;" alt="">
            </div>
        </div>
        <nav-bottom></nav-bottom>
        <to-top-box></to-top-box>
    </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import Swiper from '@/components/Swiper'
import TypeBox from '@/components/TypeBox'
import NavBottom from '@/components/NavBottom'
import Register from '@/components/Register'
import ToTopBox from '@/components/ToTopBox'

export default {
    components: {
        NavHeader,
        Swiper,
        NavBottom,
        TypeBox,
        ToTopBox,
        Register,
    },
    data() {
        return {
            height: '450px',
            dialogFormVisible: false,
            homeData: [],
            isShow: false,
            swiperData: [],
            swiperIsShow: false,
            loading: false
        }
    },
    mounted() {
        this.getHomeData()
        this.getSwiperData()
    },
    methods: {
        getHomeData() {
            this.loading = false
            this.$axios.post('/api/home/homeData')
            .then( result => {
                this.loading = true
                // 'synthesizer','effects','samplePack','tutorial','host','project','kontakt','preset','midi','%%'
                
                const { code, msg, data} = result.data
                
                if ( code === 0 ) {
                    this.$message.error(msg)
                    return
                }
                // 处理 Img 路径 start
                let test = /(\")|(\])|(\[)/

                String.prototype.replaceAll = function(s1,s2){ 
                    return this.replace(new RegExp(s1,"gm"),s2); 
                }

                data.forEach( origin => {
                    origin.forEach (item => {
                        item.img = item.img + ""
                        item.img = item.img.replaceAll(test,"")
                        let img = []
                        if(item.img.indexOf(",") > -1) {
                        item.img.split(",").forEach( item2 => {
                            img.push("" + item2)
                        })
                        }else {
                        img.push("" + item.img)
                        }
                        item.img = img[0]
                    })
                })
                
                this.homeData = data
                this.isShow = true
                

                // console.log(this.homeData)
                // console.log(this.isShow)
            })
        },
        getSwiperData() {
            this.swiperIsShow = false
            this.$axios.post('/api/home/getSwiper')
                .then(result => {
                    const { code , msg, data } = result.data
                    // console.log(data)
                    if( code === 0 ) {
                        this.$message.error(msg)
                        return
                    }
                    if( code === 1 ) {
                        this.swiperData = data
                        this.swiperIsShow = true
                    }
                })
        }
        
        
    }
}
</script>
<style scoped>
@media screen and (min-width: 2800px) and (max-width: 3440px) {
    .content {
        padding: 0 20% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 2550px) and (max-width: 2800px) {
    .content {
        padding: 0 15% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 2250px) and (max-width: 2550px) {
    .content {
        padding: 0 10% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (min-width: 1500px) and (max-width: 2250px) {
    .content {
        padding: 0 6% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1500px) and  (min-width: 1200px) {
   .content {
        padding: 0 5% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1500px) and  (min-width: 1200px) {
   .content {
        padding: 0 5% !important;
        transition: all 0.3s ease;
    }
    
}

@media screen and (max-width: 1200px) and  (min-width: 992px) {
   .content {
        padding: 0 3% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (max-width: 992px) {
   .content {
        padding: 0 2% !important;
        transition: all 0.3s ease;
    }
    
}
@media screen and (max-width: 992px) and (min-width: 400px) {
  /* .content {
    width: 10% !important;
    margin: 0;
  } */
  
}

.content {
    padding: 0 10%;
    /* min-width: 992px; */
}
.ad {
    width: 100%;
    height: 120px;
    
}
.ad .left {
    float: left;
    width: 49.5%;
    height: 120px;
    overflow: hidden;
    border-radius: 4px;
}
.ad .right {
    float: right;
    width: 49.5%;
    height: 120px;
    overflow: hidden;
    border-radius: 4px;
}
.ad .left img, .ad .right img {
    height: 100%;
    width: 100%;
} 
</style>
