<template>
    <div>
        <blog-top></blog-top>

        <div class="page-container">
            <div class="section">
                <div class="page article-area">
                    <div class="title">
                        <el-divider content-position="center" data-aos="zoom-in"><span class="message-divider">知识的海洋</span></el-divider>
                        <p data-aos="fade-right">
                            知识就是我们借以飞上天堂的羽翼。
                        </p>
                    </div>
                    <el-row :gutter="30">
                        <el-col :md="18" :sm="24" :xs="24">
                            <div class="article-list">
                                <div v-for="(item, index) in articleList" :key="index" class="single-article" data-aos="fade-up">
                                    <div v-if="item.top_flag == 1" class="fc-flag">置顶</div>
                                    <div v-if="item.cover_src" class="cover-img img-light">
                                        <router-link :to="{name: 'detail', params: {id: item.id}}" class="link">
                                            <img :src="item.cover_src" alt="">
                                        </router-link>
                                    </div>
                                    <div class="time">
                                        <div class="left">
                                            <i class="el-icon-time"></i>
                                            <span>{{item.time}}</span>   
                                        </div>
                                        <div class="right">
                                            <span class="day">{{item.day}}</span>       
                                            <span class="month fs-18">{{item.month}}<span class="fs-14">月</span></span>       
                                            <span class="year fs-18 ml10">{{item.year}}</span>   
                                        </div>
                                    </div>
                                    <div class="article-info">
                                        <div class="article-title">
                                            <h3>
                                                <router-link :to="{name: 'detail', params: {id: item.id}}" class="link">
                                                    {{item.title}}
                                                </router-link>
                                            </h3>
                                        </div>
                                        <div class="article-content">
                                            <p>
                                                {{item.introduction}}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="read-more">
                                        <el-divider content-position="right">
                                            <router-link :to="{name: 'detail', params: {id: item.id}}" class="link fc-black f-fwb fs-18">
                                                继续阅读
                                                <i class="el-icon-d-arrow-right"></i>
                                            </router-link>
                                        </el-divider>
                                    </div>
                                    <div class="f-oh article-footer">
                                        <div v-if="item.tags && item.tags.split(',')" class="f-fl tags">
                                            <i class="iconfont icon-tag fs-18"></i>    
                                            <a v-for="(tag, index) in item.tags.split(',')" :key="index" class="tag">{{tag}}</a>
                                        </div>       
                                        <div class="f-fr">           
                                            <span class="read">               
                                                <i class="iconfont icon-yanjing fs-18"></i>                  
                                                <i class="num">{{item.visit_count}}</i>           
                                            </span>
                                            <span class="like ml20">
                                                <i class="iconfont icon-xin fs-18" :class="{'c-red':likes['1-'+item.id]}"></i>
                                                <span>{{item.like_count}}</span>
                                            </span>           
                                            <span class="ml20">   
                                                <i class="iconfont icon-liuyan1 fs-18"></i>           
                                                <a href="javascript:void(0)" class="num fc-grey">{{item.comment_count}}</a>           
                                            </span>       
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div class="page" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic" >
                                <el-pagination
                                    @current-change="handleCurrentChange"
                                    layout="total, prev, pager, next, jumper"
                                    :page-size="page.size"
                                    :total="page.total">
                                </el-pagination>
                            </div>
                        </el-col>
                        
                        <el-col :md="6" :sm="24" :xs="24" data-aos="fade-left">
                            <blog-right :articleList="hotArticle" :visitors="visitors" :tags="tags" 
                                @search="search"
                                @clickTag="clickTagItem"></blog-right>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import BlogTop from '@/components/blog/blog-top'
import BlogRight from '@/components/blog/blog-right'
import {fetchArticleData, fetchHotArticle, fetchVisitor} from '@/api/blog/blog'
export default {
    name: 'hirofumi',
    components: {
        BlogTop,
        BlogRight
    },
    data() {
        return {
            page: {
                total: 0, // 总页数
                current: 1, // 当前页数
                size: 10 // 每页显示多少条
            },
            articleList: [],
            visitors: [],
            hotArticle: [],
            tags: []
        }
    },
	computed: {
        ...mapGetters(["website","likes"])
	},
    mounted() {
        this.getArticleData({})
        this.getHotArticle()
        this.getVisitor()
    },
    created(){
    },
    methods: {
        getArticleData(params) {
            fetchArticleData(Object.assign({
                type: '1',
                current: this.page.current,
                size: this.page.size
            },params)).then(res => {
                if(res.data.data) {
                    this.articleList = res.data.data.records
                    this.page.total = res.data.data.total
                    this.page.current = res.data.data.current
                    this.page.size = res.data.data.size

                    this.tags = []
                    //获取标签云
                    this.getTags(this.articleList)
                }
            })
        },
        async getTags(list) {
            if(list && list.length > 0) {
                list.forEach(ele => {
                    if(ele.tags) {
                        ele.tags.split(',').forEach(tag => {
                            this.tags.push({'id':tag, 'name':tag})
                        })
                    }
                })
            }
        },
        getHotArticle() {
            fetchHotArticle({size: 8, type: '1'}).then(res => {
				this.hotArticle = res.data.data
				
			})
        },
        getVisitor() {
            fetchVisitor({current: 1, size: 12}).then(res => {
				if(res.data.data.records && res.data.data.records.length > 0) {
					this.visitors = res.data.data.records
				}
			})
        },
        search(val) {
            this.page.current = 1
            this.getArticleData({searchVal: val})
        },
        clickTagItem (tag) {
            this.page.current = 1
            this.getArticleData({tags: tag.id})
        },
        handleCurrentChange(currentPage) {
            this.page.current = currentPage
            this.getArticleData({})
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/blog/blog-common.scss';
.page-container {
	position: relative;
	z-index: 2;
    min-height: 800px;
    background: #fff;
    opacity: 0.9;
    &:before {
        content: '';
        display: block;
        clear: both;
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
/* 文章样式 */
.article-area {
    padding: 10px;
    .article-list {
        position: relative;
        .single-article {
            position: relative;
            margin-bottom: 25px;
            background-color: #fff;
            padding: 48px 15px 15px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            -o-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            -ms-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            .fc-flag {
                position: absolute;
                height: 20px;
                line-height: 20px;
                text-align: center;
                width: 74px;
                background-color: #ff5722;
                color: #fff;
                transform: rotate(-45deg);
                left: -18px;
                top: 9px;
                z-index: 99;
            }
            .cover-img {
                display: block;
                width: 300px;
                height: 200px;
                margin-top: 20px;
                border: 1px solid #e8e9e7;
                overflow: hidden;
                float: left;
                margin-right: 20px;
                img {
                    width: 100%!important;
                    height: 100%!important;
                    border: none;
                    display: block;
                }
            }
            .time {
                width: 100%;
                font-family: SourceCodeProRegular,Menlo,Monaco,Consolas,"Courier New",monospace,'Helvetica Neue',Arial,sans-serif;
                position: absolute;
                right: 10px;
                top: 10px;
                background-color: #fff;
                padding: 0 20px 5px 30px;
                line-height: 32px;
                .left {
                    position: relative;
                    top: 10px;
                    i {
                        margin: 5px;
                    }
                }
                .day {
                    display: block;
                    text-align: center;
                    font-weight: 700;
                    font-size: 40px;
                    color: #6bc30d;
                    position: relative;
                    top: 2px;
                }
            }
            .article-info {
                margin: 20px 0 0 0;
                line-height: 28px;
                position: relative;
                min-height: 200px;
                overflow: hidden;
                padding: 0 20px;
                .article-title {
                    h3 {
                        font-size: 24px;
                        line-height: 26px;
                        font-weight: 600;
                        margin-top: 10px;
                        margin-bottom: 18px;
                        a {
                            color: #333333;
                            -webkit-transition: all 0.5s;
                            -o-transition: all 0.5s;
                            -moz-transition: all 0.5s;
                            -ms-transition: all 0.5s;
                            transition: all 0.5s;
                            &:hover {
                                color: #777;
                            }
                        }
                    }
                }
                .article-content {
                    height: 125px;
                    overflow: hidden;
                    p {
                        font-size: 16px;
                        color: #333333;
                        line-height: 26px;
                        margin-bottom: 25px;
                        margin: 0 0 26px;
                        display: block;
                        margin-block-start: 1em;
                        margin-block-end: 1em;
                        margin-inline-start: 0px;
                        margin-inline-end: 0px;
                    }
                }
            }
            .read-more {
                margin: 25px 0;
            }
            .article-footer {
                color: #787977;
                .tags {
                    .tag {
                        display: inline-block;
                        font-size: 12px;
                        padding: 2px 5px;
                        background-color: #f1f2f0;
                        color: #787977;
                        margin: 2px;
                        text-decoration: none;
                        -webkit-transition: all .2s;
                        transition: all .2s;
                        &:hover {
                            color: #fff;
                            background: #6bc30d;
                        }
                    }
                }
                i {
                    margin-right: 3px;
                    font-size: 16px;
                }
                .num {
                    font-family: SourceCodeProRegular,Menlo,Monaco,Consolas,"Courier New",monospace,'Helvetica Neue',Arial,sans-serif;
                    display: inline-block;
                    vertical-align: middle;
                    font-style: normal;
                }
            }
        }
    }
}
.img-light {
    &:hover {
        &:after {
            transition: left 2s ease-in-out;
            left: 160%;
        }
    }
    &:after {
        content: "";
        height: 100%;
        width: 100px;
        -webkit-transform: skewX(-25deg) translateZ(0);
        transform: skewX(-25deg) translateZ(0);
        background-image: linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.3) 50%,hsla(0,0%,100%,0));
        position: absolute;
        left: -20%;
        top: 0;
        z-index: 2;
    }
}
.article-list .single-article .time .month,
.article-list .single-article .time .year {
    color: #989997;
}
.article-list .single-article .article-footer a,
.article-list .single-article .article-footer i {
    display: inline-block;
    vertical-align: middle;
    font-style: normal;
}
.article-list .single-article .read-more a:hover,
.article-list .single-article .article-footer a:hover {
    color: #6bc30d;
    text-decoration: underline;
}


/* 分页样式 */
.page {
    margin-top:8px;
    margin-bottom:5px;
}

/* 媒体查询 */
@media (max-width: 1200px) {
    .article-list .single-article .article-info .blog-meta {
        margin-top:0px;
    }
    .article-list .single-article .article-info .article-title h3 {
        margin-bottom: 10px;
    }
    .article-list .single-article .article-info .post-content p {
        margin-top: 0;
        line-height:23px;
    }
}
@media (max-width: 767px) {
    .article-list .single-article .article-info .blog-meta .post-readmore {
        float: none;
        height:0px;
        visibility:hidden;
    }
    .article-list .single-article .cover-img {
        float: none !important;
        width: 100% !important;
        margin-bottom: 15px;
    }
    .article-list .single-article .article-info {
        float: none;
        width: 100%;
        padding-left: 0;
    }
}
@media (max-width: 415px) {
    .article-list .single-article .article-info .article-title h3 {
        margin-top: 10px;
    }
    .article-list .single-article .time{
        display:none
    }
    .title {height: 100px;}
    .title .message-divider {
        font-size: 1.8em;
    }
    .title p {
        font-size: 1em;
    }
}
@media (max-width: 376px) {
    .article-list .single-article .article-info .post-content p {
        font-size: 12px;
        line-height: 20px;
    }
    .title .message-divider {
        font-size: 1.6em;
    }
    .title p {
        font-size: 0.85em;
    }
}
</style>