<template>
    <div class="header">
        <div v-if="searchVisible">
            <div class="js-search search-form search-form--modal" :class="{'is-visible': searchState}">
                <div class="search-form__inner">
                    <div>
                        <div id="search-container" class="ajax_search">
                            <div id="searchform">
                                <div class="filter_container">
									<input type="text" v-model="searchVal" autocomplete="off" placeholder="Type then select or enter" name="s" id="search-input" @keyup.enter.stop="search"/>
                                    <ul id="search_filtered" class="search_filtered"></ul>
                                </div>
                                <input type="submit" name="submit" id="searchsubmit" class="searchsubmit" value="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hebin animated fadeInDown">
                <i class="iconfont icon-search js-toggle-search" @click="searchState = !searchState"></i>
            </div>
        </div>
        
        <div class="navi animated fadeInDown" :class="{open:menuVisible,close:!menuVisible}">
            <div class="bt-nav hover_animation" v-on:click.stop="clickMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
			<div class="navbar blog-ani fadeInRight">
				<div class="inner">
					<nav id="site-navigation" class="main-navigation">
						<div id="main-menu" class="main-menu-container">
							<div class="menu-menu-container">
								<ul id="primary-menu" class="menu">
									<template v-for="(link,index) in menuLinks">
										<template v-if="link.children && link.children.length > 0">
											<li :key="index" :id="'menu-item-'+index" class="menu-item menu-item-type-post_type menu-item-object-page"
												:class="['menu-item-'+index, link.id == isActive?'current-menu-item':'', link.id == isActive?'current_page_item':'']"
												>
												<span class="menu-dropdown" @click="clickMenuDropdown($event)">
													<i class="iconfont icon-down"></i>
												</span>
												<!-- <router-link :to="link.path">{{link.linkName}}</router-link> -->
												<a href="javascript:void(0)">{{link.linkName}}</a>
												<ul class="sub-menu">
													<li v-for="(sub,index) in link.children" :key="'sub-'+index" :id="'menu-item-sub-'+index" 
													class="menu-item menu-item-type-taxonomy menu-item-object-category"
													:class="'menu-item-sub-'+index"
													>
														<router-link :to="{path: sub.path, params: {p : sub.linkName }}">{{sub.linkName}}</router-link>
													</li>
												</ul>
											</li>
										</template>
										<template v-else>
											<li :key="index" :id="'menu-item-'+index" class="menu-item menu-item-type-post_type menu-item-object-page"
											:class="['menu-item-'+index, link.id == isActive?'current-menu-item':'', link.id == isActive?'current_page_item':'']"
											>
												<router-link :to="link.path">{{link.linkName}}</router-link>
											</li>
										</template>
									</template>
									<!-- <li id="menu-item-17" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-17">
										<a href="home.html">首页</a>
									</li>
									<li id="menu-item-173" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-173">
										<a href="hirofumi.html">博文</a>
									</li>
									<li id="menu-item-78" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-78">
										<a href="bellesLettres.html">美文</a>
									</li>
									<li id="menu-item-252" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-252">
										<span class="menu-dropdown" @click="clickMenuDropdown($event)">
											<i class="iconfont icon-down"></i>
										</span>
										<a href="archives.html">干货</a>
										<ul class="sub-menu">
											<li id="menu-item-165" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-165">
												<a href="">theme</a>
											</li>
											<li id="menu-item-163" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-163">
												<a href="">Happen</a>
											</li>
										</ul>
									</li>
									<li id="menu-item-79" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-79">
										<a href="heartFeelings.html">心语</a>
									</li>
									<li id="menu-item-57" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-57">
										<a href="message.html">留言</a>
									</li>
									<li id="menu-item-58" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-58">
										<a href="friendsLink.html">友链</a>
									</li>
									<li id="menu-item-59" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-59">
										<a href="update.html">更新</a>
									</li>
									<li id="menu-item-60" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-60">
										<a href="about.html">关于</a>
									</li> -->
								</ul>
							</div>
						</div>
					</nav>
					<!-- #site-navigation -->
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import {hasClass, addClass, removeClass} from '@/util/util'
export default {
    name: 'blogHeader',
    props: {
        searchVisible: {
            type: Boolean,
            default: true
        },
        menuState: {
            type: Boolean,
            default: true
        },
        menuLinks: {
            type: Array,
            default: () => {
                return []
            }
		},
		isActive: {
			type: String,
            default: ""
		}
    },
    data() {
        return {
			searchVal: "",
			searchState: false,
			menuVisible: true
        }
	},
	mounted() {
		this.menuVisible = !this.menuState
	},
    methods: {
		clickMenu() {
			this.menuVisible = !this.menuVisible
		},
		clickMenuDropdown(e) {
			let obj = e.currentTarget.parentElement
			let cls = "open-page-item"
			if(hasClass(obj,cls)){  
				removeClass(obj, cls);  
			}else{  
				addClass(obj, cls);  
			}  
		},
        search() {
            this.$emit("search",this.searchVal)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/blog/blog-common.scss';
.header {
	// width: 100%;
	min-height: 60px;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 998;
	background-color: transparent;
	// border-bottom: 1px solid #e8e9e7;
}
.hebin {
	position: absolute;
	z-index: 998;
	top: 2.5em;
    left: 3em;
    i {
        font-size: 30px;
        line-height: 30px;
        margin-right: 20px
    }
}
.js-toggle-search {
    height: 35px;
	width: 35px;
	color: rgba(255, 255, 255, 1);
	float: left;
	display: inline;
	-webkit-transition: all 500ms ease-in-out;
    transition: all 500ms ease-in-out;
    &:hover {
        cursor: pointer;
        color: #666
    }
}
.ajax_search .search_filtered a {
	display: block;
	font-size: 15px;
	color: rgba(2, 0, 0, .6);
	overflow: hidden;
	padding: 10px;
	text-overflow: ellipsis;
	white-space: nowrap
}

.ajax_search .search_filtered {
	background-color: rgba(255, 255, 255, 0.95);
	border-radius: 30px;
	width: 600px;
	left: 0;
	position: absolute;
	text-align: center;
	top: 102%;
	z-index: 200
}

#searchsubmit {
	display: none
}

.ajax_search .search_filtered a:after {
	border-bottom: 1px solid #3ea9be;
	content: "";
	display: block;
	margin: 0.25em auto 0;
	transition: width 250ms ease-in-out 0s;
	width: 0
}

.ajax_search .search_filtered a:hover:after {
	transition: width 100ms ease-in-out 0s;
	width: 50%
}

.ajax_search .search_filtered a:focus {
	border: none;
	font-weight: bold;
	text-decoration: none;
	outline: none
}
.search-form--modal {
	-webkit-transition: visibility 0.25s ease, opacity 0.25s ease;
	-moz-transition: visibility 0.25s ease, opacity 0.25s ease;
	-ms-transition: visibility 0.25s ease, opacity 0.25s ease;
	-o-transition: visibility 0.25s ease, opacity 0.25s ease;
	transition: visibility 0.25s ease, opacity 0.25s ease;
	overflow: hidden;
	z-index: 998;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	height: auto;
	background: rgba(0, 0, 0, 0.3);
	visibility: hidden;
	opacity: 0
}

.search-form--modal .search-form__inner {
	max-width: 640px;
	padding: 0 20px;
	margin: 0 auto;
	position: fixed;
	width: 100%;
	left: 0;
	right: 0;
	top: 1.5em;
	bottom: 0
}

.search-form.is-visible {
	visibility: visible;
	opacity: 1
}

.search-form div {
	position: relative
}

.search-form input {
	text-align: center;
	font-family: PingFang SC, "Hiragino Sans GB", "Source Han Sans CN", Roboto, "Microsoft Yahei", sans-serif;
	font-size: 24px;
	font-size: 1.5rem;
	background: rgba(255, 255, 255, 0.6);
	color: #fff;
	padding: 12px 0;
	width: 100%;
	border-radius: 50px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box
}

.search-form input::-webkit-input-placeholder {
	color: #fff
}

.search-form input:-moz-placeholder {
	color: #fff
}

.search-form input::-moz-placeholder {
	color: #fff
}

.search-form input:-ms-input-placeholder {
	color: #fff
}

input {
	line-height: normal
}

input[type="checkbox"],
input[type="radio"] {
	box-sizing: border-box;
	padding: 0
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	height: auto
}

input[type="search"] {
	-webkit-appearance: textfield;
	-moz-box-sizing: content-box;
	-webkit-box-sizing: content-box;
	box-sizing: content-box
}

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
	-webkit-appearance: none
}
/* 菜单开始 */
.navi {
    position: absolute;
    right: 0;
    z-index: 999;
}
.navbar {
	position: fixed;
    right: 0;
    top: 2em;
    float: right;
    // margin-top: 40px;
    padding-right: 90px;
    ul {
        li {
            &.current-menu-ancestor {
                & > a {
                    // color: #bebbaa;
                    color: #7bbff9;
                }
            }
            &.current-menu-item {
                & > a {
                    color: #7bbff9;
                }
            }
        }
    }
}
.open {
    .navbar {
        display: none;
    }
    span {
        &:first-child {
            margin-top: 10px;
        }
    }
}
.close {
    .navbar {
        display: block;
    }
    .bt-nav {
        span {
            margin-top: 0;
            &:first-child {
                margin-top: 18px;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                -webkit-transition: all .5s;
                -moz-transition: all .5s;
                -ms-transition: all .5s;
                -o-transition: all .5s;
                transition: all .5s;
            }
            &:last-child {
                display: none;
            }
            &:nth-of-type(2) {
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
                margin-top: -2px;
                -webkit-transition: all .5s;
                -moz-transition: all .5s;
                -ms-transition: all .5s;
                -o-transition: all .5s;
                transition: all .5s;
            }
        }
    }
}
.main-navigation a::after,
.main-navigation a::before {
    display: inline-block;
    opacity: 0;
    -webkit-transition: -webkit-transform .3s, opacity .2s;
    -moz-transition: -moz-transform .3s, opacity .2s;
    transition: transform .3s, opacity .2s;
}
.main-navigation {
    padding: 0;
    -webkit-transition: right .4s ease 0s;
    -moz-transition: right .4s ease 0s;
    -ms-transition: right .4s ease 0s;
    -o-transition: right .4s ease 0s;
    transition: right .4s ease 0s;
    a {
        display: block;
        text-decoration: none;
        &::before {
            margin-right: 5px;
            content: '[';
            -webkit-transform: translateX(20px);
            -moz-transform: translateX(20px);
            transform: translateX(20px);
        }
        &::after {
            margin-left: 5px;
            content: ']';
            -webkit-transform: translateX(-20px);
            -moz-transform: translateX(-20px);
            transform: translateX(-20px);
        }
    }
    ul {
        display: block;
        margin: 0;
        padding-left: 0;
        list-style: none;
        ul {
            position: absolute;
            top: 40px;
            z-index: 999;
            display: none;
            background-color: #fff;
            border-radius: 3px;
            &:before {
                z-index: 0;
                content: "";
                position: absolute;
                top: -8px;
                right: 28px;
                border-style: solid;
                border-width: 0 10px 10px 10px;
                border-color: transparent transparent #fff transparent;
                transform: rotate(360deg);
                -webkit-transform: rotate(360deg);
            }
            ul {
                bottom: 0;
            }
            li {
                float: none;
                display: block;
                width: 100%;
                &:hover {
                    background-color: rgba(0, 0, 0, .02);
                }
            }
            a {
                color: rgba(2, 0, 0, .6);
                float: none;
                padding: 15px 25px 15px 20px;
                width: 100%;
                min-width: 190px;
                box-shadow: 0 1px 0 rgba(0, 0, 0, .03);
                text-align: left;
                white-space: nowrap;
            }
        }
    }
    li {
        // color: #7bbff9;
        color: #fff;
        position: relative;
        float: left;
        margin: 0;
        a {
            color: inherit;
            font-weight: bold;
            padding: 5px 10px;
            span {
                display: none;
            }
        }
    }
}
.main-navigation a:focus::after,
.main-navigation a:focus::before,
.main-navigation a:hover::after,
.main-navigation a:hover::before {
    opacity: 1;
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    transform: translateX(0);
}
.main-navigation ul ul a.focus,
.main-navigation ul ul a:hover {
    color: #666;
}
.main-navigation ul li.focus>ul,
.main-navigation ul li:hover>ul {
    right: 0;
    display: block;
}
.main-navigation ul ul li.focus>ul,
.main-navigation ul ul li:hover>ul {
    right: 100%;
    display: block;
}
.main-navigation.toggled ul,
.menu-toggle {
    display: block;
}
.header-menu-button {
    display: none;
}
.menu-dropdown {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 9;
    display: none;
    margin: 0;
    padding: 10px 14px;
    height: 35px;
    text-align: center;
    font-size: 14px;
    line-height: 15px;
    cursor: pointer;
    .iconfont {
        font-family: "iconfont" !important;
        font-size: 22px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale
    }
}
.open-page-item>ul.children,
.open-page-item>ul.sub-menu {
    display: block!important;
}
#main-menu>div,
#primary-menu {
    float: left;
}
.bt-nav {
    position: fixed;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    right: 3em;
    top: 2em;
    cursor: pointer;
    background-color: rgba(0,0,0,.1);
    overflow: hidden;
    z-index: 102;
    &:hover {
        background: #6bc30d;
    }
    span {
        display: block;
        background: #fff;
        width: 26px;
        height: 2px;
        line-height: 10px;
        margin: 0 auto;
        margin-top: 5px;
    }
}
.open span:first-child,.open span:last-child,.open span:nth-last-of-type(2) {
    -webkit-transform: rotate(0);
    transform: rotate(0);
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
}
.hover_animation {
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
}
/** 菜单结束 */
@media (max-width: 760px) {
    body {
		font-family: -apple-system, BlinkMacSystemFont, opensans, Optima, "Microsoft Yahei", sans-serif;
    }
    #primary-menu {
		display: block;
		float: none
	}
	.navi {
		position: fixed;
		height: 100%;
		text-align: center
	}
	.navbar {
		float: right;
		margin-top: 0;
		padding-right: 0
	}
	.bt-nav {
		right: 1em;
		top: 1em
	}
	.bt-nav.scrolled {
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		-webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .15);
		-moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .15);
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .15)
	}
	.bt-nav.scrolled .line {
		width: 5px;
		height: 5px;
		margin-left: -3px
	}
	.hebin {
		top: 1.5em;
		left: 1em
	}
	.search-form--modal {
		height: 100%
	}
	.search-form--modal .search-form__inner {
		text-align: left;
		position: absolute;
		left: 0;
		right: 0;
		height: 55px;
		top: 5em!important;
		bottom: 0
	}
	.ajax_search .search_filtered {
		width: 100%!important
	}
	.search-form div {
		position: relative
	}
	.search-form input {
		font-size: 24px;
		font-size: 1.5rem;
		color: #ddd;
		background: #eee;
		width: 100%
	}
	.close .navbar {
		display: block;
		height: 100%;
		background: #333
	}
	.main-navigation ul ul:before {
		display: none
	}
	.inner {
		overflow: auto;
		max-height: 100%;
		padding: 5em 0 0 0
	}
	.menu-dropdown {
		display: block
	}
	#main-menu>div {
		display: block;
		float: none
	}
	.main-navigation #main-menu {
		color: #FFF;
		width: 280px;
		-ms-box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		z-index: 999;
		height: 100%;
		overflow: auto;
		-webkit-transition: right .4s ease 0s;
		-moz-transition: right .4s ease 0s;
		-ms-transition: right .4s ease 0s;
		-o-transition: right .4s ease 0s;
		transition: right .4s ease 0s
	}
	.main-navigation li {
		display: block;
		float: none
	}
	.main-navigation li a {
		display: block;
		float: none;
		padding: 20px;
		color: #C5C5C5!important;
		text-align: left
	}
	.main-navigation ul ul {
		box-shadow: none;
		position: relative!important;
		top: 0!important;
		left: 0!important;
		float: none!important;
		background-color: rgba(255, 255, 255, .14)!important;
		padding: 0;
		margin: 0;
		display: none!important
	}
}
</style>