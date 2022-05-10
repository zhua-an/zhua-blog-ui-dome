<template>
  <div>
        <p style="padding-top:15px;" v-if="!data || data.length==0">暂无评论，我来发表第一篇评论！</p>
        <ul class="blog-comment">
            <li v-for="(item,index) in data" :key="index">
                <div class="comment-parent">
                    <a href="javascript:void(0);">
                        <el-avatar class="avatar" :src="item.commentatorAvatar">
                            <img src="../../assets/img/avatar/woman.png"/>
                        </el-avatar>
                        <!-- <img :src="item.commentatorAvatar" alt="" /> -->
                    </a>
                    <div class="info">
                        <span class="username"><a href="javascript:void(0);">{{item.commentator}}</a></span>
                        <el-tag v-if="!item.commentatorId" class="tag" color="orange" size="mini" effect="dark">博主</el-tag>
                    </div>
                    <div class="content comment-text" v-html="createEmoji(item.content)"></div>
                    <p class="info info-footer">
                        <span class="aux-word">
                            <i class="iconfont icon-shijian"></i>{{item.time}}
                        </span> 
                        <span class="aux-word" v-if="item.address">
                            <i class="iconfont icon-diliweizhi"></i>{{item.address}}
                        </span>
                        <span class="aux-word" v-if="item.browser">
                            <i class="iconfont icon-liulanqi"></i>{{item.browser}}
                        </span>
                        <a class="btn-reply" href="javascript:;" @click="reply(item);">{{isActive === item.id ? '收起' : '回复'}}</a>
                    </p>
                </div>
                <div v-if="item.children && item.children.length > 0">
                    <div class="comment-child" v-for="(child,i) in item.children" :key="i">
                        <a href="javascript:void(0);">
                            <el-avatar class="avatar" :src="child.responderAvatar">
                                <img src="../../assets/img/avatar/woman.png"/>
                            </el-avatar>
                        </a>
                        <!-- <a href="javascript:void(0);"><img :src="child.responderAvatar" alt="" /></a> -->
                        <div class="info">
                            <span class="username"><a href="javascript:void(0);">{{child.responder}}</a></span>
                            <el-tag v-if="!child.responderId" class="tag" color="orange" size="mini" effect="dark">博主</el-tag>
                            <span>
                                回复
                                <a href="javascript:void(0);" class="to-username">@{{child.commentator}}</a>
                                <el-tag v-if="!child.commentatorId" class="tag" color="orange" size="mini" effect="dark">博主</el-tag>
                                ：
                            </span>
                            <div class="comment-text" v-html="createEmoji(child.content)"></div>
                        </div>
                        <p class="info">
                            <span class="aux-word">
                                <i class="iconfont icon-shijian"></i>{{child.time}}
                            </span> 
                            <span class="aux-word" v-if="item.address">
                                <i class="iconfont icon-diliweizhi"></i>{{child.address}}
                            </span>
                            <span class="aux-word" v-if="item.browser">
                                <i class="iconfont icon-liulanqi"></i>{{child.browser}}
                            </span>
                            <a class="btn-reply" href="javascript:;" @click="reply(child);">{{isActive === child.id ? '收起' : '回复'}}</a>
                        </p>
                    </div>
                </div>
                <div v-if="commentList[item.id]" v-show="!commentList[item.id].hide" :class="['replycontainer', 'replycontainer_' + item.id]">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 20}"
                        :placeholder="commentList[item.id].placeholder"
                        resize="none"
                        maxlength="250"
                        show-word-limit
                        v-model="value">
                    </el-input>
                    <el-button type="success" size="small" @click="submit(item.id, index)" class="submit">提交</el-button>
                    <vue-emoji
                        @select="selectEmoji">
                    </vue-emoji>
                </div>
            </li>
        </ul>
        <el-row style="height: 50px" v-if="loading && !noMore"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0)"></el-row>
        <p align="center" v-if="!disabled">
            <el-button type="text" class="more-btn" @click="loadData()">点击查看更多</el-button>
        </p>
        <p align="center" v-if="noMore" style="color: red">没有更多了</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import vueEmoji from '@/components/emoji/emoji.vue'
import { createIcon } from '@/components/emoji/utils/emoji'
export default {
    name: 'commentBoard',
    data() {
        return {
            value: '',
            recomment: {},                   //当前点击回复对象
            commentList: [],
            isActive: null,                  //当前点击回复的id
            isActiveParent: null,            //当前点击回复id的父id
            loading: false
        }
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        current: {
            type: Number,
            default: 1
        },
        size: {
            type: Number,
            default: 10
        },
        noMore: {
            type: Boolean,
            default: false
        }
    },
    components: {
        vueEmoji
    },
    watch: {
        data (newValue) {
            this.initComment(newValue)
        }
    },
    computed: {
        ...mapGetters(["blogger"]),
        disabled () {
            return this.loading || this.noMore
        }
    },
    created() {
        this.initComment()
    },
    methods: {
        initComment(newValue) {
            let c_data = this.data
            if(newValue) {
                c_data = newValue
            }else {
                return
            }
            let arr = {}
            for(let index in c_data) {
                if(!c_data[index]) {
                    continue
                }
                let obj = {}
                obj.hide = true
                obj.placeholder = '说点什么吧~'
                arr[c_data[index].id] = obj
            }
            this.commentList = arr

            this.isActive = null
            this.isActiveParent = null
            this.value = ''
        },
        loadData () {
            let p = {
                current: this.current + 1,
                size: this.size
            }
            this.loading = true
            this.$emit('loadData', p)
            setTimeout(() => {
                this.loading = false
            }, 2000)
        },
        reply(comment) {
            this.value = ''
            this.recomment = comment
            // 判断点击的是父级评论
            if (!comment.parentId) {
                //点击收起
                if(comment.id === this.isActive) {
                    this.isActive = null
                    this.isActiveParent = null
                } else {
                    //点击回复
                    if(this.isActiveParent) {
                        let o_obj = this.commentList[this.isActiveParent]
                        o_obj.hide = !o_obj.hide
                        o_obj.placeholder = '说点什么吧~'
                        this.$set(this.commentList, this.isActiveParent, o_obj)
                    }
                    this.isActive = comment.id
                    this.isActiveParent = comment.id
                    // document.querySelector('.replycontainer_'+this.isActive).scrollIntoView({ behavior: 'smooth' })
                }
                let obj = this.commentList[comment.id]
                obj.hide = !obj.hide
                obj.placeholder = '回复【'+comment.commentator+'】'
                this.$set(this.commentList, comment.id, obj)
            } else {
                //子级评论
                //点击收起
                if(comment.id === this.isActive) {
                    this.isActive = null
                    this.isActiveParent = null
                } else {
                    //点击回复
                    if(this.isActiveParent) {
                        let o_obj = this.commentList[this.isActiveParent]
                        o_obj.hide = !o_obj.hide
                        o_obj.placeholder = '说点什么吧~'
                        this.$set(this.commentList, this.isActiveParent, o_obj)
                    }
                    this.isActive = comment.id
                    this.isActiveParent = comment.parentId
                    // document.querySelector('.replycontainer_'+this.isActive).scrollIntoView({ behavior: 'smooth' })
                }
                let obj = this.commentList[comment.parentId]
                obj.hide = !obj.hide
                obj.placeholder = '回复【'+comment.responder+'】'
                this.$set(this.commentList, comment.parentId, obj)
            }
            
        },
        selectEmoji (code) {
            this.value += code
        },
        createEmoji(val) {
            if(!val) {
                return ''
            }
            //return val.replace(/:.*?:/g, createIcon).replace(/\n|\r\n/g, '<br>')
            return val.replace(/:[0-9a-z_-]{1,}:/g, createIcon).replace(/\n|\r\n/g, '<br>')
        },
        submit (currentId, index) {
            if(!this.value) {
                this.$message({
                    message: '回复内容不能为空呦!',
                    type: 'warning'
                })
                return
            }
            var data = {
                'value': this.value,
                'id': this.isActive,
                'index': index,
                'obj': this.recomment
            }
            this.$emit('submit',data)

            setTimeout(() => {
                //重置内容
                this.value = ''
                this.recomment = {}
                
                let obj = this.commentList[currentId]
                obj.hide = !obj.hide
                obj.placeholder = '说点什么吧~'
                this.$set(this.commentList, currentId, obj)

                this.isActive = null
                this.isActiveParent = null
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/blog/blog-common.scss';
/*评论与留言*/
.blog-comment {
    position: relative;
    margin-bottom: 10px;
    li {
        border-bottom: 1px dotted #01aaed;
        padding: 15px 0 10px 0;
        list-style: none;
    }
    .tag {
        border-color:orange;
        margin:0 5px;
    }
    .info-footer {
        font-size: 13px;
    }
    .info {
        padding-top: 5px;
        span {
            padding-right: 5px;
            a {
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        .layui-badge {
            margin-right: 5px;
        }
        .username {
            a {
                color: #01aaed;
            }
        }
        .btn-reply {
            color: #009688;
        }
    }
    .replycontainer {
        margin-top: 10px;
        margin-bottom: 10px;
        .el-textarea__inner {
            background-color: transparent !important;
        }
        .submit {
            float: right;
            position: relative;
            margin-top: 20px;
        }
    }
    .content {
        padding: 5px 0;
        min-height: 30px;
        font-size: 14px;
    }
    hr {
        margin-left: 53px;
    }
    i {
        font-size: 12px;
        margin-right: 2px;
    }
}
.blog-comment .content,
.blog-comment .info {
    margin-left: 53px;
}
.comment-parent {
    & > a {
        & > .avatar {
            width: 40px;
            height: 40px;
            margin: 5px 5px 5px 0;
            position: absolute;
            border-radius: 50px;
        }
        & > img {
            width: 45px;
            height: 45px;
            margin: 5px 5px 5px 0;
            position: absolute;
            border-radius: 50px;
        }
    }
}
.comment-child {
    margin-left: 53px;
    min-height: 50px;
    & > a {
        & > .avatar {
            width: 40px;
            height: 40px;
            margin: 5px 5px 5px 0;
            position: absolute;
            border-radius: 50px;
        }
        & > img {
            width: 40px;
            height: 40px;
            margin: 5px 5px 5px 0;
            position: absolute;
            border-radius: 50px;
        }
    }
    .info {
        margin-left: 48px;
        font-size: 13px;
        line-height: 20px;
        .to-username {
            color: #01aaed;
            font-weight: bolder;
            margin-left: 5px;
        }
    }
}
.comment-text {
    padding: 10px 10px 0px 30px;
    font-family:Arial,Helvetica,sans-serif;
    word-wrap: break-word;
    word-break: break-all;
    // white-space: normal;
    white-space: pre-wrap;
    a {
        color: #1e9fff;
        font-weight: bold;
        &:hover {
            text-decoration: underline;
        }
    }
}
.aux-word {
    margin-right: 3px;
    color: #555;
}
.emoji_icon {
    width: 25px;
}
.more-btn {
    margin: 0 auto;
    width: 100%;
    color: green;
}
/*评论与留言END*/
</style>