<template>
    <div>
        <blog-top logoPath="favicon.ico" :description="website.introduction"></blog-top>
        <side-bar :data="website.sideBar"></side-bar>
        <div class="page-container">
            <div class="section">
                <div class="page about">
                    <div class="about-body">
                        <div class="title">
                            <el-divider content-position="center" data-aos="zoom-in"><span class="message-divider">Zhua-Blog</span></el-divider>
                            <p data-aos="fade-right">
                                有些事，明知是错的，也要去坚持，因为不甘心；
                            </p>
                            <p data-aos="fade-right">
                                有些人，明知是爱的，也要去放弃，因为没有结局；有时候，明知没路了，却还在前进，因为习惯了。
                            </p>
                        </div>
                        <el-divider></el-divider>
                        <div class="introduce" data-aos="flip-right">
                            <div class="text-center introduce-title">简介</div>
                            <div class="field-box">
                                <p>一直以来，无论在学上中，还是毕业从业中，我早已养成了收藏的习惯，但凡遇到了有营养的好文章，或者从业中遇到问题，百度到答案后，我都会随手保存到word中，
                                    放到自己电脑里，进行归类，时间久而久之，文章越来越多，内容越来越杂，收藏的习惯不曾减少，但是回头温习的频率越来越低，看着繁杂的目录，
                                    搭建一个属于自己的博客便在内心油然而生，它将是我用来记录从业中解决BUG的垫脚石，生活上的美文共享，一句话来领悟人生真谛，于是我暂时放弃了手头上正在整理的spring cloud + Nacos框架，
                                    转而搭建{{website.title}}，最后本站就这样诞生了。</p>
                                <p>
                                    <span style="font-style:italic">特殊说明：</span>在这里面你可能会看到众多博客的元素，没错，你的眼睛是雪亮的，前期为了找页面设计灵感，我浏览了众多优秀的博客，有H5、VUE、JPS等等，我为了节约时间，
                                    于是乎，我吸收了他们博客中的一部分元素，然后拼接在一起，当然也有很多我自己的元素在里面，最终一个属于我自己的“四不像”诞生了。o(*￣▽￣*)ブ
                                </p>
                                <div class="image__preview">
                                    <!-- <img v-for="(item, index) in kImg" :key="index" :src="item" @click="previewImg(item)"> -->
                                </div>
                                <h1>开发环境</h1>
                                <p><span class="text-bold">前端：</span>前端页面纯使用VUE + VUEX + ElementUI框架，请求使用axios，路由使用vue-router，及其他优秀小插件完成，完全抛弃了Html以及Jquery。
                                很多页面以及插件都是H5转VUE实现的，虽然过程有点艰苦，不过结果还是挺好的。</p>
                                <p><span class="text-bold">后端：</span>网站采用SpringBoot作为后台框架，基于Spring Security OAuth2实现鉴权体系，使用mysql8数据库进行搭建！文件存储使用<a href="https://www.qiniu.com" target="_blank">七牛云存储</a>。
                                由于考虑到服务器资源（1核2G）太小，所以放弃了SpringCloud、redis等众多优秀框架，基于能少部署几个jar包就少部署几个的原则，小博客艰难的生存着。后续将会继续完善功能和页面的优化！若浏览过程中发现Bug，欢迎
                                <router-link :to="{name: 'message'}">
                                    留言
                                </router-link>反馈。</p>
                                <h1 class="text-center introduce-end" data-aos="fade-up">The End</h1>
                            </div>
                        </div>
                        <div class="update" data-aos="fade-up">
                            <div class="infinite-list-wrapper">
                                <el-timeline>
                                    <el-timeline-item
                                        class="timeline-first"
                                        size="large"
                                        type= "success"
                                        icon="el-icon-time"
                                        data-aos="fade-up">
                                        <span>时光轴</span>
                                    </el-timeline-item>
                                    <el-timeline-item 
                                        class="timeline-item"
                                        v-for="(item,index) in data" :key="index"
                                        :timestamp="item.time"
                                        size="large"
                                        type= "primary"
                                        icon="el-icon-star-on"
                                        placement="top"
                                        data-aos="fade-up">
                                        <el-card class="update-card">
                                            <p v-html="item.content"></p>
                                        </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                                <el-row style="height: 50px" v-if="loading && !noMore"
                                    v-loading="loading"
                                    element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(255, 255, 255, 0)"></el-row>
                                <p align="center" v-if="!disabled">
                                    <el-button type="text" class="more-btn" @click="loadMore()">点击查看更多</el-button>
                                </p>
                                <p align="center" v-if="noMore" style="color: red">没有更多了</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="previewDialogVisible">
            <img width="100%" :src="imageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import BlogTop from '@/components/blog/blog-top'
import SideBar from '@/components/side-bar/main'
import {fetchVersions} from '@/api/blog/blog'
export default {
    name: 'about',
    components: {
        BlogTop,
        SideBar
    },
    data() {
        return {
            data: [],
            kImg: ["/img/about/k1.png","/img/about/k2.png","/img/about/k3.png","/img/about/k4.png",
            "/img/about/k5.png","/img/about/k6.png","/img/about/k7.png"],
            page: {
                current: 1,
                size: 10
            },
            loading: false,
            noMore: false,
            previewDialogVisible: false,
            imageUrl: ""
        }
    },
	computed: {
		...mapGetters(["website"]),
        disabled () {
            return this.loading || this.noMore
        }
	},
    mounted() {
        this.init(this.page)
    },
    methods: {
        init(page) {
            fetchVersions(page).then(res => {
                let versions = res.data.data
                if(versions && versions.records.length > 0) {
                    this.data = this.data.concat(versions.records)
                    this.page.current = versions.current
                }else {
                    this.loading = false
                    this.noMore = true
                }
			})
        },
        loadMore () {
            let p = {
                current: this.page.current + 1,
                size: this.page.size
            }
            this.loading = true
            setTimeout(() => {
                this.init(p)
                this.loading = false
            }, 2000)
        },
        previewImg(src) {
            this.imageUrl = src
            this.previewDialogVisible = true
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
    padding: 0 20px;
    min-height: 800px;
    opacity: 0.9;
}
.section {
    padding: 0;
}
.title {
    height: 80px;
    .message-divider {
        font-size: 2.2em;
        font-weight: 700;
    }
    p {
        font-size: 1.1em;
        text-align: center;
        padding-top: 10px;
        &:last-child {
            padding-bottom: 20px;
        }
    }
}
.introduce {
    margin-top: 30px;
    margin-bottom: 20px;
    .introduce-title {
        margin-top: 30px;
        margin-bottom: 20px;
        font-weight: bold;
        font-size: 24px;
    }
    .field-box {
        .image__preview img {
            width: 100px;
            height: 100px;
            margin: 5px 15px;
            cursor:pointer;
        }
        a {
            color: indianred;
        }
        p {
            margin: 5px 0;
            font-size: 18px;
            text-align: left;
            text-indent: 2em;
            line-height: 40px;
        }
        h1 {
            font-weight: bold;
            font-size: 24px;
            text-align: left;
            margin-top: 25px;
        }
    }
}
.update {
    margin: 0 auto;
    max-width: 800px;
    padding-bottom: 50px;
    .infinite-list-wrapper {
        .timeline-first {
            span {
                font-size: 34px;
                z-index: 1;
                position: relative;
                color: #009688;
            }
        }
        .update-card {
            margin-bottom: 20px;
            border: 1px solid #e6ecf1;
            border-radius: 3px;
            -webkit-box-shadow: 0 3px 8px 0 rgba(116,129,141,.5);
            box-shadow: 0 3px 8px 0 rgba(116,129,141,.5);
        }
        .more-btn {
            margin: 0 auto;
            width: 100%;
            color: green;
        }
    }
}
@media (max-width: 415px) {
    .title {height: 100px;}
    .title .message-divider {
        font-size: 1.6em;
    }
    .title p {
        font-size: 0.8em;
    }
}
@media (max-width: 376px) {
    .title .message-divider {
        font-size: 1.4em;
    }
    .title p {
        font-size: 0.7em;
    }
}
</style>