<template>
    <div>
        <blog-top></blog-top>
        <div class="page-container">
            <div class="section">
                <div class="page">
                    <div class="title">
                        <el-divider content-position="center" data-aos="zoom-in"><span class="message-divider">美文分享</span></el-divider>
                        <p data-aos="fade-right">
                            有些事，明知是错的，也要去坚持，因为不甘心；有些人，明知是爱的，也要去放弃，因为没有结局。
                        </p>
                    </div>
                    <div class="tip"><p>屏幕滑动底部可以加载更多呦，赶快试试吧(*^_^*)</p></div>
                    <el-row :gutter="20">
                        <el-col v-for="(item, index) in list" :key="index" :lg="6" :md="6" :sm="12" :xs="24" data-aos="fade-up">
                            <el-card shadow="hover">
                                <div class="card">
                                     <router-link class="card-thumb" :to="{name: 'detail', params: {id: item.id}}">
                                        <img :src="item.cover_src" alt="">
                                        <div class="archive-content">
                                            {{item.introduction}}
                                        </div>
                                    </router-link>
                                    <div class="info">
                                        <h4>
                                            <router-link :to="{name: 'detail', params: {id: item.id}}">
                                                {{item.title}}
                                            </router-link>
                                        </h4>
                                        <small>
                                            {{item.introduction}}
                                        </small>
                                    </div>
                                    <div class="bottom clearfix">
                                        <span class="time">
                                            <i class="el-icon-time"></i>
                                            {{item.date}}
                                        </span>
                                        <span class="stars">
                                            <a>
                                                <i class="iconfont icon-yanjing"></i>
                                                <span>{{item.visit_count}}</span></a>
                                            <a>
                                                <i class="iconfont icon-xin" :class="{'c-red':likes['2-'+item.id]}"></i>
                                                <span>{{item.like_count}}</span>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row style="height: 50px" v-if="loading && !noMore"
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(255, 255, 255, 0)"></el-row>
                    <p align="center" v-if="noMore" style="color: red">没有更多了</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex"
import BlogTop from '@/components/blog/blog-top'
import {getScrollTop, getScrollHeight, getWindowHeight} from '@/util/util'
import {fetchArticleData} from '@/api/blog/blog'
export default {
    name: 'bellesLettres',
    components: {
        BlogTop
    },
    data() {
        return {
            list: [],
            page: {
                current: 1,
                size: 16
            },
            loading: false,
            noMore: false
        }
    },
	computed: {
		...mapGetters(["website","likes"])
	},
    mounted() {
        this.load(this.page)

        window.addEventListener('scroll', this.scrollHandler);
    },
    methods: {
        load(page, params) {
            fetchArticleData(Object.assign({
                type: '2'
            }, page, params)).then(res => {
                let result = res.data.data
                if(result && result.records && result.records.length > 0) {
                    result.records.forEach(element => {
                        this.list.push(element)
                    });
                    this.page.current = result.current
                } else {
                    this.loading = false
                    this.noMore = true
                }
            })
        },
        scrollHandler() {
            let vm=this;
            if(getScrollTop() + getWindowHeight() >= getScrollHeight() - 100 ){   //此时滚动条已经下拉到底部啦
                //拉取数据的方法
                if(vm.loading || vm.noMore) {
                    return 
                }
                vm.noMore = false
                vm.loading = true
                setTimeout(() => {
                    if(!vm.noMore) {
                        let p = {
                            current: vm.page.current + 1,
                            size: this.page.size
                        }
                        vm.load(p)
                        vm.loading = false
                    }
                }, 2000)
            }
        },
        search(val) {
            this.page.current = 1
            this.load({searchVal: val})
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler);
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
.tip {
    background-color: rgb(236, 248, 255);
    padding: 8px 16px;
    border-radius: 4px;
    border-left: 5px solid rgb(80, 191, 255);
    margin: 20px 0px;
    p {
        font-size: 14px;
        color: rgb(94, 109, 130);
        line-height: 1.5em;
    }
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
.card {
    background-color: #ffffff;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    margin-bottom: 0px;
    .card-thumb {
        position: relative;
        display: inherit;
        overflow: hidden;
        &:after {
            content: "";
            background: rgba(0,0,0,0.01);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
    img {
        width: 100%;
        height: 170px;
        display: inline-block;
        vertical-align: middle;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        transition: all 1s ease 0s;
    }
    .archive-content {
        padding: 160px 20px;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        text-align: center;
        color: #fff;
        font-size: 14px;
        line-height: 26px;
        opacity: 0;
        background-color: rgba(0,0,0,.5);
    }
    &:hover {
        img {
            // -webkit-filter: brightness(.5);
            // filter: brightness(.5);
            // transform: scale(1.05);
            // -moz-transform: scale(1.05);
            // -webkit-transform: scale(1.05);

            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            transform: scale(1.1);
            -webkit-filter: blur(3px);
            -moz-filter: blur(3px);
            filter: blur(3px);
        }
        .archive-content {
            -webkit-animation: fadeIn 1s;
            animation: fadeIn 1s;
            opacity: 1;
        }
    }
}
.info {
    padding: 6px 15px 28px;
    height: 80px;
    overflow: hidden;
    line-height: 1.42857143;
    h4 {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;
        white-space: nowrap;
        display: block;
        font-weight: bold;
        line-height: 18px;
        margin-top: 7px;
        margin-bottom: 5px;
        color: #60bde8 !important;
    }
    a {
        color: #60bde8 !important;
        &:hover {
            text-decoration: underline !important;
        }
    }
    small {
        color: #838383;
        padding-bottom: 10px;
    }
}
.bottom {
    border-radius: 0 0 3px 3px;
    border-top: 1px solid #e7e7e7;
    box-shadow: 0 1px 0 0 #fff inset;
    padding: 7px 15px 7px 15px;
    color: #8b8b8c;
    position: relative;
    margin-top: 13px;
    line-height: 12px;
    .time {
        font-size: 13px;
        color: #999;
    }
    .stars {
        float: right;
        a:last-child {
            padding-left: 12px;
        }
    }
    a {
        color: #8b8b8c;
    }
    i {
        cursor: pointer;
        padding-right: 5px;
        position: relative;
        top: 1.4px;
    }
    span {
        font-size: 10px;
        font-family: "Arial";
    }
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
}
.clearfix {
    &:after {
        clear: both;
    }
}
@media (max-width: 415px) {
    .title {height: 100px;}
    .title .message-divider {
        font-size: 1.8em;
    }
    .title p {
        font-size: 1em;
    }
}
@media (max-width: 376px) {
    .title .message-divider {
        font-size: 1.6em;
    }
    .title p {
        font-size: 0.85em;
    }
}
</style>