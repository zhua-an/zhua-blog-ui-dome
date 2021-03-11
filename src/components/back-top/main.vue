<template>
  <transition name="el-fade-in">
    <div v-if="visible"
      @click.stop="handleClick"
      :style="{
        'right': styleRight,
        'bottom': styleBottom
      }"
      class="backtop">
      <slot>
        <i class="el-icon-caret-top"></i>
      </slot>
    </div>
  </transition>
</template>

<script>
import { throttle } from 'throttle-debounce';
const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2;
export default {
  name: 'ElBacktop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: [String],
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      el: null,
      container: null,
      visible: false
    };
  },
  computed: {
    styleBottom() {
      return `${this.bottom}px`;
    },
    styleRight() {
      return `${this.right}px`;
    }
  },
  mounted() {
    this.init();
    this.throttledScrollHandler = throttle(300, this.onScroll);
    this.container.addEventListener('scroll', this.throttledScrollHandler);
  },
  methods: {
    init() {
      this.container = document;
      this.el = document.documentElement;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },
    onScroll() {
      const scrollTop = this.el.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
      this.visible = scrollTop >= this.visibilityHeight;
    },
    handleClick(e) {
      this.scrollToTop();
      this.$emit('click', e);
    },
    scrollToTop() {
      const el = this.el;
      const beginTime = Date.now();
      const beginValue = el.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;

      const rAF = window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 16);
                };
        })();

    //   const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          if(document.documentElement.scrollTop == 0) {
            document.body.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          }else {
            document.documentElement.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          }
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
          document.documentElement.scrollTop = document.body.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    }
  },
  beforeDestroy() {
    this.container.removeEventListener('scroll', this.throttledScrollHandler);
  }
}
</script>

<style lang="scss" scoped>
.backtop {
  position: fixed;
  background-color: #FFFFFF;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #409EFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0,0,0, .12);
  cursor: pointer;
  z-index: 5;

  &:hover {
    background-color: #F2F6FC;
  }
}
</style>