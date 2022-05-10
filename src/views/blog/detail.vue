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
                            <h1 class="detail-title">{{article.title}}</h1>
                            <div class="detail-info">
                                <i class="iconfont icon-dianji"></i>
                                <span id="click_count_text">{{article.visit_count}} 次</span>
                                <a @click="myScrollIntoView('.explain')">
                                    <i class="el-icon-chat-dot-round"></i>
                                    <span id="comment_count_text">{{article.comment_count}} 条</span>
                                </a>
                                <a @click="clickLike(article)">
                                    <i class="iconfont icon-dianzan" :class="{'c-red':likes[article.type+'-'+article.id]}"></i>
                                    <span class="like_count_text">{{article.like_count}}</span>
                                </a>
                                <i class="el-icon-date"></i>
                                <span>{{article.create_time}}</span>
                            </div>
                        </div>
                        <div class="detail-body" v-highlight>
                            <p v-html="article.content"></p>
                        </div>
                        <div class="explain">
                            温馨提示：本博客所有内容仅供学习，不允许商用，如有侵权，请联系博主删除，谢谢。
                        </div>
                        <el-divider content-position="left">分享快乐</el-divider>
                        <div id="share" class="share" data-aos="fade-right">
                            <ul>
                                <li class="f-praise" @click="clickLike(article)"><span><a href="javascript:void(0);" class="s-praise"></a></span></li>
                                <li class="f-weinxi" @click="clickShare('wechat')"><a class="s-weinxi" data-cmd="weixin"></a></li>
                                <li class="f-sina" @click="clickShare('sina')"><a class="s-sina" data-cmd="tsina"></a></li>
                                <li class="f-qq" @click="clickShare('qq')"><i class="iconfont icon-qq1"></i></li>
                                <li class="f-qzone" @click="clickShare('qzone')"><a class="s-qzone" data-cmd="qzone"></a></li>
                            </ul>
                        </div>
                        <ul V-if="moreArticle" class="recommentd">
                            <li>
                                <label><i class="el-icon-back"></i></label>
                                <div>
                                    <span>Last</span>
                                    <p>
                                        <router-link  v-if="moreArticle[0]" :to="{name: 'detail', params: {id: moreArticle[0].id}}">
                                            {{moreArticle[0].title}}
                                        </router-link>
                                        <span v-else>没有更多了</span>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>Next</span>
                                    <p>
                                        <router-link v-if="moreArticle[1]" :to="{name: 'detail', params: {id: moreArticle[1].id}}">
                                            {{moreArticle[1].title}}
                                        </router-link>
                                        <span v-else>没有更多了</span>
                                    </p>
                                </div>
                                <label><i class="el-icon-right"></i></label>
                            </li>
                        </ul>
                        <el-divider content-position="left">发表评论</el-divider>
                        <div id="comment" class="comment">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 6, maxRows: 20}"
                                placeholder="说点什么吧~"
                                resize="none"
                                maxlength="50"
                                show-word-limit
                                v-model="value">
                            </el-input>
                            <el-button type="success" size="small" @click="submit" class="submit">提交</el-button>
                            <vue-emoji
                               @select="selectEmoji">
                            </vue-emoji>
                            <comment-board :data="commentList"
                                :current="this.page.current"
                                :size="this.page.size"
                                :noMore="noMore"
                                @loadData="loadComment"
                                @submit="submitComment">
                            </comment-board>
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
import CommentBoard from '@/components/blog/comment-board'
import vueEmoji from '@/components/emoji/emoji.vue'
import { validatenull } from '@/util/validate'
import { fetchArticleInfo, fetchAdjoinArticle, fetchComments, blogComment, blogLike } from '@/api/blog/blog'
import {openWindow} from '@/util/util'
export default {
    name: 'detail',
    data() {
        return {
            id: null,
            article: {},
            moreArticle: [],
            commentList: [],
            value: '',
            page: {
                current: 1,
                size: 10
            },
            noMore: false
        }
    },
    components: {
        BlogTop,
        CommentBoard,
        vueEmoji
    },
	computed: {
        ...mapGetters(["website","likes"])
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
            fetchArticleInfo(this.id).then(res => {
                this.article = res.data.data
                loading.close();
            }).then(() => {
                fetchAdjoinArticle(this.id, this.article.type).then(res => {
                    this.moreArticle = res.data.data
                }) 
            }).then(() => {
                this.loadComment(this.page)
            }).catch(err => {
                console.log(err)
                loading.close();
            })
        },
        loadComment(page) {
            fetchComments(Object.assign(page, { 'type' : this.article.type, 'objectId': this.id})).then(res => {
                let result = res.data.data
                if(result && result.records && result.records.length > 0) {
                    this.commentList = this.commentList.concat(result.records)
                    this.page.current = result.current
                }else {
                    setTimeout(() => {
                        this.noMore = true
                    }, 2000)
                }
			})
        },
        clickLike(item) {
            if(!validatenull(this.$store.getters.readerAccessToken)) {
                blogLike({objectId:item.id,type:item.type}).then(res => {
                    item.like_count = res.data.data
                    if(this.likes[item.type+'-'+item.id]) {
                        this.$message({
                            message: '取消点赞成功!',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '点赞成功!',
                            type: 'success'
                        });
                    }
                    this.likes[item.type+'-'+item.id] = !this.likes[item.type+'-'+item.id]
                    this.$store.dispatch("updateLikes", this.likes)
                })
            } else {
                this.$message({
                    message: '还未登录哦，请先登录再试试吧!',
                    type: 'warning'
                });
            }
        },
        clickShare(type) {
            if ('wechat' == type) {//分享微信
                const url = 'https://cli.im/api/qrcode/code?text=' + encodeURIComponent(window.location.href)
                const thirdpart = '分享到微信'
                openWindow(url, thirdpart, 540, 540)
            } else if('sina' == type) {//分享到新浪
                 let p = {
                    url: window.location.href,
                    type: '3',
                    count: '1', /** 是否显示分享数，1显示(可选)*/
                    appkey: '', /** 您申请的应用appkey,显示分享来源(可选)*/
                    title: this.article.title, /** 分享的文字内容(可选，默认为所在页面的title)*/
                    pic: this.article.cover_src, /**分享图片的路径(可选)*/ 
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
                    desc: this.article.introduction, /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
                    title: this.article.title,/*分享标题(可选)*/
                    summary: this.article.introduction,/*分享描述(可选)*/
                    pics: this.article.cover_src,/*分享图片(可选)*/
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
                    desc: this.article.introduction,/*默认分享理由(可选)*/
                    summary: this.article.introduction,/*分享摘要(可选)*/
                    title: this.article.title,/*分享标题(可选)*/
                    site: this.website.title,/*分享来源 如：腾讯网(可选)summary*/
                    pics: this.article.cover_src, /*分享图片的路径(可选)*/
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
        submitComment(data) {
            if(validatenull(this.$store.getters.readerAccessToken)) {
                this.$message({
                    message: '还未登录哦，请先登录再试试吧!',
                    type: 'warning'
                })
                return
            }
            if(!data.value) {
                this.$message({
                    message: '回复内容不能为空呦!',
                    type: 'warning'
                })
                return
            }
            let comment = data.obj
            let form = {
                parentId: comment.parentId ? comment.parentId : data.id,
                commentatorId: comment.commentatorId,
                commentator: comment.commentator,
                commentatorAvatar: comment.commentatorAvatar,
                content: data.value,
                objectId: this.id,
                type: this.article.type
            }
            blogComment(form).then((res) => {
                let newC = res.data.data
                this.commentList.forEach(item => {
                    if((comment.parentId && comment.parentId == item.id) ||
                    (!comment.parentId && comment.id == item.id)) {
                        if(!item.children || item.children.length == 0) {
                            item.children = []
                        }
                        item.children.push(newC)
                    }
                })
            })
        },
        selectEmoji (code) {
            this.value += code
        },
        submit () {
            if(validatenull(this.$store.getters.readerAccessToken)) {
                this.$message({
                    message: '还未登录哦，请先登录再试试吧!',
                    type: 'warning'
                })
                return
            }
            if(!this.value) {
                this.$message({
                    message: '评论内容不能为空呦!',
                    type: 'warning'
                })
                return
            }
            blogComment({content: this.value, type: this.article.type, objectId: this.id}).then((res) => {
                let comment = res.data.data
                let commentListTemp = []
                commentListTemp.push(comment)
                this.commentList = commentListTemp.concat(this.commentList)
                this.value = ''
            })
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
    font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;
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
        table {
            line-height:25px;
            th {
                text-align:center;
                border:1px solid #aaa;
            }
            tr:hover {
                background-color:#87CEFF
            }
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
.recommentd {
    width: auto;
    margin-top: 64px;
    display: grid;
    padding: 0;
    grid-column-gap: 24px;
    grid-template-rows: auto;
    grid-template-areas: "previous next";
    grid-template-columns: 1fr 1fr;
    li {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        text-align: -webkit-match-parent;
        border: 1px solid #e6ecf1;
        border-radius: 3px;
        -webkit-box-shadow: 0 3px 8px 0 rgba(116,129,141,.5);
        box-shadow: 0 3px 8px 0 rgba(116,129,141,.5);
        label {
            -webkit-box-flex: 0;
            -ms-flex: 0 0 auto;
            flex: 0 0 auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 16px;
            i {
                color: #9daab6;
                font-size: 24px;
            }
        }
        &:hover {
            -webkit-box-shadow: #ccc 0px 10px 10px;
            -moz-box-shadow: #ccc 0px 10px 10px;
            box-shadow: #ccc 0px 10px 10px;
        }
        &:first-of-type div {
            -webkit-box-align: end;
            -ms-flex-align: end;
            align-items: flex-end;
        }
        &:last-of-type div {
            -webkit-box-align: start;
            -ms-flex-align: start;
            align-items: flex-start;
        }
        div {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            margin: 0;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            padding: 16px;
            text-align: right;
            span {
                font-size: 12px;
                color: #babbc0;
                padding-bottom: 5px;
            }
            a,p {
                -webkit-transition: all .25s;
                transition: all .25s;
                font-size: 14px;
                color: #5c6875;
            }
            a:hover {
                color: #14afff;
            }
        }
    }
}
.comment {
    padding-bottom: 115px;
    .submit {
        float: right;
        position: relative;
        margin-top: 20px;
    }
}
.explain {
    margin: 20px 0;
    border-left: 3px solid #6bc30d;
    min-height: 26px;
    line-height: 26px;
    padding: 5px 20px;
    background-color: #f8f9f7;
    font-size: 16px;
    font-weight: 400;
    color: #585957;
    text-shadow: 0 1px 0 rgba(255,255,255,.5);
    clear: both;
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