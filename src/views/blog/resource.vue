<template>
    <div>
        <blog-top></blog-top>
        <side-bar :data="website.sideBar"></side-bar>
        <div class="page-container">
            <div class="section">
                <div class="page">
                    <div class="title">
                        <el-divider content-position="center" data-aos="zoom-in"><span class="message-divider">资源分享</span></el-divider>
                        <p data-aos="fade-right">
                            曾经，我想和你分享我所有的秘密，但现在，你成了我心底的秘密。
                        </p>
                    </div>
                    <div class="resource" data-aos="fade-up">
                        <el-tabs v-model="activeName" stretch @tab-click="handleTabClick">
                            <el-tab-pane v-for="item in tabs" :key="item.value"
                                :label="item.label" :name="item.value">
                                <div v-if="item.value == '3'">
                                    <waterfall-card :col='col' :list="getData()" @loadmore="loadmore" @handlerRes="handlerRes"></waterfall-card>
                                </div>
                                <div v-else>
                                    <resource-card :list="getData()" @handlerRes="handlerRes"></resource-card>
                                </div>
                                <div class="noMore">
                                    <p align="center" v-if="noMore[item.value]" style="color: red">没有更多了</p>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
        <loading :show="loading"/>
    </div>
</template>
<script>
import {mapGetters} from "vuex"
import BlogTop from '@/components/blog/blog-top'
import SideBar from '@/components/side-bar/main'
import ResourceCard from '@/components/blog/resource-card'
import WaterfallCard from '@/components/blog/waterfall-card'
import loading from '@/components/loading/loading'
import {getScrollTop, getScrollHeight, getWindowHeight} from '@/util/util'
import {getDic,fetchPage,handlerResClick} from '@/api/blog/blog'
export default {
    name: 'resource',
    components: {
        BlogTop,
        SideBar,
        ResourceCard,
        WaterfallCard,
        loading
    },
    data() {
        return {
            data: [],
            col: 5,
            loading: false,
            noMore: [],
            activeName: '1',
            tabs: [],
            value: '',
            pages: [],
            res: []
        }
    },
	computed: {
		...mapGetters(["website"])
	},
    created() {
        this.loadResDict(this.activeName)
        window.addEventListener('scroll', this.scrollHandler)
    },
    methods: {
        loadResDict(activeName) {
            getDic('res_type').then(res => {
                this.tabs = res.data.data
                if(this.tabs && this.tabs.length > 0) {
                    this.tabs.forEach((ele) => {
                        this.pages[ele.value] = {current: 1,size: 20}
                        this.noMore[ele.value] = false
                    })
                    this.loadResource(this.pages[activeName],{type: activeName})
                }
            })
        },
        getData() {
            if(this.res[this.activeName] && this.res[this.activeName].length > 0) {
                return this.res[this.activeName]
            }else {
                return []
            }
        },
        loadResource(page, form) {
            this.loading = true
            setTimeout(() => {
                fetchPage(Object.assign(form, page)).then(data => {
                    let result = data.data.data
                    let index = Number(form.type)
                    if(result && result.records && result.records.length > 0) {
                        let resourceTemp = []
                        if(!this.res[index] || this.res[index].length == 0) {
                            resourceTemp = result.records
                        }else {
                            resourceTemp = this.res[index].concat(result.records)
                        }
                        this.$set(this.res, index, resourceTemp)
                        let page = this.pages[index]
                        page.current ++
                        this.pages[index] = page
                        if(result.records.length < page.size) {
                            this.$set(this.noMore, index, true)
                        }
                    } else {
                        this.$set(this.noMore, index, true)
                    }
                    this.loading = false
                })
            }, 1000)
            
        },
        handleTabClick(tab) {
            let index = tab.name
            if(!this.res[index]) {
                this.pages[index] = {current: 1,size: 10}
                this.loadResource(this.pages[index],{type: index})
            }
        },
        handlerRes(data) {
            handlerResClick(data).then(() => {
                let index = Number(this.activeName)
                this.res[index].forEach(ele => {
                    if(ele.id == data.id) {
                        if('download' == data.type) {
                            ele.downloadCount++
                        }else {
                            ele.previewCount++
                        }
                    }
                })
                this.$set(this.res, index, this.res[index])
            })
        },
        clickResImg(id) {
            let data = {type: 'preview', id: id}
            this.handlerRes(data)
        },
        loadmore() {
            let index = this.activeName
            this.loadResource(this.pages[index],{type: index})
        },
        scrollHandler() {
            let vm=this;
            if(getScrollTop() + getWindowHeight() >= getScrollHeight() - 50){   //此时滚动条已经下拉到底部啦
                //拉取数据的方法
                if(vm.loading || vm.noMore[vm.activeName]) {
                    return 
                }
                vm.loading = true
                vm.noMore[vm.activeName] = false
                setTimeout(() => {
                    vm.loadmore()
                    vm.loading = false
                }, 2000)
            }
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler);
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/blog/blog-common.scss';
.section {
    padding: 10px 0;
}
.page-container {
	position: relative;
	z-index: 2;
	position: relative;
	background: #fff;
    padding: 20px 0 20px;
    min-height: 800px;
    opacity: 0.9;
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
.noMore {
    padding-top: 20px;
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