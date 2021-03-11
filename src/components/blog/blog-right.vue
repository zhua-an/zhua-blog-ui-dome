<template>
    <div class="col-other">
        <div class="other-item">
            <div class="inner">
                <div class="r-cover">
                    <img src="../../assets/img/bg/IMG_1716.jpg" alt="">
                    <h1>
                        <span>子华er</span>
                    </h1>
                </div>
                <div class="r-body">
                    <p>你能找到我么？</p>
                    <ul class="icons">
                        <li>
                            <el-tooltip  class="item"  content="首页" placement="top" >
                                <router-link :to="website.homePage">
                                    <i class="iconfont icon-zhuye"></i>
                                </router-link>
                            </el-tooltip>
                        </li>
                        <li>
                            <el-tooltip  class="item"  content="QQ" placement="top" >
                                <a :href="'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=' + website.blogger.qq" target="_blank"><i class="iconfont icon-qq"></i></a>
                            </el-tooltip>
                        </li>
                        <li>
                            <el-tooltip class="item" effect="light" placement="right">
                                <div slot="content" class="wechatimg"><img src="../../assets/img/code/wx.jpg"/></div>
                                <a href="javasript:void(0);">
                                    <i class="iconfont icon-weixin"></i>
                                </a>
                            </el-tooltip>
                        </li>
                        <li>
                            <!-- <el-tooltip  class="item"  content="个人简历" placement="top" >
                                <a href="#" target="_blank"><i class="iconfont icon-meiwen"></i></a>
                            </el-tooltip> -->
                            <el-tooltip  class="item"  content="Github" placement="top" >
                                <a :href="website.blogger.github" target="_blank"><i class="iconfont icon-meiwen"></i></a>
                            </el-tooltip>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="other-item">
            <div class="inner">
                <cool-clock></cool-clock>
            </div>
        </div>
        <div :class="['other-item', 'search', fixedCss ? 'fixed':'']">
            <i class="iconfont icon-search search" @click="search"></i>
            <input id="keyWord" type="text" v-model="searchVal" autocomplete="off" placeholder="Search..." class="layui-input" @keyup.enter.stop="search">
        </div>
        <div :class="['other-item', 'tag-cloud', fixedCss ? 'fixed':'']">
            <h5 class="other-item-title">标签云</h5>
            <div class="inner">
                <div class="tags">
                    <tag-cloud :data="tags" @clickTag="clickTag"></tag-cloud>
                </div>
            </div>
        </div>
        <div class="other-item">
            <h5 class="other-item-title">热门文章</h5>
            <div class="inner">
                <ul class="hot-list-article">
                    <li v-for="(item,index) in articleList" :key="index">
                        <router-link :to="{name: 'detail', params: {id: item.id}}">
                            {{item.title}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="other-item" ref="vistor">
            <h5 class="other-item-title">最近访客</h5>
            <div class="inner">
                <dl class="vistor">
                    <dd v-for="(item,index) in visitors" :key="index">
                        <a href="javasript:void(0);"><img :src="item.avatar"><cite>{{item.userName}}</cite></a>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import CoolClock from '@/components/cool-clock/main'
import TagCloud from '@/components/tag-cloud/main'
export default {
    name: 'blogRight',
    props: {
        articleList: {
            type: Array,
            default: () => {
                return []
            }
        },
        visitors: {
            type: Array,
            default: () => {
                return []
            }
        },
        tags: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {
        CoolClock,
        TagCloud
    },
    computed: {
		...mapGetters(["website"])
	},
    data() {
        return {
            searchVal: '',
            fixedCss: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll() {
            let objBottom = this.$refs.vistor.getBoundingClientRect().bottom
            if (objBottom < 20) {
                this.fixedCss = true
            } else {
                this.fixedCss = false
            }
        },
        clickTag (tag) {
            this.searchVal = tag.id
            this.$emit("clickTag",tag)
        },
        search() {
            this.$emit("search",this.searchVal)
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    }
}
</script>

<style lang="scss" scoped>
/* 热门文章 */
.col-other {
    position: relative;
    .other-item {
        position: relative;
        background-color: #fff;
        margin-bottom: 20px;
        overflow: hidden;
        -webkit-transition: all 0.2s linear;
        transition: all 0.2s linear;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        -o-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        -ms-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        &:hover{
            transform: translate(0,-2px);
            box-shadow:0 15px 30px rgba(0,0,0,.1);
        }
        .other-item-title {
            margin: 10px 20px;
            padding: 5px;
            line-height: 30px;
            font-weight: 400;
            border-bottom: 1px solid #e8e9e7;
            color: #383937;
            position: relative;
            font-size: 18px;
            &:hover {
                &:after {
                    width: 100%;
                }
            }
            &:after {
                content: "";
                position: absolute;
                width: 85px;
                height: 2px;
                background: #000;
                left: 0;
                bottom: -1px;
                -moz-transition: all 1s ease;
                -webkit-transition: all 1s ease;
                transition: all 1s ease;
            }
        }
    }
}
.other-item {
    .tags {
        margin: 10px 15px;
        a {
            display: inline-block;
            margin: 5px 5px;
        }
    }
    .inner {
        margin: 0 20px;
        padding-bottom: 10px;
    }
}
/* 介绍 */
.r-cover {
    text-align: center;
    border-radius: 4px 4px 0 0 ;
    text-align: center;
    position: relative;
    img{
        width:100%;
        min-height: 100px;
    }
    h1{
        position: absolute;
        bottom:5px;
        margin:0 0 0 -65px;
        font-size: 20px;
        letter-spacing:0.5px;
        color:#fff;
        text-shadow: 1px 1px 1px rgba(0,0,0,.7);
        font-weight: 700;
        width:130px;
        left:50%;
        span{
            opacity: 0.8;
        }
    }
}
.r-body {
    p {
        font-size: 14px;
        margin:5px 0 8px 0;
        font-weight: 700;
        text-align: center;
    }
    ul {
        text-align: center;
		list-style: disc;
		margin: 0 0 0.5em 0;
		padding-left: 1em;
        li {
			padding-left: 0.5em;
		}
        &.icons {
            cursor: default;
            list-style: none;
            padding-left: 0;
            li {
				display: inline-block;
                a {
					text-decoration: none;
					position: relative;
					display: block;
					width: 3em;
					height: 3em;
					border-radius: 100%;
					border: solid 1px #c8cccf;
					line-height: 3em;
					overflow: hidden;
					text-align: center;
					white-space: nowrap;
                    &:before {
						-moz-osx-font-smoothing: grayscale;
						-webkit-font-smoothing: antialiased;
						font-family: FontAwesome;
						font-style: normal;
						font-weight: normal;
						text-transform: none !important;
                        color: #ffffff;
						text-shadow: 1.25px 0px 0px #c8cccf, -1.25px 0px 0px #c8cccf, 0px 1.25px 0px #c8cccf, 0px -1.25px 0px #c8cccf;
					}
                    &:hover:before {
						text-shadow: 1.25px 0px 0px #ff7496, -1.25px 0px 0px #ff7496, 0px 1.25px 0px #ff7496, 0px -1.25px 0px #ff7496;
					}
                    &:hover {
                        border-color: #ff7496;
                        color:#ff7496;
                        -webkit-transition: all 0.3s ease-in-out;
                        transition: all 0.3s ease-in-out;
                    }
                    i {
                        font-size: 20px;
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        line-height: 42px;
                        border-radius: 42px;
                        color: rgba(0, 0, 0, 0.5);
                        -webkit-transition: all 0.3s ease-in-out;
                        transition: all 0.3s ease-in-out;
                        font-style: normal;
                        &:hover {
                            color:#ff7496;
                        }
                    }
                    
				}
			}
        }
	}
}

/* 搜索 */
.search {
    position: relative;
    min-height: 36px;
    padding: 5px;
    margin-bottom: 10px;
    input {
        border: none !important;
        padding-left: 10px;
        padding-right: 35px;
        height: 38px;
        line-height: 1.3;
        line-height: 38px\9;
        border-width: 1px;
        border-style: solid;
        background-color: #fff;
        border-radius: 2px;
        &:focus {
            border: 1px solid #0099ff !important;
        }
    }
    i {
        font-weight: bold;
        color: #d0d0d0;
        font-size: 25px;
        position: absolute;
        right: 12px;
        z-index: 1;
        -moz-transition: all 1s ease;
        -webkit-transition: all 1s ease;
        transition: all 1s ease;
        &:hover {
            cursor: pointer;
            color: #999;
            font-size: 27px;
        }
    }
}
.search-border {
    border: 2px solid #659ffd;
}

/* 热门文章 */
.hot-list-article {
    li {
        display: block;
        line-height: 32px;
        position: relative;
        margin: 3px 0;
        counter-increment: nums;
        padding-left: 30px;
        overflow: hidden;
        word-wrap: normal!important;
        white-space: nowrap;
        text-overflow: ellipsis;
        a {
            color: #787977;
            &:hover {
                text-decoration: underline;
                color: #6bc30d;
            }
        }
        &:before {
            width: 22px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            content: counter(nums,decimal);
            position: absolute;
            left: 0;
            top: 5px;
            border-radius: 100%;
            background-color: #edefee;
            text-shadow: 0 1px 0 rgba(255,255,255,.5);
            font-family: SourceCodeProRegular,Menlo,Monaco,Consolas,"Courier New",monospace,'Helvetica Neue',Arial,sans-serif;
        }
        &:first-child {
            &:before {
                background-color: #e24d46;
            }
        }
        &:nth-child(2):before {
            background-color: #2ea7e0;
        }
        &:nth-child(3):before {
            background-color: #6bc30d;
        }
    }
}
.hot-list-article li:first-child:before,.hot-list-article li:nth-child(2):before,.hot-list-article li:nth-child(3):before {
    color: #fff;
    text-shadow: none;
}

/* 最近访客 */
.vistor {
    text-align: center;
    dd {
        position: relative;
        width: 60px;
        height: 65px;
        margin: 10px 10px 0 0;
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        a {
            img {
                width: 60px;
                height: 60px;
                border-radius: 2px;
            }
            cite {
                position: absolute;
                bottom: 5px;
                left: 0;
                width: 100%;
                height: 20px;
                line-height: 20px;
                text-align: center;
                background-color: rgba(0,0,0,.2);
                color: #fff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}

.col-other {
    .other-item {
        &.fixed {
            position: fixed;
            width: 300px;
            margin-top: 0;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation-name: bounceInDown;
            animation-name: bounceInDown;
        }
    }
    .search {
        &.fixed {
            top: 80px;
        }
    }
    .tag-cloud {
        &.fixed {
            top: 140px;
        }
    }
}
.wechatimg {
    width: 121px;
    height: 121px;
}
</style>