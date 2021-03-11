<template>
    <div>
        <blog-top></blog-top>
        
        <div class="page-container">
            <div class="section">
                <div class="page">
                    <div class="title">
                        <el-divider content-position="center" data-aos="zoom-in"><span class="message-divider">心灵之窗</span></el-divider>
                        <p data-aos="fade-right">
                            枯桑知天风，海水知天寒，君知吾思汝？
                        </p>
                    </div>
                    <div v-for="(item, index) in feelingsList" :key="index" class="warp-box" data-aos="fade-up">
                        <div class="item">
                            <div class="warp-title">
                                <i class="iconfont icon-rili"></i>
                                <span class="date">{{item.date}}</span>
                                <i v-if="item.address" class="iconfont icon-map"></i>
                                <span v-if="item.address" class="location">{{item.address}}</span>
                            </div>
                            <p class="text-cont" v-html="item.content"></p>
                            <div v-if="item.imgSrc && item.imgSrc.split(',').length > 0" class="img-box">
                                <el-row :gutter="15">
                                    <el-col v-for="(img,imgi) in item.imgSrc.split(',')" :key="imgi"
                                        :xs="24" :sm="8">
                                        <el-image
                                            class="feel-img"
                                            :src="img" 
                                            :preview-src-list="item.imgSrc.split(',')"
                                            >
                                        </el-image>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="op-list">
                                <p class="chat" @click="clickChat($event, item)"><i class="el-icon-s-comment"></i><span>{{item.commentCount}}</span></p>
                                <p class="like" @click="clickLike(item)"><i class="iconfont icon-xin1" :class="{'c-red':likes[type+'-'+item.id]}"></i><span>{{item.likeCount}}</span></p>
                            </div>
                        </div>
                        <div class="comment animated zoomIn" style="display:none">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 5}"
                                placeholder="说点什么吧~"
                                resize="none"
                                maxlength="250"
                                show-word-limit
                                v-model="item.commentVal">
                            </el-input>
                            <el-button type="success" size="small" @click="submit(item)" class="submit">提交</el-button>
                            <vue-emoji
                                @select="selectEmoji($event, item)">
                            </vue-emoji>
                            <el-divider></el-divider>
                            <comment-board :data="item.commentList"
                                :current="item.current"
                                :size="item.size"
                                :noMore="item.noMore"
                                @loadData="loadMoreComment($event, item)"
                                @submit="submitComment($event, item)"></comment-board>
                        </div>
                    </div>
                    <div class="update">
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
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import BlogTop from '@/components/blog/blog-top'
import CommentBoard from '@/components/blog/comment-board'
import vueEmoji from '@/components/emoji/emoji.vue'
import { validatenull } from '@/util/validate'
import { getScrollTop, getScrollHeight, getWindowHeight } from '@/util/util'
import { fetchSayPage, blogLike, fetchComments, blogComment } from '@/api/blog/blog'
export default {
    name: 'heartFeelings',
    components: {
        BlogTop,
        CommentBoard,
        vueEmoji
    },
    data() {
        return {
            type: '3',
            feelingsList: [],
            page: {
                current: 1,
                size: 10
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
        window.addEventListener('scroll', this.scrollHandler)
    },
    methods: {
        load(page) {
            fetchSayPage(page).then(res => {
                let result = res.data.data
                if(result && result.records.length > 0) {
                    this.feelingsList = this.feelingsList.concat(result.records)
                    this.page.current = result.current
                }else {
                    this.loading = false
                    this.noMore = true
                }
            })
        },
        scrollHandler() {
            let vm=this;
            if(getScrollTop() + getWindowHeight() >= getScrollHeight() - 100){   //此时滚动条已经下拉到底部啦
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
        clickChat(e, feelings) {
            let commentEle = e.currentTarget.parentElement.parentElement.nextElementSibling
            if(commentEle.style.display == "none") {
                commentEle.style.display = "block"
                e.currentTarget.firstElementChild.style.color = "green"

                if(!feelings.commentList || feelings.commentList.length == 0) {
                    this.loadComment(feelings)
                }
            } else {
                commentEle.style.display = "none"
                e.currentTarget.firstElementChild.style.color = ""
            }
        },
        clickLike(feelings) {
            if(!validatenull(this.$store.getters.readerAccessToken)) {
                blogLike({objectId:feelings.id,type: this.type}).then(res => {
                    feelings.likeCount = res.data.data
                    this.likes[this.type+'-'+feelings.id] = !this.likes[this.type+'-'+feelings.id]
                    this.$store.dispatch("updateLikes", this.likes)
                })
            } else {
                this.$message({
                    message: '还未登录哦，请先登录再试试吧!',
                    type: 'warning'
                });
            }
        },
        submit(feelings) {
            if(validatenull(this.$store.getters.readerAccessToken)) {
                this.$message({
                    message: '还未登录哦，请先登录再试试吧!',
                    type: 'warning'
                })
                return
            }
            if(!feelings.commentVal) {
                this.$message({
                    message: '评论内容不能为空呦!',
                    type: 'warning'
                })
                return
            }
            
            blogComment({content: feelings.commentVal, objectId: feelings.id, type: this.type}).then((res) => {
                let data = res.data.data
                let commentListTemp = []
                commentListTemp.push(data)
                if(feelings.commentList && feelings.commentList.length > 0) {
                    feelings.commentList = commentListTemp.concat(feelings.commentList)
                }else {
                    feelings.commentList = commentListTemp
                }
                feelings.commentVal = ''
                feelings.commentCount++
            })
        },
        submitComment(data, obj) {
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
                objectId: comment.id,
                type: this.type
            }
            blogComment(form).then((res) => {
                let newC = res.data.data

                obj.commentList.forEach(item => {
                    if((comment.parentId && comment.parentId == item.id) ||
                    (!comment.parentId && comment.id == item.id)) {
                        if(!item.children || item.children.length == 0) {
                            item.children = []
                        }
                        item.children.push(newC)
                    }
                })
                obj.commentCount++
            })
        },
        selectEmoji(code, comment) {
            if(comment.commentVal) {
                comment.commentVal += code
            }else {
                comment.commentVal = code
            }
        },
        loadMoreComment(page, feelings) {
            feelings.current = page.current
            feelings.size = page.size
            this.loadComment(feelings)
        },
        loadComment(feelings) {
            if(!feelings.current) {
                feelings.current = 1
            }
            if(!feelings.size) {
                feelings.size = 10
            }
            fetchComments({ current: feelings.current, size: feelings.size, 'type': this.type, objectId: feelings.id }).then(res => {
                let result = res.data.data
                if(result && result.records && result.records.length > 0) {
                    if(feelings.commentList && feelings.commentList.length > 0) {
                        feelings.commentList = feelings.commentList.concat(result.records)
                    }else {
                        feelings.commentList = result.records
                    }
                    feelings.current = result.current
                }else {
                    setTimeout(() => {
                        // feelings.noMore = true
                        this.$set(feelings, 'noMore', true)
                    }, 2000)
                }
			})
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
    min-height: 800px;
    background: #fff;
    opacity: 0.9;
    .warp-box {
        max-width: 800px;
        margin: 0 auto;
        background: #ffffff;
        margin-bottom: 25px;
        border: 1px solid #e6ecf1;
        border-radius: 3px;
        -webkit-box-shadow: 0 3px 8px 0 rgba(116,129,141,.5);
        box-shadow: 0 3px 8px 0 rgba(116,129,141,.5);
        .item {
            padding: 50px 46px 20px 54px;
        }
        .warp-title {
            height: 20px;
            line-height: 20px;
            margin-bottom: 20px;
           i {
                position: relative;
                top: 1px;
                margin-right: 7px;
                &.icon-map {
                    margin-left: 10px;
                    margin-right: 2px;
                    color: #666;
                }
            }
            span {
                color: #ff7f21;
                &.date {
                    margin-right: 5px;
                }
                &.location {
                    color: #888;
                }
            }
        }
        .text-cont {
            line-height: 24px;
            margin-bottom: 20px;
            a {
                color: #01AAED;
                &:hover {
                    color: #1E9FFF;
                    text-decoration:underline;
                }
            }
        }
        .img-box {
            overflow: hidden;
            .feel-img {
                margin: 0px 5px 10px 0;
                width: 200px !important;
                height: 200px !important;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
        .op-list {
            margin-top: 15px;
            margin-bottom:5px;
            overflow: hidden;
            i {
                margin-right:5px;
            }
            .like {
                -webkit-user-select: none;
                -moz-user-focus: none;
                -moz-user-select: none;
                &.active {
                    color: #ff7f21;
                }
            }
            p {
                float: right;
                cursor: pointer;
                color: #999999;
                a {
                    cursor: pointer;
                    color: #999999;
                }
                &.chat {
                    margin-left: 50px;
                }
            }
        }
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
.comment {
    display: none;
    padding:0px 30px 20px 30px;
    .submit {
        float: right;
        position: relative;
        margin-top: 20px;
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

/* 媒体查询 */
@media (max-width: 767px) {
    .page-container .page .warp-box .warp-title i.icon-map, .page-container .page .warp-box .warp-title span.location {
        display: none;
    }
}
@media (max-width: 518px) {
    .page-container .warp-box .img-box img {
        width: 110px !important;
    }
}
@media (max-width: 488px) {
    .page-container .page .item-box .item {
        padding: 35px 35px 20px 35px;
    }
    .page-container .warp-box .img-box img {
        width: 90px !important;
    }
}
@media (max-width: 410px) {
    .review-version {
        padding: 0px 20px 20px 20px;
    }
    .title {height: 100px;}
    .title .message-divider {
        font-size: 1.8em;
    }
    .title p {
        font-size: 1em;
    }
}
@media (max-width: 396px) {
    .page-container .warp-box .img-box img {
        width: 85px !important;
    }
    .title .message-divider {
        font-size: 1.6em;
    }
    .title p {
        font-size: 0.85em;
    }
}
@media (max-width: 361px) {
    .page-container .warp-box .img-box img {
        width: 80px !important;
    }
    .page-container .page .warp-box .warp-title {
        margin-bottom: 15px;
    }
    .page-container .warp-box .text-cont {
        margin-bottom: 10px;
    }
}
@media (max-width: 321px) {
    .page-container .page .item-box .item {
        padding: 25px 20px 20px 23px;
    }
    .page-container .warp-box .img-box img {
        width: 75px !important;
    }
}
</style>