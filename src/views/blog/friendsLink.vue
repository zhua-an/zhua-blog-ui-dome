<template>
    <div>
        <blog-top></blog-top>
        <side-bar :data="website.sideBar"></side-bar>
        <div class="page-container">
            <div class="section">
                <div class="page">
                    <div class="explain" data-aos="zoom-in">
                        <div class="title">
                            <el-divider content-position="center"><span class="message-divider">友链申请</span></el-divider>
                        </div>
                        <div class="explain-field-box">
                            <p>本站欢迎交换友链，如需交换链接请在
                                <router-link :to="{name: 'message'}">
                                    留言板
                                </router-link>
                                留言，博主不定期对友链进行互动访问。</p>
                            <h1>申请格式</h1>
                            <div class="format">
                                <p><span>名称：</span>{{website.title}}</p>
                                <p><span>网址：</span>{{website.link}}</p>
                                <p><span>图标：</span>{{website.favicon}}</p>
                                <p><span>描述：</span>{{website.introduction}}</p>
                            </div>
                            <h1>申请要求</h1>
                            <div class="demand text-bold">
                                <i class="el-icon-check"></i><span>原创优先</span>
                                <i class="el-icon-check"></i><span>技术优先</span>
                                <i class="el-icon-close"></i><span>经常宕机</span>
                                <i class="el-icon-close"></i><span>不合法规</span>
                                <i class="el-icon-close"></i><span>插边球站</span>
                                <i class="el-icon-close"></i><span>红标报毒</span>
                            </div>
                            <p>希望您在申请本站友链之前请先做好本站链接，申请提交后若无其它额外因素将于72小时内审核，如超过时间还未通过，请私信我。</p>
                            <p>注意本站会不定期清理违规友链，如果检测到该链接已无法正常访问，本站依然会为您保留30天恢复期，逾期则剔除该链接。</p>
                            <p></p>
                            <h1 class="text-center">The End</h1>
                        </div>
                    </div>
                    <div class="link-big-box" data-aos="fade-up">
                        <el-divider></el-divider>
                        <el-row :gutter="10">
                            <el-col v-for="(item,index) in data" :key="index" :md="6" :sm="12" :xs="24">
                                <a target="_blank" :href="item.link">
                                    <div class="link-box">
                                        <el-row>
                                            <el-col :span="24">
                                                <img alt="" :src="item.favicon">
                                            </el-col>
                                        </el-row>
                                        <div class="text-center">
                                            <h3>{{item.name}}</h3>
                                            <p>{{item.introduction}}</p>
                                        </div>
                                    </div>
                                </a>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import BlogTop from '@/components/blog/blog-top'
import {fetchFriendsLink} from '@/api/blog/blog'
import SideBar from '@/components/side-bar/main'
export default {
    name: 'friendsLink',
    components: {
        BlogTop,
        SideBar
    },
    data() {
        return {
            data: []
        }
    },
	computed: {
		...mapGetters(["website"])
	},
    mounted() {
        this.init()
    },
    methods: {
        init() {
            fetchFriendsLink().then(res => {
                this.data = res.data.data
			})
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/blog/blog-common.scss';
a {
    color: indianred;
}
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
    height: 50px;
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
/* 说明 */
.explain {
    .explain-field-box {
        margin-bottom: 5px;
        h1 {
            font-weight: bold;
            font-size: 20px;
            text-align: left;
        }
        p {
            margin: 5px 0;
            font-size: 14px;
            text-align: left;
            text-indent: 2em;
            line-height: 23px;
            color: #333;
        }
    }
}
.format {
    margin-bottom: 10px;
    span {
        color: #000;
        font-weight: 400;
    }
}
.demand {
    text-indent: 2em;
    padding: 7px 0 5px 5px;
    font-size: 1em;
    color: #777;
    .i {
        margin-right: 2px;
        position: relative;
        top: 1px;
    }
    .el-icon-check {
        color: #5fb878;
    }
    .el-icon-close {
        color: red;
    }
    span {
        margin-right: 10px;
        &:last-child {
            margin-right: 0px;
        }
    }
}
h1 {
    &.text-center {
        margin-top: 20px;
    }
}

/* 链接盒子 */
.link-big-box {
    margin-top: 30px;
    a {
        color: #888;
        font-weight: 500;
        -webkit-transition: all 0.8s;
        -o-transition: all 0.8s;
        -moz-transition: all 0.8s;
        -ms-transition: all 0.8s;
        transition: all 0.8s;
        &:hover {
            .link-box {
                position: relative;
                top: -7px;
                color: #666;
                &:before {
                    width: 100%;
                    height: 100%;
                    transition: width 0.2s ease-in,height 0.2s ease-in 0.2s;
                    border-top-color: rgba(47,64,86,0.1);
                    border-right-color: rgba(47,64,86,0.1);
                    border-radius: 10px;
                }
                &:after {
                    width: 100%;
                    height: 100%;
                    transition: border-color 0s ease-in 0.4s,width 0.2s ease-in 0.4s,height 0.3s ease-in 0.6s;
                    border-bottom-color: rgba(47,64,86,0.1);
                    border-left-color: rgba(47,64,86,0.1);
                    border-radius: 10px;
                }
            }
        }
    }
}
.link-box {
    margin-top: 10px;
    position: relative;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    -o-box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    -ms-box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    &:before {
        top: 0;
        left: 0;
        transition: border-color 0s ease-in 0.8s,width 0.2s ease-in 0.6s,height 0.2s ease-in 0.4s;
    }
    &:after {
        right: 0;
        bottom: 0;
        transition: border-color 0s ease-in 0.4s,width 0.2s ease-in 0.2s,height 0.2s ease-in;
    }
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        transition: transform 1s ease-out;
        -webkit-transition: -webkit-transform 1s ease-out;
        -moz-transition: -moz-transform 1s ease-out;
        -o-transition: -o-transform 1s ease-out;
        -ms-transition: -ms-transform 1s ease-out;
    }
    h3 {
        margin: 5px auto;
        font-weight: bold;
        line-height: 22px;
    }
    div {
        p {
            height: 22px;
        }
    }
}
.link-box:before, .link-box:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 2px solid transparent;
    box-sizing: border-box;
    position: absolute;
}
@media (max-width: 415px) {
    .title .message-divider {
        font-size: 1.8em;
    }
}
@media (max-width: 376px) {
    .title .message-divider {
        font-size: 1.6em;
    }
}
</style>