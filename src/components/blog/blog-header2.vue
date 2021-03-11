<template>
    <div class="header">
        <div class="header-fixed">
            <div class="header-inner">
                <a href="javascript:void(0)" class="header-logo" id="logo">Zhua.</a>
                <div class="navi animated fadeInDown" :class="{open:!menuVisible,close:menuVisible}">
                    <div class="bt-nav hover_animation" v-on:click.stop="clickMenu()">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="navbar blog-ani fadeInRight">
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
                                                    <a href="javascript:void(0)" @click="clickMenuDropdown($event)">{{link.linkName}}</a>
                                                    <ul class="sub-menu">
                                                        <li v-for="(sub,index) in link.children" :key="'sub-'+index" :id="'menu-item-sub-'+index" 
                                                        class="menu-item menu-item-type-taxonomy menu-item-object-category"
                                                        :class="['menu-item-sub-'+index, sub.id == isActive?'current-menu-item':'']"
                                                        @click="menuVisible = false">
                                                            <router-link :to="{path: sub.path, params: {p : sub.linkName }}">{{sub.linkName}}</router-link>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </template>
                                            <template v-else>
                                                <li :key="index" :id="'menu-item-'+index" class="menu-item menu-item-type-post_type menu-item-object-page"
                                                    :class="['menu-item-'+index, link.id == isActive?'current-menu-item':'', link.id == isActive?'current_page_item':'']"
                                                    @click="menuVisible = false">
                                                    <router-link :to="link.path">{{link.linkName}}</router-link>
                                                </li>
                                            </template>
                                        </template>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <!-- #site-navigation -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {hasClass, addClass, removeClass} from '@/util/util'
export default {
    name: 'blogHeader2',
    props: {
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
			searchState: false,
			menuVisible: false
        }
    },
    watch: {
    },
	mounted() {
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
		}
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/blog/blog-common.scss';
.header {
    width:100%;
    min-height:50px;
    position:fixed;
    background-color:rgba(255,255,255,1);
    z-index:998;
    top:0;
    left:0;
    border-bottom:1px solid #e8e9e7;
    font-size:14px;
    .header-fixed {
        width:1280px;
        margin-left:auto;
        margin-right:auto;
        position:relative;
        .header-inner {
            margin-left:10px;
            margin-right:10px;
            position:relative;
        }
    }
}
.header-logo{
    font-family:BarbaraHand;
    font-size:45px;
    color:#444647;
    text-align:center;
    position:absolute;
    left:10%;
    &:hover {
        opacity:0.7;
        filter:alpha(opacity=70);
    }
}
/* 菜单开始 */
.navi {
    position:relative;
}
.navbar {
	display:block;
    position:absolute;
    right:10%;
}
.open {
    .navbar {
        display: none;
    }
    .bt-nav {
        span {
            &:first-child {
                margin-top: 7px;
            }
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
                margin-top: 15px;
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
        list-style: none;
        ul {
            position: absolute;
            top: 50px;
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
                margin: 0;
                padding: 0;
                &:hover {
                    background-color: rgba(0, 0, 0, .02);
                }
                &:before{
                    width:0;
                    height:2px;
                    position:absolute;
                    bottom: -1px;
                    left:50%;
                    background-color:#6bc30d;
                    content:"";
                    transition:all .6s;
                    z-index:-1
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
        display: block;
        padding: 10px 5px;
        color: #212220;
        position: relative;
        float: left;
        &.current-menu-ancestor {
            & > a {
                color: #6bc30d;
                // color: #7bbff9;
            }
        }
        &.current-menu-item {
            & > a {
                // color: #7bbff9;
                color: #6bc30d;
                &::after,&::before {
                    opacity: 1;
                    -webkit-transform: translateX(0);
                    -moz-transform: translateX(0);
                    transform: translateX(0);
                }
            }
            &::before {
                width:100%;
                left:0;
            }
        }
        &:before{
            width:0;
            height:2px;
            position:absolute;
            bottom:-1px;
            left:50%;
            background-color:#6bc30d;
            content:"";
            transition:all .6s;
            z-index:-1
        }
        a {
            color: inherit;
            // font-weight: bold;
            padding: 5px 10px;
            span {
                display: none;
            }
            &:hover {
                color:#6bc30d
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
.main-navigation ul li.focus::after,
.main-navigation ul li:hover::before {
    width:100%;
    left:0;
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
    display: block;
}
#main-menu>div,
#primary-menu {
    float: left;
}
.bt-nav {
    width: 30px;
    height: 30px;
    display:inline-block;
    position:absolute;
    right:0;
    top:10px;

    border-radius: 50%;
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
        width: 20px;
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
@media screen and (max-width:1366px){
    .header-fixed{width:95%!important}
    .bt-nav{display:none}
    .navbar{display:block}
    .open-page-item>ul.children,
    .open-page-item>ul.sub-menu {
        display: none;
    }
}
@media screen and (min-width: 1025px) {
    .header-fixed{width:95%!important}
    .bt-nav{display:none}
    .navbar{display:block!important}
    .open-page-item>ul.children,
    .open-page-item>ul.sub-menu {
        display: none;
    }
}
@media screen and (max-width: 1024px) {
    body {
		font-family: -apple-system, BlinkMacSystemFont, opensans, Optima, "Microsoft Yahei", sans-serif;
    }
    #primary-menu {
		display: block;
		float: none
	}
    .header-fixed {
        width:95%!important
    }
    .bt-nav{display:block}
    .navbar{position:fixed;top:50px;left:0;right:0}
    .navbar{display:none;width:100%;background:rgba(255,255,255,1)}
    .navbar li:before{bottom:0;z-index:10}
    .navbar li{float:none;border-bottom:1px solid #e8e9e7}
    .navbar li:last-child{border:0}
    .open-page-item>ul.children,
    .open-page-item>ul.sub-menu {
        display: block!important;
    }
    .main-navigation ul ul:before {
		display: none
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
        float: none;
        padding: 0;
	}
	.main-navigation li a {
		display: block;
		float: none;
		padding: 20px;
		color: #8a8888;
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