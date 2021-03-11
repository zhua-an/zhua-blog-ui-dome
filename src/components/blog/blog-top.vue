<template>
  <div class="round-avatars">
      <div class="Yarn_Background"></div>
      <div id="masthead" ref="masthead" :class="['overlay','blog-ani','from-bottom',{'animation-on':animationOn}]" itemprop="brand">
			<div class="site-branding text-center">
                <router-link :to="routerPath">
                    <figure>
						<img class="custom-logo avatar" :src="logoPath" />
					</figure>
                </router-link>
				<h3 class="blog-description"><p>{{description}}</p></h3>
			</div>
			<div class="animation-header">
				<div class="decor-wrapper">
					<svg id="header-decor" class="decor" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path class="large left" d="M0 0 L50 50 L0 100" fill="rgba(255,255,255, .1)"></path>
						<path class="large right" d="M100 0 L50 50 L100 100" fill="rgba(255,255,255, .1)"></path>
						<path class="medium left" d="M0 100 L50 50 L0 33.3" fill="rgba(255,255,255, .3)"></path>
						<path class="medium right" d="M100 100 L50 50 L100 33.3" fill="rgba(255,255,255, .3)"></path>
						<path class="small left" d="M0 100 L50 50 L0 66.6" fill="rgba(255,255,255, .5)"></path>
						<path class="small right" d="M100 100 L50 50 L100 66.6" fill="rgba(255,255,255, .5)"></path>
						<path d="M0 100 L50 50 L100 100 L0 100" fill="rgba(255,255,255, 0.9)"></path>
						<path d="M48 52 L50 49 L52 52 L48 52" fill="rgba(255,255,255, 0.2)"></path>
					</svg>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce';
import avatarUrl from '@/assets/img/avatar/zhua.jpg';
export default {
    name: 'blogTop',
    props: {
        routerPath: {
            type: String,
            default: '/'
        },
        logoPath: {
            type: String,
            default: avatarUrl
        },
        description: {
            type: String,
            default: '心存感激💓，所遇皆温柔👣'
        }
    },
	data() {
		return {
			animationOn: false
		}
	},
	created() {
		this.$nextTick(() => {
			setTimeout(() => {
				this.animationOn = true
			},500)
		})
	},
	mounted() {
		this.throttledScrollHandler = throttle(300, this.onScroll)
		window.addEventListener('scroll', this.throttledScrollHandler)
    },
	methods: {
		onScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			if (scrollTop >= this.$refs.masthead.offsetHeight) {
				this.animationOn = false
			} else {
				this.animationOn = true
			}
		}
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.throttledScrollHandler)
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/blog/blog-common.scss';
.round-avatars .avatar,
.round-avatars .avatar img {
    border-radius: 50%;
}
.avatar,
.avatar img {
    border-radius: 3px;
}
.Yarn_Background {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url(~@/assets/img/bg/bg01.jpg);
    background-position: top center;
    background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -webkit-background-size: cover;
    z-index: -999;
}
#masthead {
    position: relative;
    z-index: 2;
    display: block;
    color: #fff;
    text-align: center;
    width: 100%;
    height: 350px;
    box-sizing: border-box;
}
.site-branding {
    position: relative;
    display: inline-block;
    z-index: 3;
    padding-top: 110px;
}
.custom-logo {
    display: inline-block;
    width: 100px;
    transition: all .6s;
    &:hover {
        transition:all .5s;
        transform:rotate(360deg);
        -ms-transform:rotate(360deg); 	/* IE 9 */
        -moz-transform:rotate(360deg); 	/* Firefox */
        -webkit-transform:rotate(360deg); /* Safari �� Chrome */
        -o-transform:rotate(350deg); 	/* Opera */
    }
}
.blog-description {
    text-transform: none;
    font-weight: 400;
}
.decor-wrapper {
    width: 100%;
    height: 50%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
}
.decor {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    &.bottom {
        bottom: -1px;
    }
    &.top {
        top: -1px;
    }
}
</style>