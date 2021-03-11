<template>
  <div class="tagscloud" ref="wrapper">
    <a v-for="(item, index) in data" ref="tag" class="tagc" :key="index" :title="item.name" @click="clickTag(item)">{{item.name}}</a>
  </div>
</template>

<script>
export default {
  name: "tagscloud",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    config: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      timer: null,
      d: 200,
      dtr: 0, //球一帧轴旋转的角度
      mouseX: 0, //转动
      mouseY: 10,
      option: {
        radius: 90, // 滚动半径，单位px
        distr: true,
        tspeed: 11, // 旋转速度基数
        size: 200,
        howElliptical: 1,
        color: null // 字体颜色。为空时随机
      },
      tagList: []
    };
  },
  created() {
    this.dtr = Math.PI / 180
    if (this.config != null) {
      this.option = Object.assign({}, this.option, this.config);
    }
  },
  mounted() {
    this._initTags();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this._initTags();
      });
    }
  },
  methods: {
    _initTags() {
      this.tagList = [];
      var oTag = null;
      for (var i = 0; i < this.data.length; i++) {
        oTag = {};
        this.$refs.tag[i].onmouseover = (function(obj) {
          return function() {
            obj.on = true;
            this.style.zIndex = 9999;
            this.style.color = "#fff";
            this.style.background = "#0099ff";
            this.style.padding = "5px 5px";
            this.style.filter = "alpha(opacity=100)";
            this.style.opacity = 1;
          };
        })(oTag);
        this.$refs.tag[i].onmouseout = (function(obj) {
          return function() {
            obj.on = false;
            this.style.zIndex = obj.zIndex;
            this.style.color = "#fff";
            this.style.background = "#9933FF";
            this.style.padding = "5px";
            this.style.filter = "alpha(opacity=" + 100 * obj.alpha + ")";
            this.style.opacity = obj.alpha;
            this.style.zIndex = obj.zIndex;
          };
        })(oTag);

        if (this.option.color) {
          this.$refs.tag[i].style.background = this.option.color;
        } else {
          // 随机颜色
          this.$refs.tag[i].style.background =
            "rgb(" +
            Math.round(255 * Math.random()) +
            "," +
            Math.round(255 * Math.random()) +
            "," +
            Math.round(255 * Math.random()) +
            ")";
        }

        oTag.offsetWidth = this.$refs.tag[i].offsetWidth;
        oTag.offsetHeight = this.$refs.tag[i].offsetHeight;
        this.tagList.push(oTag);
      }
      if(this.tagList && this.tagList.length > 0) {
        this.positionAll();
        this.timer = setInterval(this.update, 40);
      } else {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    },
    clickTag(item) {
      this.$emit("clickTag", item);
    },
    update() {
      var a, b, c = 0;
      a = (Math.min(
          Math.max(-this.mouseY, -this.option.size),
          this.option.size
        ) / this.option.radius) * this.option.tspeed;
      b = (-Math.min(
          Math.max(-this.mouseX, -this.option.size),
          this.option.size
        ) / this.option.radius) * this.option.tspeed;
      if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
        return;
      }
      var _sineCos = this.sineCosine(a, b, c);
      for (var i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].on) {
          continue;
        }
        var rx1 = this.tagList[i].cx;
        var ry1 =
          this.tagList[i].cy * _sineCos.ca +
          this.tagList[i].cz * -_sineCos.sa;
        var rz1 =
          this.tagList[i].cy * _sineCos.sa +
          this.tagList[i].cz * _sineCos.ca;

        var rx2 = rx1 * _sineCos.cb + rz1 * _sineCos.sb;
        var ry2 = ry1;
        var rz2 = rx1 * -_sineCos.sb + rz1 * _sineCos.cb;

        var rx3 = rx2 * _sineCos.cc + ry2 * - _sineCos.sc;
        var ry3 = rx2 * _sineCos.sc + ry2 * _sineCos.cc;
        var rz3 = rz2;

        this.tagList[i].cx = rx3;
        this.tagList[i].cy = ry3;
        this.tagList[i].cz = rz3;

        let per = this.d / (this.d + rz3);

        this.tagList[i].x = this.option.howElliptical * rx3 * per - this.option.howElliptical * 2;
        this.tagList[i].y = ry3 * per;
        this.tagList[i].scale = per;
        var alpha = per;
        alpha = (alpha - 0.6) * (10 / 6);
        this.tagList[i].alpha = alpha * alpha * alpha - 0.2;
        this.tagList[i].zIndex = Math.ceil(
          100 - Math.floor(this.tagList[i].cz)
        );
      }
      this.doPosition();
    },
    depthSort() {
      var i = 0;
      var aTmp = [];
      for (i = 0; i < this.aA.length; i++) {
        aTmp.push(this.$refs.tag[i]);
      }
      aTmp.sort(function(vItem1, vItem2) {
        if (vItem1.cz > vItem2.cz) {
          return -1;
        } else if (vItem1.cz < vItem2.cz) {
          return 1;
        } else {
          return 0;
        }
      });
      for (i = 0; i < aTmp.length; i++) {
        aTmp[i].style.zIndex = i;
      }
    },
    positionAll() {
      var phi = 0;
      var theta = 0;
      var max = this.tagList.length;
      for (var i = 0; i < max; i++) {
        if (this.option.distr) {
          phi = Math.acos(-1 + (2 * (i + 1) - 1) / max);
          theta = Math.sqrt(max * Math.PI) * phi;
        } else {
          phi = Math.random() * Math.PI;
          theta = Math.random() * (2 * Math.PI);
        }
        //坐标变换
        this.tagList[i].cx =
          this.option.radius * Math.cos(theta) * Math.sin(phi);
        this.tagList[i].cy =
          this.option.radius * Math.sin(theta) * Math.sin(phi);
        this.tagList[i].cz = this.option.radius * Math.cos(phi);

        this.$refs.tag[i].style.left =
          this.tagList[i].cx +
          this.$refs.wrapper.offsetWidth / 2 -
          this.tagList[i].offsetWidth / 2 +
          "px";
        this.$refs.tag[i].style.top =
          this.tagList[i].cy +
          this.$refs.wrapper.offsetHeight / 2 -
          this.tagList[i].offsetHeight / 2 +
          "px";
      }
    },
    doPosition() {
      var l = this.$refs.wrapper.offsetWidth / 2;
      var t = this.$refs.wrapper.offsetHeight / 2;
      for (var i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].on) {
          continue;
        }
        var aAs = this.$refs.tag[i].style;
        if (this.tagList[i].alpha > 0.1) {
          if (aAs.display != "") aAs.display = "";
        } else {
          if (aAs.display != "none") aAs.display = "none";
          continue;
        }
        aAs.left =
          this.tagList[i].cx +
          l -
          this.tagList[i].offsetWidth / 2 +
          "px";
        aAs.top =
          this.tagList[i].cy +
          t -
          this.tagList[i].offsetHeight / 2 +
          "px";
        //aAs.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';
        //aAs.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+100*mcList[i].alpha+")";
        aAs.filter = "alpha(opacity=" + 100 * this.tagList[i].alpha + ")";
        aAs.zIndex = this.tagList[i].zIndex;
        aAs.opacity = this.tagList[i].alpha;
      }
    },
    sineCosine(a, b, c) {
      let _sineCos = {
        sa: 0,
        ca: 0,
        sb: 0,
        cb: 0,
        sc: 0,
        cc: 0
      }
      _sineCos.sa = Math.sin(a * this.dtr);
      _sineCos.ca = Math.cos(a * this.dtr);
      _sineCos.sb = Math.sin(b * this.dtr);
      _sineCos.cb = Math.cos(b * this.dtr);
      _sineCos.sc = Math.sin(c * this.dtr);
      _sineCos.cc = Math.cos(c * this.dtr);
      return _sineCos
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #444;
  text-decoration: none;
  &:hover {
    color: red;
  }
}
.tagscloud {
  width: 100%;
  height: 250px;
  position: relative;
  font-size: 12px;
  color: #333;
  margin: 20px auto 0;
  text-align: center;
  a {
    position: absolute;
    top: 0px;
    left: 0px;
    color: #333;
    font-family: Arial;
    text-decoration: none;
    &:hover {
      color: #fff;
      padding: 5px;
      display: block;
      background: #d02f53;
    }
    &.tagc {
      margin: 0 10px 15px 0;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
      padding: 2px 5px;
      white-space: nowrap;
      display: inline-block;
      border-radius: 3px;
      color: #fff;
    }
  }
}
</style>