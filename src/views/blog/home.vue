<template>
    <div>
        <div class="section" ref="section1" id="section1">
            <div class="fp-tablecell">
				<div class="media-cover"></div>
				<div class="slide-overlay-wrapper" style="background-color: rgba(0, 0, 0, 0.15);"></div>
                <div class="cover">
                    <div class="fp" data-aos="zoom-in" data-aos-duration="2000">
                        <h1>{{website.logo}}</h1>
                        <p>{{website.introduction}}</p>
                        <el-button type="primary" style="margin-top: 30px" round @click="clickEnter">Enter Blog</el-button>
                    </div>
                    <a class="next animated fadeInUp" @click="clickNext">
						<i class="el-icon-arrow-down"></i>
					</a>
                </div>
            </div>
        </div>
        <div class="section" id="section2">
            <div class="fp-tablecell">
                <div class="page page1">
                    <div class="warp-box">
                        <div class="new-article">
							<div class="inner" data-aos="fade-down">
                                <h1>热门文章</h1>
                                <p>
                                    今夜，为你执笔，却是词穷意长，千言万语，随这月色，洒满浩渺的夜空，
									<br>星光璀璨，点亮彼此的灵犀，一枚素笔，万千柔情，
									<br>起笔是问候，落笔是思念。
                                </p>
                            </div>
                        </div>
                        <el-row data-aos="fade-up">
                            <el-col v-for="(item,index) in articleData" :key="index" :xs=24 :sm=8 :md=8 style="padding: 0 10px">
                                <ArticleCard :data="item"></ArticleCard>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
		<div class="section" id="section3">
			<div class="fp-tablecell">
				<div class="page page2">
					<div class="warp-box">
						<div class="about">
							<div class="inner about-w3ls-info" data-aos="fade-down">
								<h3>每日物语</h3>
								<p v-html="dailyStory"></p>
								<el-button type="primary" data-aos="flip-left" @click="clickDailyStory">Read More</el-button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="messageData && messageData.length > 0" class="section" id="section4">
			<div class="fp-tablecell">
				<div class="page page3">
					<div class="warp-box">
						<div class="new-comment">
							<h3 class="tittle-wthree text-center">最近留言</h3>
							<el-carousel :interval="4000" type="card" data-aos="zoom-in">
								<el-carousel-item v-for="(item,index) in messageData" :key="index">
									<div class="testimonials-gd-vj">
										<p class="sub-test">
											<i class="iconfont icon-quotation__ea"></i>
											<span v-html="createEmoji(item.content)"></span>
											<i class="iconfont icon-quotation__ea1"></i>
										</p>
										<div class="user">
											<a href="#" target="_blank" rel="nofollow">
												<div>
													<el-avatar :src="item.commentatorAvatar">
														<img src="../../assets/img/avatar/woman.png"/>
													</el-avatar>
													<h5>{{item.commentator}}</h5>
												</div>
											</a>
										</div>
									</div>
								</el-carousel-item>
							</el-carousel>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section" id="section5" ref="section5">
			<div class="fp-tablecell">
				<div class="page page4">
					<div class="warp-box">
						<div id="statistics" class="bg-overlay">
							<div class="overlay"></div>
							<el-row class="text-center" data-aos="slide-right">
								<el-col :xs="12" :sm="6" :md="6">
									<i class="iconfont icon-dianzan"></i>
									<h4><countTo ref="likeCount" :endVal='likeCount'></countTo></h4>
									<p>网站点赞数量</p>
								</el-col>
								<el-col :xs="12" :sm="6" :md="6">
									<i class="iconfont icon-liuyan"></i>
									<h4><countTo ref="commentCount" :endVal='commentCount'></countTo></h4>
									<p>用户评论数量</p>
								</el-col>
								<el-col :xs="12" :sm="6" :md="6">
									<i class="iconfont icon-fangwen"></i>
									<h4><countTo ref="visitCount" :endVal='visitCount'></countTo></h4>
									<p>网站访问次数</p>
								</el-col>
								<el-col :xs="12" :sm="6" :md="6">
									<i class="iconfont icon-rili"></i>
									<h4><countTo ref="workingDay" :endVal='workingDay'></countTo></h4>
									<p>网站运行天数</p>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="visitors && visitors.length > 0" class="section" id="section6">
			<div class="fp-tablecell">
				<div class="page page5">
					<div class="warp-box">
						<div class="visitor">
							<h3 class="tittle-wthree text-center">近期访客</h3>
							<swiper :options="swiperOption" class="swiper" data-aos="flip-down">
								<swiper-slide v-for="(item, index) in visitors" :key="index">
									<a href="#" target="_blank" rel="nofollow">
										<el-avatar class="avatar" shape="square" :src="item.avatar" :size="50">
											<img src="../../assets/img/avatar/woman.png"/>
										</el-avatar>
										<h4 class="elip">{{item.userName}}</h4>
									</a>
								</swiper-slide>
								<div class="swiper-pagination" slot="pagination"></div>
							</swiper>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
//数字渐变
import CountTo from 'vue-count-to'
//图片轮询
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ArticleCard from '@/components/blog/article-card'
import {fetchHotArticle, fetchBlogStatistics, fetchDailyStory, fetchMessage, fetchVisitor} from '@/api/blog/blog'
import {getWindowHeight} from '@/util/util'
import { createIcon } from '@/components/emoji/utils/emoji'
export default {
	name: 'home',
	components: {
		ArticleCard,
		CountTo,
		swiper,
		swiperSlide
	},
    data() {
        return {
			windowHeight: 0,
			menuState: true,
			hotArticleSize: 6,
			dailyStory: '',
			articleData: [],
			messageData: [],
			likeCount: 0,
			commentCount: 0,
			visitCount: 0,
			workingDay: 0,
			visitors: [],
			swiperOption: {
				pagination: {
					el: '.swiper-pagination',
					clickable: true,//此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
					dynamicBullets: true,//动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
				},
				autoplay: {
					delay: 3000,
					disableOnInteraction: false // 手动切换之后继续自动轮播
				},
				freeMode: true,//free 模式 / 不贴合边缘
				initialSlide: 0,//设定初始化时slide的索引
				grabCursor: true,//设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。
				slidesPerView: 15,//设置slider容器能够同时显示的slides数量(carousel模式)。
				centeredSlides: true,//设定为true时，active slide会居中，而不是默认状态下的居左。
				breakpoints: { //根据屏幕宽度设置某参数为不同的值
					//当宽度小于等于
					568: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 5,
					},
					1023: {
						slidesPerView: 7,
					}
				},
				loop: false
			}
        }
    },
    mounted() {
		this.windowHeight = getWindowHeight()
		this.getHotArticle()
		this.getDailyStory()
		this.getMessage()
		this.getVisitor()
		window.addEventListener('scroll', this.handleScroll)
	},
	created() {
		this.getBlogStatistics()
	},
	computed: {
		...mapGetters(["website"])
	},
    methods: {
		handleScroll() {
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				let objBottom = this.$refs.section5.getBoundingClientRect().bottom
				if(objBottom < this.windowHeight && objBottom > 0) {
					this.$refs.likeCount.start()
					this.$refs.commentCount.start()
					this.$refs.visitCount.start()
					this.$refs.workingDay.start()
				}
			},1000)
		},
		getHotArticle() {
			fetchHotArticle({size: this.hotArticleSize}).then(res => {
				this.articleData = res.data.data
				
			})
		},
		getDailyStory() {
			fetchDailyStory({current: 1, size: 1}).then(res => {
				if(res.data.data.records && res.data.data.records.length > 0) {
					this.dailyStory = res.data.data.records[0].content
				}
			})
		},
		getMessage() {
			fetchMessage({current: 1, size: 20, type: '4'}).then(res => {
				if(res.data.data.records && res.data.data.records.length > 0) {
					this.messageData = res.data.data.records
				}
			})
		},
		createEmoji(val) {
			if(!val) {
				return ''
			}
			//return val.replace(/:.*?:/g, createIcon)
			return val.replace(/:[0-9a-z_-]{1,}:/g, createIcon)
        },
		getBlogStatistics() {
			fetchBlogStatistics().then(res => {
				this.likeCount = res.data.data.likeCount
				this.commentCount = res.data.data.commentCount
				this.visitCount = res.data.data.visitCount
				this.workingDay = res.data.data.workingDay
			})
		},
		getVisitor() {
			fetchVisitor({current: 1, size: 15}).then(res => {
				if(res.data.data.records && res.data.data.records.length > 0) {
					this.visitors = res.data.data.records
				}
			})
		},
		clickDailyStory() {
			this.$router.push({ name: 'heartFeelings' })
		},
		clickAbout() {
			this.$router.push({ name: 'about' })
		},
		clickEnter() {
			this.$router.push({ name: 'hirofumi' })
		},
        clickNext() {
			this.$nextTick(() => {
				document.querySelector('#section2').scrollIntoView({ behavior: 'smooth' });
			})
		}
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll)
	}
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/blog/blog-common.scss';
@import '../../assets/styles/blog/home.scss';
</style>