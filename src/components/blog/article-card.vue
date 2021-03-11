<template>
  <div class="single-news">
        <div class="news-head">
            <img v-if="data.cover_src" :src="data.cover_src"/>
            <img v-else src="../../assets/img/default.png"/>
            <a v-if="data.href" :href="data.href" class="link" target="_blank"><i class="el-icon-link"></i></a>
            <router-link v-else :to="{name: 'detail', params: {id: data.id}}" class="link">
                <i class="el-icon-link"></i>
            </router-link>
        </div>
        <div class="news-content">
            <h4>
                <a v-if="data.href" :href="data.href" target="_blank">{{data.title}}</a>
                <router-link v-else :to="{name: 'detail', params: {id: data.id}}">
                     {{data.title}}
                </router-link>
            </h4>
            <div class="date">
                {{data.date}}
            </div>
            <p>
                {{data.introduction}}
            </p>
            <div class="text-right">
                <a v-if="data.href" :href="data.href" class="btn" target="_blank">
                    阅读更多 <i class="el-icon-arrow-right"></i>
                </a>
                <router-link v-else :to="{name: 'detail', params: {id: data.id}}" class="btn">
                    阅读更多 <i class="el-icon-arrow-right"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'article_card',
    props: {
        data: Object
    }
}
</script>

<style lang="scss" scoped>
.single-news {
    margin-top: 50px;
    background: #faf9f9;
    transition: all 0.3s ease-in-out;
    &:hover {
        box-shadow: 0 5px 15px -5px #333;
        transform: translateY(-6px);
        -webkit-transform: translateY(-6px);
        -moz-transform: translateY(-6px);
        transform: translateY(-6px);
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0 7px 10px rgba(0, 0, 0, 0.15);
        -webkit-box-shadow: 0 7px 10px rgba(0, 0, 0, 0.15);
        .news-head {
            img {
                -webkit-transform: scale(1.2);
                -moz-transform: scale(1.2);
                transform: scale(1.2);
            }
            &:before {
                opacity: 1;
                visibility: visible;
                -webkit-transform: translateY(0);
                -moz-transform: translateY(0);
                transform: translateY(0);
            }
        }
        .link {
            top: 50%;
            opacity: 1;
            visibility: visible;
        }
    }
}
.news-head {
    position: relative;
    overflow: hidden;
    &::before {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(255,255,255,.51);
        content: "";
        opacity: 0;
        visibility: hidden;
        -webkit-transition: all .4s ease;
        -moz-transition: all .4s ease;
        transition: all .4s ease;
        -webkit-transform: translateY(-100%);
        -moz-transform: translateY(-100%);
        transform: translateY(-100%);
        z-index: 8;
    }
    img {
        width: 100%;
        height: 244px;
        -webkit-transition: all .4s ease;
        -moz-transition: all .4s ease;
        transition: all .4s ease;
    }
}
.link {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    background: #333;
    color: #fff;
    opacity: 0;
    visibility: hidden;
    text-align: center;
    left: 50%;
    margin: -20px 0 0 -20px;
    line-height: 40px;
    z-index: 9;
    -webkit-transition: all .4s ease;
    -moz-transition: all .4s ease;
    transition: all .4s ease;
}
.news-content {
    padding: 30px 15px;
    h4 {
        margin-bottom: 10px;
        height: 21px;
        font-weight: bold;
    }
    .date {
        color: #bbb;
        font-size: 12px;
        margin-bottom: 15px;
    }
    p {
        position: relative;
        color: #999;
        line-height: 1.2em;
        height: 3.6em;
        overflow: hidden;
        &::after {
            content: "...";
            font-weight: bold;
            position: absolute;
            bottom: 0;
            right: 0;
            padding-left: 40px;
            background: -webkit-linear-gradient(left, transparent, #faf9f9 55%);
            background: -o-linear-gradient(right, transparent, #faf9f9 55%);
            background: -moz-linear-gradient(right, transparent, #faf9f9 55%);
            background: linear-gradient(to right, transparent, #faf9f9 55%);
        }
    }
    .btn {
        display: inline-block;
        margin-top: 15px;
        padding: 0;
        background: 0 0;
        border: none;
        color: #29b6f6;
        -webkit-transition: all .4s ease;
        -moz-transition: all .4s ease;
        transition: all .4s ease;
        &:hover {
            color: #333;
        }
    }
}
</style>