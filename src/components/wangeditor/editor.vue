<template>
  <div class="editor-wrapper">
    <div :id="toolbarId" class="toolbar"></div>
    <div :id="editorId" :style="{ height: height }" style="border: 1px solid #ccc"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
export default {
  name: 'Editor',
  data() {
    return {
      editor: {}
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: 'html',
      validator: (val) => {
        let validList = ['html', 'text']
        for (let i = 0; i < validList.length; i++) {
          if (val === validList[i]) {
            return true
          }
        }
        return false
      }
    },
    /**
     * @description 编辑器工具栏
     */
    menus: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * @description 编辑器高度
     */
    height: {
      type: String,
      default: '300px'
    },
    /**
     * @description 上传图片的服务器地址
     */
    uploadImgServer: {
      type: String,
      default: ''
    },
    /**
     * @description 上传图片名称
     */
    uploadFileName: {
      type: String,
      default: ''
    },
    /**
     * @description 自定义上传参数
     */
    uploadImgParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * @description 自定义 header
     */
    uploadImgHeaders: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * @description 限制图片大小
     */
    uploadImgMaxSize: {
      type: Number,
      default: 5 * 1024 * 1024
    },
    /**
     * @description 自定义上传图片事件标志
     */
    uploadImgHooksFlag: {
      type: Boolean,
      default: false
    },
    /**
     * @description 自定义上传图片事件
     */
    uploadImgHooks: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    toolbarId() {
      return `toolbar${this._uid}`
    },
    editorId () {
      return `editor${this._uid}`
    }
  },
  watch: {
    value: (newVal,oldVal) => {
      if (newVal !== this.editor.txt.html()) {
        this.editor.txt.html(newVal)
        if (this.cache) localStorage.editorCache = newVal
      }
    }
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    }
  },
  mounted () {
    this.editor = new Editor(`#${this.toolbarId}`, `#${this.editorId}`)
    // 配置菜单
    if(this.menus && this.menus.length > 0) {
      this.editor.config.menus = this.menus
    }
    this.editor.config.onchange = (html) => {
      let text = this.editor.txt.text()
      if (this.cache) localStorage.editorCache = html
      this.$emit('input', this.valueType === 'html' ? html : text)
      this.$emit('on-change', html, text)
    }

    if(this.uploadFileName) {
      this.editor.config.uploadFileName = 'file'
    }
    
    this.editor.config.onchangeTimeout = this.changeInterval
    if(this.uploadImgServer) {
      this.editor.config.uploadImgServer = this.uploadImgServer
    }
    if(Object.keys(this.uploadImgParams).length != 0) {
      this.editor.config.uploadImgParams = this.uploadImgParams
    }
    if(Object.keys(this.uploadImgHeaders).length != 0) {
      this.editor.config.uploadImgHeaders = this.uploadImgHeaders
    }
    // 将图片大小限制为 3M
    this.editor.config.uploadImgMaxSize = this.uploadImgMaxSize
    
    //上传图片函数
    if(this.uploadImgHooksFlag) {
      this.editor.config.uploadImgHooks = this.uploadImgHooks
    }

    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
    // 如果本地有存储加载本地存储内容
    let html = this.cache ? this.value || localStorage.editorCache : this.value
    if (html) {
      this.editor.txt.html(html)
      let text = this.editor.txt.text()
      this.$emit('on-change', html, text)
    }
  }
}
</script>

<style lang="less">
.toolbar{
  background-color: #f1f1f1;
  border: 1px solid #ccc;
}
</style>
