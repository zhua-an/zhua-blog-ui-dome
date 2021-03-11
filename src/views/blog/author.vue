<template>
    <div>
        <blog-top></blog-top>
        <side-bar :data="website.sideBar"></side-bar>
        <div class="page-container">
            <div class="section">
                <div class="page about">
                    <div class="about-body">
                        <div class="title">
                            <el-divider content-position="center" data-aos="zoom-in"><span class="message-divider">子华er</span></el-divider>
                            <p data-aos="fade-right">
                                一个从 C/C++ 转行为 JAVA 的90后搬砖工。
                            </p>
                            <p class="author-location text-center" data-aos="fade-left">
                                <i class="el-icon-map-location"></i>中国-山东-青岛市-黄岛区
                            </p>
                        </div>
                        <div class="contact text-center" data-aos="zoom-out">
                            <a :href="'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=' + website.blogger.qq" target="_blank">
                                <i class="iconfont icon-qq"></i>
                            </a>
                            <el-tooltip class="item" effect="light" placement="right">
                                <div slot="content" class="wechatimg"><img src="../../assets/img/code/wx.jpg"/></div>
                                <a href="#">
                                    <i class="iconfont icon-weixin"></i>
                                </a>
                            </el-tooltip>
                            <a href="#">
                                <i class="iconfont icon-meiwen"></i>
                            </a>
                            <a :href="'mailto:' + website.blogger.email">
                                <i class="iconfont icon-mail"></i>
                            </a>
                        </div>
                        <el-divider></el-divider>
                        <div class="introduce-box">
                            <div class="text-center introduce-title">简介</div>
                            <div class="field-box">
                                <el-row :gutter="20">
                                    <el-col :md="20" :sm="24" :xs="24" data-aos="fade-right">
                                        <h1>个人信息</h1>
                                        <p>产品名称：子华er</p>
                                        <p>规格：长≈1.78m，净重≈65KG，误差范围±1.5%，数据仅供参考，一切以实物为准</p>
                                        <p>产品成分：水约60%，碳水化合物以及脂肪约14%，蛋白质约17%，其他维生素、矿物质、纤维素约9%。</p>
                                        <p>原产地：Made in China</p>
                                        <p>生产批次：90后</p>
                                        <p>保质期：长期有效</p>
                                        <p>等级：特级</p>
                                        <p>外部包装：原装原配，无拆无修</p>
                                        <p>产品介绍：猿界小菜鸡，性别男，爱好女，产品已通过国家质量体系认证，手续齐全，稳定运转二十余年不宕机。</p>
                                        <p>功能：我们不生产代码，我们只是代码的搬运工。尽量不生产BUG，非可控因素除外</p>
                                        <p>适用人群：老少咸宜</p>
                                        <p>注意事项：以上信息，最终解释权归厂家所有。</p>
                                    </el-col>
                                    <el-col :md="4" :sm="24" :xs="24" data-aos="fade-left">
                                        <div class="pic-box">
                                            <div class="self-pic">
                                                <img src="../../assets/img/bg/author01.jpg"/>
                                            </div>
                                            <!-- <div class="self-pic sunglass"></div>
                                            <div class="self-pic moto"></div> -->
                                        </div>
                                    </el-col>
                                </el-row>
                                <!-- <el-row :gutter="20">
                                    <el-col :md="8" :sm="24" :xs="24" data-aos="fade-right">
                                        <div class="pic-box">
                                            <div class="self-pic sunglass"></div>
                                            <div class="self-pic moto"></div>
                                        </div>
                                    </el-col>
                                    <el-col :md="16" :sm="24" :xs="24" data-aos="fade-left">
                                        <h1>个人介绍</h1>
                                        <p>
                                            因为爱好促使我选择了计算机专业，也正因为爱好使得了原本枯燥无味的代码增加了两分趣味。
                                            建立博客的目的是想记录自己学习过程中遇到的问题，自己在闲暇之余喜欢练练字，因为练字能使人静下心来远离喧嚣以及内心的浮躁，把练字当做一种放松的方式也算是一种享受。
                                            个人平时喜欢独处，相比于集体环境，我更倾向于独立生活。每个人来到这个世界都是独自来的，所以孤独是一个人的生命本质，学会独处，实际上那是在去学习生命最本质的东西。
                                            独处会让我们有充分的时间思考、完善、精细自己的一切，规划生活的快慢；独处能使人认清自己有多少能量，哪些可为哪些不可为，切实踏实地面对生活学习，一步一个脚印走好每一步。
                                            而思考总是在孤独中产生的，有时候一个人沉思的孤独，看似很心酸，实则更为强大。没有人生来强大，遥远的梦，遥远的你，与其空怀揣梦想，还不如付之行动。
                                            一个人青春的保质期不长，我不想以后为自己的碌碌无为而悔恨，为自己的平庸无奇而懊恼，只要还有梦就应该勇敢去追寻。
                                            优秀的人很多，只有高度自律，才能使自己变得优秀，希望有一天我也能活出自己所期待的样子。像福尔摩斯一样，穿梭街巷观察平时注意不到的细节，
                                            寻觅潜藏在生活里的魔法钥匙。仰望头顶总能见到那盏高悬的月亮，再黯淡的星光也闪烁着来自银河的诗意在流浪，从生活的边角，到远方的故乡。
                                            后来许多人问我一个人夜晚踟蹰路上的心情，我想起的却不是孤单和路长，而是波澜壮阔的海洋和天空中闪耀的星光...
                                        </p>
                                    </el-col>
                                </el-row> -->
                                <h1>个人介绍</h1>
                                <p>
                                    因为无知我高考志愿填写了计算机专业，当时真不知道想填写啥，也对计算机专业毫无了解，也正因为无知，我在这条不归路上越走越深，不过我并不后悔我选择了计算机专业，
                                    因为他充实了我的大学生活，他让我很荣幸了入选学校ACM集训队，期间参加了严酷的训练，结识了很多优秀的前辈和同窗好友，我们带着成果参加了各种各样的比赛，
                                    也取得了不错的成绩以及奖励，感谢你们以及敬爱的肖老师陪伴了我的大学时光，让我的大学不会浑浑噩噩、虚度光阴。牛顿曾经说过，我之所以看得远，是因为我站在巨人的肩膀上。
                                    既然上天未选中我做个天才，那我只有踏踏实实、本本分分的做个普通人，多学习，多研究别人优秀的作品，加以改造，为我所用O(∩_∩)O。人生有限，我不想以后为自己的碌碌无为而悔恨，
                                    为自己的平庸无奇而懊恼，希望有一天我也能活出自己所期待的样子。勿忘初心，方得始终，等我老了，抬头仰望那广阔无限的浩瀚星海，回想过去，无论成果怎样，至少我曾经努力过、追寻过...
                                </p>
                            </div>
                        </div>
                        <div class="skill-box">
                            <div class="text-center skill-title">技能</div>
                            <div class="field-box">
                                <el-row :gutter="30">
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>Html</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="80" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>jsp</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="80" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>vue</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="70" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>CSS</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="70" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>jQuery</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="85" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>JS</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="80" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>Servlet</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="90" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>java</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="90" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>My SQL/Oracle</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="80" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>Spring/Spring MVC/SpringBoot</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="80" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>Spring Cloud</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="60" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>Docker/Docker Swarm</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="60" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>Struts2</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="80" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>Hiberate</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="80" :color="progressColor"></el-progress>
                                    </el-col>
                                    <el-col class="progress" :md="8" :sm="12" :xs="24" data-aos="zoom-in">
                                        <p>Mybatis/Mybatis Plus</p>
                                        <el-progress :show-text="false" :stroke-width="22" :percentage="80" :color="progressColor"></el-progress>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <h1 class="text-center about-end" data-aos="fade-up">The End</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import BlogTop from '@/components/blog/blog-top'
import SideBar from '@/components/side-bar/main'
export default {
    name: 'author',
    components: {
        BlogTop,
        SideBar
    },
    data() {
        return {}
    },
	computed: {
		...mapGetters(["website"])
	},
    mounted() {
    },
    methods: {
        progressColor() {
            return "rgb(" +
            Math.round(255 * Math.random()) +
            "," +
            Math.round(255 * Math.random()) +
            "," +
            Math.round(255 * Math.random()) +
            ")"
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
    padding:0 20px;
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
.author-location {
    font-weight: 500;
    font-size: 1.2em;
    color: #808080;
    margin-bottom: 25px;
    .el-icon-map-location {
        margin-right: 5px;
    }
}
/* 联系 */
.contact {
    text-align: center;
    padding-top: 35px;
    a {
        margin: 0 15px;
        .iconfont {
            font-size: 2.5em;
        }
    }
    i {
        color: black;
        &:hover {
            color: rgba(0, 0, 0, 0.5);
        }
    }
}

/* 简介 */
.introduce-box {
    margin-top: 30px;
    margin-bottom: 20px;
    .introduce-title {
        margin-top: 30px;
        margin-bottom: 20px;
        font-weight: bold;
        font-size: 24px;
    }
    .field-box {
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
.about {
    .about-body {
        .pic-box {
            position: relative;
            height: 100%;
            width: 100%;
            padding-top: 30px;
            min-height: 500px;
        }
        .self-pic {
            max-width: 250px;
            max-height: 350px;
            // width: 150px;
            // height: 150px;
            border-radius: 5px;
        }
        .introduce-box {
            .sunglass {
                position: relative;
                left: 20px;
                top: 80px;
                background: url(~@/assets/img/bg/author01.jpg) no-repeat;
                background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                -webkit-background-size: cover;
            }
            .moto {
                position: relative;
                left: 120px;
                top: 150px;
                background: url(~@/assets/img/bg/bg01.jpg) no-repeat;
                background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                -webkit-background-size: cover;
            }
        }
    }
    .about-end {
        padding: 30px 0 50px;
        margin-bottom: 20px;
    }
}
.skill-box {
    margin-top: 30px;
    margin-bottom: 20px;
}

/* 技能 */
.skill-box {
    .skill-title {
        margin-top: 30px;
        margin-bottom: 20px;
        font-weight: bold;
        font-size: 24px;
    }
    .progress {
        padding-top: 30px;
        p {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }
}
.wechatimg {
    width: 121px;
    height: 121px;
}
/* 媒体查询 */
@media (max-width: 767px) {
    .pic-box {
        height: 1000px !important;
        width: 100%;
        padding: 10px;
    }
    .self-pic {
        width: 90% !important;
        height: 400px !important;
        border-radius: 5px;
    }
    .self-pic.sunglass {
        left: 20px !important;
    }
    .self-pic.moto {
        left: 20px !important;
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