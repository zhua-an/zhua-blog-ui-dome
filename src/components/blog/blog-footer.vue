<template>
    <div class="footer animated fadeInUp">
      <div class="footer-top">
        <div class="container">
          <el-row>
            <el-col :xs="24" :sm="12" :md="6">
              <div class="single-widget about">
                <div class="footer-logo">
                    <h2>{{website.logo}}</h2>
                </div>
                <p>{{website.introduction}}</p>
                <div class="button">
                  <el-button type="primary" class="btn" @click="clickAuthor">About Me</el-button>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <div class="single-widget">
                <h2>相关链接</h2>
                <ul class="social-icon">
                    <li class="active" v-for="(link,index) in blogLinks" :key="index">
                      <!-- <a :href="link.path"><i class="iconfont" :class="link.icon"></i>{{link.linkName}}</a> -->
                      <router-link :to="link.path"><i class="iconfont" :class="link.icon"></i>{{link.linkName}}</router-link>
                    </li>
                </ul>                   
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <div class="single-widget contact">
                <h2>联系我</h2>
                <ul class="list">
                    <li><i class="iconfont icon-map"></i>地址: {{blogger.address}}</li>
                    <li><i class="iconfont icon-qq"></i>QQ: {{blogger.qq}}</li>
                    <li><i class="iconfont icon-weixin"></i>
                      <el-tooltip class="item" effect="light" placement="right">
                        <div slot="content" class="wechatimg"><img src="../../assets/img/code/wx.jpg"/></div>
                        <el-link :underline="false">扫一扫</el-link>
                      </el-tooltip>
                    </li>
                    <li><i class="iconfont icon-mail"></i>邮箱: {{blogger.email}}</li>
                </ul>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <div class="single-widget s-code">
                <h2>小程序</h2>
                <div>
                  <el-tooltip class="item" effect="light" placement="right">
                      <div slot="content" class="wechatimg"><img src="../../assets/img/code/small_WeChat_project_code.jpg"/></div>
                      <img src="../../assets/img/code/small_WeChat_project_code.jpg" alt="">
                  </el-tooltip>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="copyright">
        <div class="container">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" class="text-center">
              <p>Copyright &copy; 2020 子华er 寻觅你想要的！
                <a target="_blank" href="http://www.beian.miit.gov.cn/" rel="nofollow" style="margin-left:5px;">{{website.copyright}}</a>
              </p>
            </el-col>
          </el-row>
        </div>
      </div>  
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'blogFooter',
  props: {
    blogger: {
      type: Object,
      default: () => ({})
    },
    blogLinks: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
  },
  methods: {
    clickAuthor() {
      this.$router.push({ path: this.website.authorPage })
    }
  },
  computed: {
    ...mapGetters(["website"])
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/blog/blog-common.scss';
.footer {
  .container {
      width: 90%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
  }
  .footer-top {
      background: #232328;
      padding: 25px 0;
  }
  .single-widget {
      margin-top: 30px;
      h2 {
          color: #fff;
          font-size: 18px;
          margin-bottom: 20px;
          text-transform: uppercase;
      }
  }
  .footer-logo {
      h2 {
          font-family: BarbaraHand;
          font-size: 40px !important;
          margin-bottom: 20px;
      }
  }
  .about {
      p {
          color: #eee;
      }
  }
  .button {
      .btn {
          margin-top: 20px;
          &:hover {
              border-color: #fff;
          }
      }
  }
  .contact {
      ul {
          li {
              color: #eee;
              position: relative;
              padding-left: 40px;
              font-family: Roboto,sans-serif;
              margin-bottom: 10px;
              list-style: none;
              &:last-child {
                  margin: 0;
              }
              i {
                  position: absolute;
                  top: 50%;
                  width: 30px;
                  height: 30px;
                  text-align: center;
                  line-height: 30px;
                  left: 0;
                  margin-top: -15px;
                  font-size: 16px;
              }
              a {
                  color: #fff;
              }
          }
      }
  }
  .s-code {
    img {
      width: 25%;
    }
  }
  .social-icon {
      li {
          float: left;
          width: 50%;
          margin-bottom: 10px;
          &:last-child {
              margin: 0;
          }
          a {
              color: #eee;
              &:hover {
                  color: #82b440;
              }
              i {
                  margin-right: 10px;
                  width: 20px;
                  font-size: 16px;
              }
          }
      }
  }
  .copyright {
      padding: 12px 0;
      background: #1d1d21;
      p {
          color: #bbb;
          font-size: 14px;
      }
  }
}
.wechatimg {
    width: 121px;
    height: 121px;
}
</style>