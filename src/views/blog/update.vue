<template>
    <div>
        <blog-top></blog-top>
        <side-bar :data="website.sideBar"></side-bar>
        <div class="page-container">
            <div class="section">
                <div class="page">
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
</template>
<script>
import { mapGetters } from "vuex"
import BlogTop from '@/components/blog/blog-top'
import {fetchVersions} from '@/api/blog/blog'
import SideBar from '@/components/side-bar/main'
export default {
    name: 'update',
    components: {
        BlogTop,
        SideBar
    },
    data () {
      return {
        data: [],
        page: {
            current: 1,
            size: 10
        },
        loading: false,
        noMore: false
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
                if(versions && versions.records && versions.records.length > 0) {
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
    .page {
        margin: 0 auto;
        max-width: 800px;
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
}
</style>