<template>
    <div>
        <blog-top></blog-top>
        <div class="page-container">
            <div class="section">
                <div class="page">
                    <div class="detail" data-aos="fade-up">
                        <div style="padding-bottom: 15px;">
                            <el-link type="primary" :underline="false" @click="$router.go(-1)">
                                <i class="el-icon-s-fold"></i>
                                返回上一级
                            </el-link>
                        </div>
                        <div class="detail-header">
                            <h1 class="detail-title">{{article.name}}</h1>
                            <div class="detail-info">
                                <a v-if="article.previewUrl" @click="handlerRes('preview')">
                                    <i class="iconfont icon-yanjing"></i>
                                    <span id="preview_count_text">{{article.previewCount}} 次</span>
                                </a>
                                <a v-if="article.downloadUrl" @click="handlerRes('download')">
                                    <i class="iconfont icon-xiazaigray"></i>
                                    <span id="download_count_text">{{article.downloadCount}} 次</span>
                                </a>
                                <i class="el-icon-date"></i>
                                <span>{{article.createTime}}</span>
                            </div>
                        </div>
                        <div class="detail-body" v-highlight>
                            <p v-html="article.content"></p>
                        </div>
                        <div id="download">
                            <el-button v-if="article.previewUrl" type="primary" icon="el-icon-view" @click="handlerRes('preview')">预览</el-button>
                            <el-button v-if="article.downloadUrl" type="success" icon="el-icon-download" @click="handlerRes('download')">下载</el-button>
                        </div>
                        <div class="explain">
                            温馨提示：本博客所有内容仅供学习，不允许商用，如有侵权，请联系博主删除，谢谢。
                        </div>
                        <div>
                        <el-divider content-position="left">分享快乐</el-divider>
                        </div>
                        <div id="share" class="share" data-aos="fade-right">
                            <ul>
                                <!-- <li class="f-praise" @click="clickLike(article)"><span><a href="javascript:void(0);" class="s-praise"></a></span></li> -->
                                <li class="f-weinxi" @click="clickShare('wechat')"><a class="s-weinxi" data-cmd="weixin"></a></li>
                                <li class="f-sina" @click="clickShare('sina')"><a class="s-sina" data-cmd="tsina"></a></li>
                                <li class="f-qq" @click="clickShare('qq')"><i class="iconfont icon-qq1"></i></li>
                                <li class="f-qzone" @click="clickShare('qzone')"><a class="s-qzone" data-cmd="qzone"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'element-ui'
import { mapGetters } from "vuex"
import BlogTop from '@/components/blog/blog-top'
import { getResourceInfo } from '@/api/blog/blog'
import {openWindow} from '@/util/util'
import {handlerResClick} from '@/api/blog/blog'
export default {
    name: 'resDetail',
    data() {
        return {
            article: {}
        }
    },
    components: {
        BlogTop
    },
	computed: {
        ...mapGetters(["website"])
    },
    watch:{
        '$route':function(newUrl,oldUrl){
            if(newUrl!=oldUrl){
                this.init()
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.id = this.$route.params.id
            if(!this.id) {
                MessageBox.confirm(
                    '加载文章失败,请返回首页重试!',
                    '返回首页',
                    {
                        confirmButtonText: '返回首页',
                        type: 'warning',
                        showClose: false,
                        showCancelButton: false,
                        closeOnPressEscape: false
                    }
                ).then(() => {
                    this.$router.push({ path: this.website.homePage})
                })
                return 
            }
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            getResourceInfo(this.id).then(res => {
                this.article = res.data.data
                loading.close();
            }).catch(err => {
                console.log(err)
                loading.close();
            })
        },
        handlerRes(type) {
            let data = {type: type, id: this.article.id}
            handlerResClick(data).then(() => {
                let url = ''
                if('download' == data.type) {
                    this.article.downloadCount++
                    url = this.article.downloadUrl
                }else {
                    this.article.previewCount++
                    url = this.article.previewUrl
                }
                const title = '资源分享'
                // openWindow(url, title, 540, 540)
                window.open(url, title)
            })
        },
        clickShare(type) {
            if ('wechat' == type) {//分享微信
                const url = 'http://qr.liantu.com/api.php?text=' + encodeURIComponent(window.location.href)
                const thirdpart = '分享到微信'
                openWindow(url, thirdpart, 540, 540)
            } else if('sina' == type) {//分享到新浪
                 let p = {
                    url: window.location.href,
                    type: '3',
                    count: '1', /** 是否显示分享数，1显示(可选)*/
                    appkey: '', /** 您申请的应用appkey,显示分享来源(可选)*/
                    title: this.article.name, /** 分享的文字内容(可选，默认为所在页面的title)*/
                    pic: this.article.coverSrc, /**分享图片的路径(可选)*/ 
                    ralateUid: '', /**关联用户的UID，分享微博会@该用户(可选)*/
                    rnd: new Date().valueOf()
                }
                let s = [];
                for (let i in p) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''))
                }
                const url = "http://service.weibo.com/share/share.php?" + s.join('&');
                const thirdpart = '分享到新浪'
                openWindow(url, thirdpart, 540, 540)
            } else if('qq' == type) {//分享到qq好友
                let p = {
                    url: window.location.href,/*获取URL，可加上来自分享到QQ标识，方便统计*/
                    desc: this.article.remarks, /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
                    title: this.article.name,/*分享标题(可选)*/
                    summary: this.article.remarks,/*分享描述(可选)*/
                    pics: this.article.coverSrc,/*分享图片(可选)*/
                    flash: '', /*视频地址(可选)*/
                    //commonClient : true, /*客户端嵌入标志*/
                    site: this.website.title/*分享来源 (可选) ，如：QQ分享*/
                };
                let s = [];
                for (let i in p) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }
                const url = "http://connect.qq.com/widget/shareqq/iframe_index.html?" + s.join('&') 
                const thirdpart = '分享到qq好友'
                openWindow(url, thirdpart, 740, 540)
            } else if('qzone' == type) {//分享到qq空间
                let p = {
                    url: window.location.href,
                    showcount: '1',/*是否显示分享总数,显示：'1'，不显示：'0' */
                    desc: this.article.remarks,/*默认分享理由(可选)*/
                    summary: this.article.remarks,/*分享摘要(可选)*/
                    title: this.article.name,/*分享标题(可选)*/
                    site: this.website.title,/*分享来源 如：腾讯网(可选)summary*/
                    pics: this.article.coverSrc, /*分享图片的路径(可选)*/
                    style: '101',
                    width: 199,
                    height: 30
                };
                let s = [];
                for (let i in p) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }
                const url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&')
                const thirdpart = '分享到qq空间'
                openWindow(url, thirdpart, 600, 540)
            }
        },
        myScrollIntoView(c) {
            document.querySelector(c).scrollIntoView({ behavior: 'smooth' })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/blog/blog-common.scss';
.page-container {
	position: relative;
	z-index: 2;
	position: relative;
	background: #fff;
    padding: 20px 0 20px;
    min-height: 800px;
    opacity: 0.9;
}
.detail {
    line-height: 1.75;
    max-width: 980px;
    position: relative;
    margin: 0px auto;
    h1.detail-title {
        color: #918f90;
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 25px;
        text-transform: uppercase
    }
    .detail-info {
        text-align: right;
        i {
            margin: 0 5px;
        }
        span {
            margin-right: 20px;
        }
    }
    .detail-body {
        min-height: 500px;
        font-size: 18px;
        line-height: 1.75;
        margin-bottom: 40px;
        & > :last-child {
            margin-bottom: 0;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        p {
            margin: 1em 0;
        }
        h1 {
            font-size: 20px;
            line-height: 40px;
        }
        h2 {
            font-size: 18px;
            line-height: 37px;
        }
        h3 {
            font-size: 16px;
            line-height: 34px;
            display: table;
        }
        h4 {
            font-size: 14px;
            line-height: 28px;
        }
        ul {
            li {
                &:before {
                    color: #efefef;
                    font-size: 11px;
                    font-size: 0.6875rem;
                    content: "\e60d";
                    font-family: iconfont;
                }
            }
        }
        ol {
            counter-reset: ol-counter;
            li {
                &:before {
                    content: counter(ol-counter) ".";
                    counter-increment: ol-counter;
                }
            }
        }
        blockquote {
            font-size: 25px;
            line-height: 36px;
            color: #888;
            clear: both;
            position: relative;
            padding: 1em 0;
            margin: 1.62em 0;
            text-align: center;
            &:after {
                width: 2%;
                left: 49%;
                border-top: .2em solid #efefef;
                border-bottom: .2em solid #efefef;
            }
            p {
                margin: 1em 0 0;
                &:first-child {
                    margin: 0;
                }
            }
        }
        input[type='password'] {
            background: #fafafa;
            height: 50px;
            margin: 20px 0 0;
            border-radius: 3px;
        }
        input[type='submit'] {
            background: #918f90;
            height: 50px;
            width: 150px;
            margin: 20px 0;
            border-radius: 30px;
            cursor: pointer;
        }
    }
    .detail-body p+h1,
        .detail-body p+h2,
        .detail-body p+h3,
        .detail-body p+h4,
        .detail-body p+h5,
        .detail-body p+h6 {
        margin-top: 40px;
        margin-bottom: 30px;
    }
    .detail-body h5,
        .detail-body h6 {
        text-transform: uppercase;
    }
    .detail-body ul,
        .detail-body ol {
        font-size: 15px;
        border: 1px solid #efefef;
        padding: 5px 20px;
        margin: 0 0 30px 0;
        border-radius: 3px;
    }
    .detail-body ul li,
        .detail-body ol li {
        font-size: 15px;
        line-height: 1.75;
        padding: 10px 0 10px 25px;
    }
    .detail-body ul li:before,
        .detail-body ol li:before {
        float: left;
        vertical-align: middle;
        margin-right: 10px;
        margin-left: -25px;
        color: #ddd;
    }
    .detail-body ul li~li,
        .detail-body ol li~li {
        border-top: 1px solid #efefef;
    }
    .detail-body blockquote:after,
        .detail-body blockquote:before {
        content: '';
        display: block;
        position: absolute;
        width: 38%;
        height: 100%;
        left: 31%;
        top: 0;
        pointer-events: none;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
    }
    #download {
        width: 200px;
        margin: 0 auto;
        padding: 10px 5px 20px 5px;
    }
    .share {
        margin: 30px 0 0 0;
        text-align: center;
        font-size: 30px;
        ul {
            overflow: hidden;
            margin: 0 auto;
            display: table;
            li {
                float: left;
                width: 50px;
                height: 50px;
                box-sizing: border-box;
                border: 2px solid #e8e9e7;
                border-radius: 50%;
                margin: 0 10px;
                opacity: .75;
                transition: opacity .36s linear;
                cursor: pointer;
                position: relative;
                text-rendering: auto;
                list-style: none;
                span {
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
                a {
                    position: absolute;
                    background: url(../../assets/img/share/shareicon.png) no-repeat;
                    background-size: 32px 160px;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translate(-50%,-50%);
                    transform: translate(-50%,-50%);
                    margin: 0;
                    float: left;
                    width: 32px;
                    line-height: 32px;
                    height: 32px;
                    cursor: pointer;
                    text-indent: -100em;
                    overflow: hidden;
                    color: #3a8ceb;
                    &:hover {
                        color: #333;
                        opacity: .8;
                        filter: alpha(opacity=80);
                        text-decoration: underline;
                    }
                }
                .s-praise {
                    background-position: 0 -128px;
                }
                .s-weinxi {
                    background-position: 0 0;
                }
                .s-sina {
                    background-position: 0 -64px;
                }
                .s-qzone {
                    background-position: 0 -32px;
                }
            }
            .f-qq i {
                margin: 0;
                width: 32px;
                line-height: 32px;
                height: 32px;
                cursor: pointer;
                overflow: hidden;
                color: #14afff;
                display: inline-block;
                font-size: inherit;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                &:hover {
                    opacity: .8;
                    filter: alpha(opacity=80);
                    text-decoration: underline;
                }
            }
            li.f-praise {
                border-color: #f46753;
            }
            li.f-weinxi {
                border-color: #5ac64f;
            }
            li.f-sina {
                border-color: #ff7171;
            }
            li.f-qq {
                border-color: #14afff;
            }
            li.f-qzone {
                border-color: #fbb611;
            }
        }
    }
}
@media screen and (min-width: 576px) {
}
@media screen and (min-width: 768px){
}
@media screen and (min-width: 992px){
}
@media screen and (min-width: 1200px){
}
@media screen and (max-width:760px) {
    .detail-title {
		font-size: 25px;
		text-align: center
    }
    .detail-body {
		font-size: 16px;
	}
}
</style>