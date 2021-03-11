<template>
  <div id="blog">
    <blog-header2 v-show="headerVisible" :menuLinks="blogLinks" :isActive="activeMenu"></blog-header2>
    <back-top></back-top>
    <router-view />
    <div id="suspension">
        <div class="livechat-girl animated" :style="{right:(readerLogin ? '0px':'-35px'), bottom:(readerLogin ? '80px':'75px')}" 
        @mouseover="selectLivechat()" @mouseout="outLivechat()" @click="login()">
          <img class="girl" :src="livechatImg" :style="{'border-radius':(readerLogin ? '50px':'0px')}" oncontextmenu="return false;" ondragstart="return false;">
            <div class="livechat-hint rd-notice-tooltip rd-notice-type-success rd-notice-position-left single-line" :class="{show_hint:varShowHint, hide_hint:!varShowHint}">
                <div class="rd-notice-content">{{livechatContent}}</div>
            </div>
            <div class="animated-circles" :class="{animated:varAnimated}">
                <div class="circle c-1"></div>
                <div class="circle c-2"></div>
                <div class="circle c-3"></div>
            </div>
        </div>
    </div>
    <blog-footer :blogger="blogger" :blogLinks="blogLinks"></blog-footer>
    <el-dialog
        title="登录"
        :visible.sync="dialogVisible"
        width="30%">
        <div class="social-container">
            <!-- <div class="box"
                @click="handleLogin('wechat_mp')">
                <span class="container"
                        :style="{backgroundColor:'#6ba2d6'}">
                    <i icon-class="wechat"
                    class="iconfont icon-weixin"></i>
                </span>
                <p class="title">微信</p>
            </div> -->
            <!-- <div class="box"
                @click="handleLogin('github')">
                <span class="container"
                        :style="{backgroundColor:'#6ba2d6'}">
                    <i icon-class="github"
                    class="iconfont icon-github"></i>
                </span>
                <p class="title">Github</p>
            </div> -->
            <div class="box"
                @click="handleLogin('weibo')">
                <span class="container"
                        :style="{backgroundColor:'#DC143C'}">
                    <i icon-class="weibo"
                    class="iconfont icon-weibo"></i>
                </span>
                <p class="title">Weibo</p>
            </div>
            <div class="box"
                @click="handleLogin('qq')">
                <span class="container"
                        :style="{backgroundColor:'#8dc349'}">
                    <i icon-class="qq"
                    class="iconfont icon-qq"></i>
                </span>
                <p class="title">QQ</p>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import AOS from 'aos'
import 'aos/dist/aos.css'
import BlogHeader2 from '@/components/blog/blog-header2'
import BlogFooter from '@/components/blog/blog-footer'
import BackTop from '@/components/back-top/main'
import {addVisit} from '@/api/blog/blog'
import {openWindow,getScrollTop} from '@/util/util'
import {validatenull} from '@/util/validate'
export default {
    name: 'blog',
    components: {
        BlogHeader2,
        BlogFooter,
        BackTop
    },
    data () {
        return {
            activeMenu: 'home',
            headerVisible: false,
            socialForm: {
                source: '',
                state: '',
                code: ''
            },
            chatImg: require('../../assets/img/avatar/a.png'),
            livechatImg: this.chatImg,
            livechatContent: '嘿，来试试登录吧！',
            anim: null,
            wait: null,
            varAnimated: false,
            varShowHint: true,
            dialogVisible: false
        }
    },
    computed: {
        ...mapGetters(["website","blogLinks","blogger","reader"]),
        readerLogin() {
            if(!validatenull(this.reader)) {
                this.setStyle(true)
                return true
            }else {
                this.setStyle(false)
                return false
            }
        }
    },
    watch: {
        $route() {
            const params = this.$route.query;
            this.socialForm.state = params.state;
            this.socialForm.code = params.code;
            if (!validatenull(this.socialForm.state) && !validatenull(this.socialForm.code)) {
                this.socialForm.source = this.socialForm.state.split('::')[0];
                this.$store.dispatch("fetchReaderInfo", this.socialForm).then(() => {
                    this.$store.dispatch("fetchLikes").then(() => {
                         window.location.href = window.location.href.indexOf('code') < window.location.href.indexOf('state') ? window.location.href.split('code')[0] : window.location.href.split('state')[0]
                    })
                })
            }
            this.activeMenu = this.$route.name
            this.visit()
        }
    },
    mounted() {
        AOS.init({
            delay: 400, 
            duration: 800
        })
        this.activeMenu = this.$route.name
        this.suspension()
        window.addEventListener('scroll', this.scrollHandler);
    },
    created () {
        var OriginTitile = document.title;
        var titleTime;
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                document.title = '(つェ⊂)我藏好了哦~ ' + OriginTitile;
                clearTimeout(titleTime);
            } else {
                document.title = '(*´∇｀*) 被你发现啦~ ' + OriginTitile;
                titleTime = setTimeout(function() {
                    document.title = OriginTitile;
                }, 2000);
            }
        });
        this.visit()
    },
    methods: {
        async visit() {
            addVisit()
        },
        suspension() {
            this.anim = setInterval(() => {
                this.varAnimated = !this.varAnimated
            }, 3000);
            this.wait = setInterval(() => {
                this.varShowHint = false
                clearInterval(this.wait)
            }, 4500);
        },
        selectLivechat() {
            clearInterval(this.wait)
            this.varShowHint = true
        },
        outLivechat() {
            this.varShowHint = false
        },
        login() {
            if(!this.readerLogin) {
                this.dialogVisible = true
            } else {
                this.$confirm('确定要离开吗，不再等等了？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch("readerLogout").then(() => {
                        this.$message({
                            type: 'success',
                            message: '登出成功!'
                        });
                    })
                })
            }
        },
        handleLogin(type) {
            this.dialogVisible = false
            if('wechat_mp' === type) {
                const url = `${this.baseUrl}/oauth/qrcode/${type}`
                const thirdpart = 'wechat'
                openWindow(url, thirdpart, 540, 540)
            } else {
                const url = `${this.baseUrl}/oauth/login/${type}`
                const thirdpart = 'tencent'
                openWindow(url, thirdpart, 540, 540)
            }
        },
        setStyle(flag) {
            if (!flag) { //未登录
                this.livechatImg = this.chatImg
                this.livechatContent = '嘿，来试试登录吧！'
                return;
            }
            clearInterval(this.anim);
            this.livechatImg = this.reader.avatar
            this.livechatContent = '欢迎您，' + this.reader.userName + '! 点击登出！'
        },
        scrollHandler() {
            if(getScrollTop() >= 100 && this.headerVisible == false) {
                setTimeout(() => {
                    this.headerVisible = true
                }, 200)
            } else if(getScrollTop() < 100) {
                this.headerVisible = false
            }
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler);
    }
}
</script>
<style lang="scss" scoped>
#blog {
  width: 100%;
  height: 100%;
}
.social-container {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .box {
    cursor: pointer;
  }
  .iconfont {
    color: #fff;
    font-size: 30px;
  }
  .container {
    $height: 50px;
    display: inline-block;
    width: $height;
    height: $height;
    line-height: $height;
    text-align: center;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .title {
    text-align: center;
  }
}
#suspension {
    position: relative;
    @keyframes scaleToggleOne { 
        0% {
            transform:scale(1);
            -webkit-transform:scale(1);
        }
        50% {
            transform:scale(2);
            -webkit-transform:scale(2);
        }
        100% {
            transform:scale(1);
            -webkit-transform:scale(1);
        }
    }

    @keyframes scaleToggleTwo { 
        0% {
            transform:scale(1);
            -webkit-transform:scale(1);
        }
        20% {
            transform:scale(1);
            -webkit-transform:scale(1);
        }
        60% {
            transform:scale(2);
            -webkit-transform:scale(2);
        }

        100% {
            transform:scale(1);
            -webkit-transform:scale(1);
        }
    }

    @keyframes scaleToggleThree { 
        0% {
            transform:scale(1);
            -webkit-transform:scale(1);
        }
        33% {
            transform:scale(1);
            -webkit-transform:scale(1);
        }
        66% {
            transform:scale(2);
            -webkit-transform:scale(2);
        }
        100% {
            transform:scale(1);
            -webkit-transform:scale(1);
        }
    }

    .animated {
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    .livechat-girl {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position: fixed;
        bottom: 75px;
        right: -35px;
        opacity: 0;
        -webkit-box-shadow: 0 5px 10px 0 rgba(35,50,56,.3);
        box-shadow: 0 5px 10px 0 rgba(35,50,56,.3);
        z-index: 700;
        transform: translateY(0);
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        cursor: pointer;
        -webkit-transition: all 1s cubic-bezier(.86, 0, .07, 1);
        transition: all 1s cubic-bezier(.86, 0, .07, 1);
        &:focus {
            outline: 0;
        }
        &.animated {
            opacity: 1;
            transform: translateY(-40px);
            -webkit-transform: translateY(-40px);
            -ms-transform: translateY(-40px);
        }
        &:after {
            content: '';
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-image: linear-gradient(to bottom, #26c7fc, #26c7fc);
            position: absolute;
            right: 1px;
            top: 1px;
            z-index: 50;
        }
        .girl {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: auto;
            z-index: 50;
        }
        .animated-circles {
            .circle {
                background: rgba(38,199,252,.25);
                width: 60px;
                height: 60px;
                border-radius: 50%;
                position: absolute;
                z-index: 49;
                transform: scale(1);
                -webkit-transform: scale(1);
            }
            &.animated {
                .c-1 {
                    animation: 2s scaleToggleOne cubic-bezier(.25, .46, .45, .94) forwards;
                }
                .c-2 {
                    animation: 2.5s scaleToggleTwo cubic-bezier(.25, .46, .45, .94) forwards;
                }
                .c-3 {
                    animation: 3s scaleToggleThree cubic-bezier(.25, .46, .45, .94) forwards;
                }
            }
        }
        &.animation-stopped {
            .circle {
                opacity: 0!important;
                opacity: 0!important;
            }
        }
        .livechat-hint {
            position: absolute;
            right: 40px;
            top: 50%;
            margin-top: -20px;
            opacity: 0;
            z-index: 0;
            -webkit-transition: all .3s cubic-bezier(.86, 0, .07, 1);
            transition: all .3s cubic-bezier(.86, 0, .07, 1);
            &.show_hint {
                -webkit-transform: translateX(-40px);
                transform: translateX(-40px);
                opacity: 1;
            }
            &.hide_hint {
                opacity: 0;
                -webkit-transform: translateX(0);
                transform: translateX(0);
            }
            &.rd-notice-tooltip {
                max-width: 1296px!important;
                .rd-notice-content {
                    width: auto;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
    .red-dot {
        &:after {
            content: '';
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-image: linear-gradient(to bottom, #ff5722, #ff5722);
            position: absolute;
            right: 1px;
            top: 1px;
            z-index: 50;
        }
    }
    .rd-notice-tooltip {
        -webkit-box-shadow: 0 2px 2px rgba(0,0,0,.2);
        box-shadow: 0 2px 2px rgba(0,0,0,.2);
        font-size: 14px;
        border-radius: 3px;
        line-height: 1.25;
        position: absolute;
        z-index: 65;
        max-width: 350px;
        opacity: 1;
        &:after {
            position: absolute;
            display: block;
            content: '';
            height: 20px;
            width: 20px;
            -webkit-box-shadow: none;
            box-shadow: none;
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            z-index: 50;
        }
        .rd-notice-content {
            background: 0;
            border-radius: 3px;
            width: 100%;
            color: #fff;
            position: relative;
            z-index: 60;
            padding: 20px;
            font-weight: 400;
            line-height: 1.45;
        }
        &.single-line {
            .rd-notice-content {
                height: 40px;
                padding: 0 20px;
                line-height: 40px;
                white-space: nowrap;
            }
        }
    }
    .rd-notice-type-success {
        background-color: #26c7fc;
        -webkit-box-shadow: 0 5px 10px 0 rgba(38,199,252,.2);
        box-shadow: 0 5px 10px 0 rgba(38,199,252,.2);
        .rd-notice-content {
            background-color: #26c7fc;
        }
        &:after {
            background-color: #26c7fc;
            -webkit-box-shadow: 0 5px 10px 0 rgba(38,199,252,.2);
            box-shadow: 0 5px 10px 0 rgba(38,199,252,.2);
        }
    }
    .rd-notice-position-left {
        margin-left: -20px;
        &:after {
            right: -6px;
            top: 50%;
            margin-top: -10px;
        }
    }

    @media only screen and (max-width:1599px) {
    .livechat-girl .livechat-hint.rd-notice-tooltip { max-width: 1060px!important }
    }
    @media only screen and (max-width:1309px) {
    .livechat-girl .livechat-hint.rd-notice-tooltip { max-width: 984px!important }
    }
    @media only screen and (max-width:1124px) {
    .livechat-girl .livechat-hint.rd-notice-tooltip { max-width: 600px!important }
    }

}
</style>