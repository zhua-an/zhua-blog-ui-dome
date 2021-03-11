<template>
    <div class='side-bar'>
        <div v-for="(item,index) in data" :key="index" class='box'>
            <router-link :to="{path: item.path}">
                <div :class="['side', 'bg-0'+index]" ref="side">
                    <span class='side-content'>{{item.name}}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { setStore, getStore } from '@/util/store'
export default {
    name: 'sideBar',
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            time: null
        }
    },
    created() {
        var _self = this
        this.$nextTick(() => {
			this.time = setTimeout(function() {
                _self.showSide()
            }, 800);
		})
    },
    methods: {
        showSide() {
            var showSide = getStore({ name: 'showSide' })
            if (typeof(showSide) == "undefined" && !showSide && this.data && this.data.length > 0) {
                var i = 500;
                this.$refs.side.filter(item => {
                    setTimeout(() => {
                        item.style.cssText="position: relative;left: 100%;margin-left: -32px;box-shadow: 0 -8px 8px -8px rgba(0,0,0,.5),0 8px 8px -8px rgba(0,0,0,.5);transition: all .3s ease-in-out;"
                    }, i);
                    i += 500;
                    setTimeout(() => {
                        item.style.cssText=""
                    }, i)
                })
                // var sideArr = document.getElementsByClassName("side")
                // var newArr = [];
                // for (var j = 0; j < sideArr.length; j++) {
                //     newArr.push(sideArr[j]);
                // }
                // var i = 500;
                // newArr.forEach(item => {
                //     setTimeout(() => {
                //         item.style.cssText="position: relative;left: 100%;margin-left: -32px;box-shadow: 0 -8px 8px -8px rgba(0,0,0,.5),0 8px 8px -8px rgba(0,0,0,.5);transition: all .3s ease-in-out;"
                //     }, i);
                //     i += 500;
                //     setTimeout(() => {
                //         item.style.cssText=""
                //     }, i)
                // })
                setStore({ name: 'showSide', content: true, type: 'session' })
            }
        }
    },
    beforeDestroy() {
        if(this.time != null) {
            clearTimeout(this.time)
        }
        this.time = null
    }
}
</script>

<style lang="scss" scoped>
/* 侧栏 */
.side-bar {
    position: fixed;
    width: 0;
    overflow: visible;
    z-index: 99;
}
.side-bar a:link, .side-bar a:hover, .side-bar a:visited, .side-bar a:active {
    color: #fff;
    text-decoration: none;
}
.box {
    display: inline-block;
    float: right;
    clear: both;
}
.side {
    position: relative;
    left: 22px;
    padding: 16px 32px 16px 64px;
    margin: 8px;
    x-box-shadow: 0 0 8px 0 rgba(0,0,0,.5);
    box-shadow: 8px 0 8px -8px rgba(0,0,0,.5);
    background: #fff;
    transition: all .3s ease-in-out .1s;
    &:hover {
        position: relative;
        left: 100%;
        margin-left: -32px;
        box-shadow: 0 -8px 8px -8px rgba(0,0,0,.5),0 8px 8px -8px rgba(0,0,0,.5);
        transition: all .3s ease-in-out;
    }
}
.side-content {
    color: #fff;
    font-family: droid sans,sans-serif;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
}
.side-animate {
    position: relative;
    left: 100%;
    margin-left: -32px;
    box-shadow: 0 -8px 8px -8px rgba(0,0,0,.5),0 8px 8px -8px rgba(0,0,0,.5);
    transition: all .3s ease-in-out;
}
.bg-00 {
    background: #539770;
}
.bg-01 {
    background: #4b7d74;
}
.bg-02 {
    background: #8dc2bc;
}
.bg-03 {
    background: #e2ae63;
}
.bg-04 {
    background: #be7467;
}
.bg-05 {
    background: #edd6b4;
}


/* 媒体查询 */
@media (max-width: 767px) {
    .side {
        left: 15px;
    }
}
</style>