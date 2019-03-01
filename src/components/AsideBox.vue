<template>
    <div class="aside-box">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="一致性 Consistency" name="1" style="font-size: 20px;" class="">
                <ul class="row">
                    <li class="row-li">
                        <a href="#" class="row-a">
                            <p class="row-a-b" ref="p">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                        </a>
                    </li>
                    <li class="row-li">
                        <a href="#" class="row-a">
                            <p class="row-a-b">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                        </a>
                    </li>
                    <li class="row-li">
                        <a href="#" class="row-a">
                            <p class="row-a-b">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                        </a>
                    </li>
                    <li class="row-li">
                        <a href="#" class="row-a">
                            <p class="row-a-b">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                        </a>
                    </li>
                </ul>
                
            </el-collapse-item>
            
            <el-collapse-item title="反馈 Feedback" name="2">
                
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import Swiper from '@/components/Swiper'
  export default {
    data() {
        return {
            activeNames: ['1','2','3']
        };
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        scrollTitle() {
            let width = this.$(this.$refs.p).width()
            width = width - 290
            console.log(width)
            this.$(this.$refs.p).animate({left: -width + 'px'},3000)
        },
        initTitle() {
            this.$(this.$refs.p).animate({left: '0px'},500)
        }
    },
    components: {
        Swiper,
    },
  }
</script>

<style lang="scss" scoped>
.aside-box {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10% 6%;
    margin-top: 22px;
    margin-bottom: 20px;
}

.el-collapse-item {
    font-size: 16px;
    .el-collapse-item__header {
        font-size: 16px !important;
    }
}

.row {
    padding: 0;
    font-size: 16px;
    li {
        position: relative;
        height: 42px;
        border-radius: 4px;
        margin: 8px 0;
        overflow: hidden;
        .row-a {
            display: inline-block;
            height: 42px;
            color: #444;
            .row-a-b {
                position: absolute;
                left: 0;
                margin: 0;
                line-height: 20px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
        
    }
    li:hover {
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.054);
        .row-a {
            color: #7645b8;
        }
    }
}

.el-collapse-item__wrap {
    // display: none;
    height: 1px;
}


</style>
