<template>
    <div class="home">
        <nav-header></nav-header>
        <div class="content">
            <swiper :height='height'></swiper>
            <type-box :isShow=isShow :data=homeData[9] :type="'last'">
                <span style="font-size:26px;line-height:0;">最新</span>
            </type-box>
            <type-box :isShow=isShow :data=homeData[0] :type="'synthesizer'">
                <span style="font-size:26px;line-height:0;">合成器</span>
            </type-box>
            <type-box :isShow=isShow :data=homeData[1] :type="'effects'">
                <span style="font-size:26px;line-height:0;">效果器</span>
            </type-box>
            <type-box :isShow=isShow :data=homeData[2] :type="'samplePack'">
                <span style="font-size:26px;line-height:0;">采样包</span>
            </type-box>
            <type-box :isShow=isShow :data=homeData[3] :type="'tutorial'">
                <span style="font-size:26px;line-height:0;">教程</span>
            </type-box>
            <type-box :isShow=isShow :data=homeData[4] :type="'host'">
                <span style="font-size:26px;line-height:0;">宿主</span>
            </type-box>
            <type-box :isShow=isShow :data=homeData[5] :type="'project'">
                <span style="font-size:26px;line-height:0;">工程</span>
            </type-box>
            <type-box :isShow=isShow :data=homeData[6] :type="'kontakt'">
                <span style="font-size:26px;line-height:0;">Kontakt</span>
            </type-box>
            <type-box :isShow=isShow :data=homeData[7] :type="'preset'">
                <span style="font-size:26px;line-height:0;">预置</span>
            </type-box>
            <type-box :isShow=isShow :data=homeData[8] :type="'midi'">
                <span style="font-size:26px;line-height:0;">MIDI</span>
            </type-box>
            
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
            isShow: false
        }
    },
    mounted() {
        
        this.getHomeData()
    },
    methods: {
        getHomeData() {
            this.$axios.post('/api/home/homeData')
            .then( result => {
                
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
.content {
    padding: 0 10%;
    min-width: 992px;
}
</style>
