<template>
    <div class="nav-bottom">
        <div id="news" class="">
            <div class="favicon">
                <img src="@/assets/images/favicon.png" alt="">
            </div>
            <div class="inner">
            <h3><label for="member_email">订阅我们的月刊 (中文)</label></h3>
            <form class="newsletter-form">
                <input class="newsletter-input"  type="email"  id="member_email"  placeholder="邮件地址">
                <input class="button newsletter-button"  type="button" value="订阅"  id="member_submit">
                
            </form>
            <p ref="emailTips" class="emailTips">
                你可以在 <a href="#" target="_blank">网易云</a> 翻阅往期的 issue，也可以收听 podcast。
            </p>
            </div>
            <div class="showcase-examples l-center l-longshadows ">
            <button @click="showWechat()" class="button button-action button-box button-giant button-longshadow-left">
                <img src="@/assets/svg/wechat.svg" alt="" class="svg">
            </button>

            <button @click="goWeibo" class="button button-caution button-box button-raised button-giant button-longshadow">
                <img src="@/assets/svg/weibo.svg" alt="" class="svg">
            </button>

            <button @click="goQq" class="button button-primary button-box button-giant button-longshadow-left">
                <img src="@/assets/svg/qq.svg" alt="" class="svg">
            </button>

            <button @click="goYoutube" class="button button-caution button-box button-giant button-longshadow-right button-longshadow-expand">
                <img src="@/assets/svg/youtube.svg" alt="" class="svg">
            </button>
            
            <button @click="goIns" class="ins button button-royal button-box button-giant button-longshadow-left">
                <img src="@/assets/svg/ins.svg" alt="" class="svg">
            </button>
            <button @click="goBilibili" class="button button-primary button-box button-giant button-longshadow-left">
                <img src="@/assets/svg/bilibili.svg" alt="" class="svg bilibili">
            </button>
            </div>

            
        </div>

        <div class="footer-top">
            <div class="left-div">
                <img class="logo" src="@/assets/images/logo.png">
                <p>我们一直致力于为广大音乐制作人提供更多的优质资源！</p>
            </div>
            <div class="right-div"  style="text-align: center;">
                <div class="about" style="text-align: center">
                    <div class="">
                    <h4>关于</h4>
                    <ul class="list-unstyled">
                        <li><router-link target="_blank" to="/aboutMe">关于我们</router-link></li>
                        <li><router-link target="_blank" to="/copyright">版权中心</router-link></li>
                        <!-- <li><a href="/links/">友情链接</a></li> -->
                        <!-- <li><a href="/hr/">招聘</a></li> -->
                    </ul>
                    </div>
                    <div class="">
                    <h4>订阅我们</h4>
                    <ul class="list-unstyled">
                        <li><a target="_blank" href="https://weibo.com/u/6725785449/home">微博</a></li>
                        <li><router-link to="/help">公众号</router-link></li>
                        <li><a target="_blank" href="http://space.bilibili.com/380735644?">哔哩哔哩</a></li>
                        <li><a target="_blank" href="https://www.youtube.com/channel/UC-zwZZMXX34hGRanbZ6rMDg">Youtube</a></li>
                        <li><a target="_blank" href="https://www.instagram.com/1788music">Instagram</a></li>
                    </ul>
                    </div>
                    <div class="">
                    <h4>联系方式</h4>
                    <ul class="list-unstyled">
                        <li><a href="JavaScript: void(0)" @click="showWechat()" target="_blank">微信公众号</a></li>
                        <!-- <li><a href="#" target="_blank">电话号码</a></li> -->
                        <li><a href="https://weibo.com/u/6725785449" target="_blank">新浪微博</a></li>
                        <li><router-link to="/help">电子邮件</router-link></li>
                    </ul>
                    </div>
                    <div class="">
                    <h4>快捷导航</h4>
                    <ul class="list-unstyled">
                        <li><router-link to="/" target="_blank">首页</router-link></li>
                        <li><router-link to="/synthesizer" target="_blank">合成器</router-link></li>
                        <li><router-link to="/effects" target="_blank">效果器</router-link></li>
                        <li><router-link to="/samplePack" target="_blank">采样包</router-link></li>
                        <li><router-link to="/contribute" target="_blank">投稿</router-link></li>
                    </ul>
                    </div>
                    <div class="">
                    <h4>赞助</h4>
                    <ul class="list-unstyled">
                        <li><router-link to="/sponsor" target="_blank">微信</router-link></li>
                        <li><router-link to="/sponsor" target="_blank">支付宝</router-link></li>
                    </ul>
                    </div>
                    <div class="">
                    <h4>帮助</h4>
                    <ul class="list-unstyled">
                        <li><router-link to="/feedback" target="_blank">寻求帮助</router-link></li>
                        <li><router-link to="/sponsor" target="_blank">发送反馈</router-link></li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <ul class="list-inline text-center">
                <li>
                    <a href="#" target="_blank">1788 MUSIC &nbsp;&nbsp;&nbsp;&nbsp;</a>
                </li>
                <li>Copyright © 2018-2019 1788MUSIC</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        goWeibo() {
            window.open("https://weibo.com/u/6725785449")
        },
        goQq() {
            window.open("http://wpa.qq.com/msgrd?v=3&uin=2085203270&site=qq&menu=yes")
        },
        goYoutube() {
            window.open("https://www.youtube.com/channel/UC-zwZZMXX34hGRanbZ6rMDg")
        },
        goTwitter() {
            window.open("http://wpa.qq.com/msgrd?v=3&uin=2085203270&site=qq&menu=yes")
        },
        goFacebook() {
            window.open("http://wpa.qq.com/msgrd?v=3&uin=2085203270&site=qq&menu=yes")
        },
        goIns() {
            window.open("https://www.instagram.com/1788music/")
        },
        goBilibili() {
            window.open("http://space.bilibili.com/380735644")
        },
        
    }
}
</script>

<style lang="scss" scoped>

// @media screen and (max-width: 1300px) and (min-width: 1100px){
//     .footer-top {
//         padding: 0 5% !important;
//     }
// }

// @media screen and (max-width: 1100px) {
//     .footer-top {
//         padding: 0 1% !important;
//     }
// }


@media screen and (min-width: 2800px) and (max-width: 3440px) {
    .footer-top {
        padding: 0 20% !important;
        transition: all 0.3s ease;
    }
}

@media screen and (min-width: 2550px) and (max-width: 2800px) {
    .footer-top {
        padding: 0 15% !important;
        transition: all 0.3s ease;
    }
}

@media screen and (min-width: 2250px) and (max-width: 2550px) {
   .footer-top {
        padding: 0 10% !important;
        transition: all 0.3s ease;
    }
}

@media screen and (min-width: 1500px) and (max-width: 2250px) {
   .footer-top {
        padding: 0 6% !important;
        transition: all 0.3s ease;
    }
}

@media screen and (max-width: 1500px) and  (min-width: 1200px) {
   .footer-top {
        padding: 0 5% !important;
        transition: all 0.3s ease;
    }
}
@media screen and (max-width: 1200px) {
   .footer-top {
        padding: 0 1% !important;
        transition: all 0.3s ease;
    }
    
}
.nav-bottom {
    margin-top: 80px;
    min-width: 992px;
    border-top: 1px solid #ebeef5;
    padding-top: 40px;
}

#news {
  position: relative;
  padding: 2px 20px 70px;
  text-align: center;
}
#news .newsletter-form {
    position: relative;
    max-width: 550px;
    margin: 0 auto;
    box-sizing: border-box;
}
#news .newsletter-input {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 80px 10px 20px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #ccc;
    font-size: 16px;
}
#news .newsletter-button.button {
    border: 0;
    border-radius: 50px;
    position: absolute;
    padding: 0 26px;
    background-color: #4fc08d;
    color: #fff;
    margin: 0;
    height: calc(100% - 8px);
    right: 4px;
    top: 4px;
    cursor: pointer;
}

.favicon {
  height: 160px;
  background-repeat: no-repeat;
  background-size: 10%;
  background-position-x: 50%;
  img {
      height: 100%;
  }
}

.button-giant {
    font-size: 28px;
    height: 70px;
    width: 70px;
    line-height: 70px;
    border: 0;
    margin: 5px 3px;
    border-radius: 4px;
    background-color: #fff !important;
    cursor: pointer;
}
.svg {
    width: 100%;
    height: 100%;
}
.bilibili {
    width: 80px;
    height: 80px;
    vertical-align: -3px;
}
.footer-bottom {
  padding: 10px;
  padding-bottom: 0;
  border-top: 1px solid #eee;
  text-align: center;
  margin-bottom: 10px;
  ul {
      li {
          display: inline-block;;
      }
  }
}

.footer-top {
    display: flex;
    margin-bottom: 40px;
    padding: 0 10%;
    .left-div {
        flex: 3;
    }
    .right-div {
        flex: 3;
        .about {
            display: flex;
            div {
                flex: 1;
                h4 {
                    margin: 0;
                    margin-bottom: 5px;
                    font-size: 18px;              
                    font-weight: 600;
                    color: #2c3e50;
                }
                ul {
                    padding: 0;
                    li {
                        a {
                            color: #444;
                        }
                        a:hover {
                            color: #7645b8;
                        }
                    }
                }
            }
        }
    }
}
.clearfix:before,
.clearfix:after {
display: table;
content: "";
}
.clearfix:after {
clear: both
}
</style>
