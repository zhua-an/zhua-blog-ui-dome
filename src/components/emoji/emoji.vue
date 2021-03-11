<template>
  <div class="myemoji">
    <div class="icon clearfix">
      <i class="icon iconfont icon-face" @click="showEmoji = !showEmoji"></i>
      <transition name="fade" mode="">
        <div class="emoji-box" v-if="showEmoji" >
          <el-button 
            class="pop-close" 
            circle
            size="mini" 
            icon="el-icon-close"
            @click="showEmoji = false"></el-button>
          <div class="emoji">
            <ul class="emoji-controller">
              <li 
                v-for="(pannel,index) in pannels" 
                :key="index"
                @click="changeActive(index)"
                :class="{'active': index === activeIndex}">{{ pannel }}</li>
            </ul>
            <ul class="emoji-container">
              <template v-for="(emojiGroup, index) in emojis">
                <li :key="index"
                  style="padding: 0"
                  v-if="index === activeIndex">
                    <a 
                    href="javascript:;" 
                    v-for="(emoji, index) in emojiGroup"  
                    :key="index" @click="selectItem(emoji)">
                    <span 
                        class="emoji-item"
                        :title="emoji"
                        :class="'sprite-' + getPureName(emoji)"></span>
                  </a>
                </li>
              </template>
            </ul>
          </div>
          <span class="pop-arrow arrow"></span>
        </div>       
      </transition>
    </div>
  </div>
</template>
<script>
import data from './data/emoji-data.js'

export default {
  name: 'emoji',
  data () {
    return {
      emojiData: data,
      pannels: ['表情', '自然', '物品', '地点', '符号'],
      activeIndex: 0,
      showEmoji: false
    }
  },
  props: {
  },
  methods: {
    changeActive (index) {
      this.activeIndex = index
    },
    getPureName (name) {
      return name.replace(/:/g, '')
    },
    selectItem (emoji) {
      this.showEmoji = false
      this.$emit('select', emoji)
    }
  },
  computed: {
    emojis () {
      return this.pannels.map(item => {
        return Object.keys(this.emojiData[item])
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/emoji/emoji-sprite.scss';
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
.myemoji {
  display: inline-block;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .icon {
    position: relative;
    margin-top: 10px;
    .iconfont {
      cursor: pointer;
      color: #F7BA2A;
      font-size: 22px;
    }
    .emoji-box {
      position: absolute;
      z-index: 10;
      left: -10px;
      box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
      background: white;
      .el-button {
        position: absolute;
        border: none;
        color: #FF4949;
        right: 12px;
        top: 12px;
        z-index: 10;
      }
      .arrow {
        left: 10px;
      }
    }
  }
  .comment {
    margin-top: 20px;
    .item {
      margin-top: 20px;
      padding: 10px;
      margin: 0;
      border-top: 1px solid #bfcbd9;
    }
  }
}
.emoji {
  width: 380px;
  height: 186px;
  bottom: 30px;
  background: #fff;
  z-index: 10;
  padding: 10px;
  margin-right: 10px;
  .emoji-controller {
    height: 36px;
    overflow: hidden;
    margin-bottom: 0;
    li {
      float: left;
      width: 76px;
      font-size: 12px;
      line-height: 36px;
      cursor: pointer;
      text-align: center;
      position: relative;
      &.active::after{
        content: '';
        width: 100%;
        height: 1px;
        background: #0689dd;
        left: 0;
        bottom: 4px;
        position: absolute;
      }
    }
  }
  .emoji-container {
    height: 140px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    li {
      font-size: 0;
      padding: 5px;
      a {
        float: left;
        overflow: hidden;
        height: 35px;
        transition: all ease-out .2s;
        border-radius: 4px;
        &:hover {
          background-color: #d8d8d8;
          border-color: #d8d8d8;
        }
        span {
          width: 25px;
          height: 25px;
          display: inline-block;
          border: 1px solid transparent;
          cursor: pointer;
        }
      }
    }
  }
}
.clearfix {
  &:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter, .fade-leave-active { opacity: 0; }
.fade-move { transition: transform .4s; }
.list-enter-active, .list-leave-active { transition: all .5s; }
.list-enter, .list-leave-active { opacity: 0; transform: translateX(30px); }
.list-leave-active { position: absolute !important; }
.list-move { transition: all .5s;}
</style>
