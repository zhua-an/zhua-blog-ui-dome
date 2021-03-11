<template>
    <div>
        <blog-top></blog-top>
        <side-bar :data="website.sideBar"></side-bar>
        <div class="page-container">
            <div class="section">
                <div class="page">
                    <div class="title">
                        <el-divider content-position="center" data-aos="zoom-in"><span class="message-divider">留言板</span></el-divider>
                        <p data-aos="fade-right">
                            推心置腹的谈话就是心灵的展示！
                        </p>
                    </div>
                    <div class="comment" data-aos="fade-up">
                        <el-input
                            type="textarea"
                            style="white-space: pre-line;"
                            :autosize="{ minRows: 6, maxRows: 20}"
                            placeholder="说点什么吧~"
                            resize="none"
                            v-model="value">
                        </el-input>
                        <el-button type="success" size="small" @click="submit" class="submit">提交</el-button>
                        <vue-emoji
                            @select="selectEmoji">
                        </vue-emoji>
                        <el-row :gutter="20" style="margin-top: 20px;">
                            <el-col :span="6"><el-input
                                placeholder="留下您的邮箱吧~"
                                v-model="email"
                                clearable>
                            </el-input></el-col>
                            <el-col :span="18">
                                <el-alert
                                    title="PS: 邮箱仅作为消息回复使用！"
                                    type="info"
                                    :closable="false">
                                </el-alert>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
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
</template>
<script>
import { mapGetters } from "vuex"
import BlogTop from '@/components/blog/blog-top'
import CommentBoard from '@/components/blog/comment-board'
import vueEmoji from '@/components/emoji/emoji.vue'
import SideBar from '@/components/side-bar/main'
import { validatenull } from '@/util/validate'
import { fetchComments, blogComment } from '@/api/blog/blog'
export default {
    name: 'message',
    components: {
        BlogTop,
        CommentBoard,
        vueEmoji,
        SideBar
    },
    data() {
        return {
            type: '4',
            email: '',
            commentList: [],
            value: '',
            page: {
                current: 1,
                size: 10
            },
            noMore: false
        }
    },
	computed: {
		...mapGetters(["website"])
	},
    mounted() {
        this.loadComment(this.page)
    },
    methods: {
        loadComment(page) {
            fetchComments(Object.assign(page, { 'type' : this.type })).then(res => {
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
                type: this.type
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
            blogComment({content: this.value, type: this.type, email: this.email}).then((res) => {
                let comment = res.data.data
                let commentListTemp = []
                commentListTemp.push(comment)
                this.commentList = commentListTemp.concat(this.commentList)
                this.value = ''
                this.email = ''
            })
        }
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
.comment {
    padding-bottom: 115px;
    .submit {
        float: right;
        position: relative;
        margin-top: 20px;
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