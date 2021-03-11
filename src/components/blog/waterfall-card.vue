<template>
    <div class="single-card">
        <waterfall :col='col' :data="list"  @loadmore="loadmore">
            <template>
                <el-card class="item-cell" v-for="(item,index) in list" :key="index" shadow="hover">
                    <div class="card">
                        <a class="card-thumb" :href="item.previewUrl" @click="handlerRes('preview', item.id)" target="_blank">
                            <img :src="item.coverSrc" alt="">
                        </a>
                        <div class="info">
                            <h4>
                                <a :href="item.previewUrl" @click="handlerRes('preview', item.id)" target="_blank">
                                    {{item.name}}
                                </a>
                            </h4>
                        </div>
                        <div class="bottom clearfix">
                            <span class="time">
                                <i class="el-icon-time"></i>
                                {{item.createTime}}
                            </span>
                            <span class="stars">
                                <a :href="item.previewUrl" @click="handlerRes('preview', item.id)" target="_blank">
                                    <el-tooltip effect="dark" content="预览" placement="top-start">
                                        <i class="iconfont icon-yanjing"></i>
                                    </el-tooltip>
                                    <span>{{item.previewCount}}</span>
                                </a>
                                <a :href="item.downloadUrl" @click="handlerRes('download', item.id)" target="_blank">
                                    <el-tooltip effect="dark" content="下载" placement="top-start">
                                        <i class="iconfont icon-xiazaigray"></i>
                                    </el-tooltip>
                                    <span>{{item.downloadCount}}</span>
                                </a>
                            </span>
                        </div>
                    </div>
                </el-card>
            </template>
        </waterfall>
    </div>
</template>

<script>
export default {
    name: 'waterfall_card',
    props: {
        list: {
            type: Array,
            default: () => {
                return []
            }
        },
        col: {
            type: Number,
            default: 4
        }

    },
    methods: {
        handlerRes(type, id) {
            let data = {type: type, id: id}
            this.$emit('handlerRes', data)
        },
        loadmore() {
            this.$emit('loadmore')
        }
    }
}
</script>

<style lang="scss" scoped>
.item-cell {
    margin: 10px;
}
.card {
    background-color: #ffffff;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    margin-bottom: 0px;
    .card-thumb {
        position: relative;
        display: inherit;
        overflow: hidden;
        &:after {
            content: "";
            background: rgba(0,0,0,0.01);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
    img {
        width: 100%;
        height: auto;
        display: inline-block;
        vertical-align: middle;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        transition: all 1s ease 0s;
    }
    .archive-content {
        padding: 160px 20px;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        text-align: center;
        color: #fff;
        font-size: 14px;
        line-height: 26px;
        opacity: 0;
        background-color: rgba(0,0,0,.5);
    }
    &:hover {
        img {
            // -webkit-filter: brightness(.5);
            // filter: brightness(.5);
            // transform: scale(1.05);
            // -moz-transform: scale(1.05);
            // -webkit-transform: scale(1.05);

            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            transform: scale(1.1);
            -webkit-filter: blur(3px);
            -moz-filter: blur(3px);
            filter: blur(3px);
        }
        .archive-content {
            -webkit-animation: fadeIn 1s;
            animation: fadeIn 1s;
            opacity: 1;
        }
    }
}
.info {
    padding: 6px 15px 28px;
    height: 20px;
    overflow: hidden;
    line-height: 1.42857143;
    h4 {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;
        white-space: nowrap;
        display: block;
        font-weight: bold;
        line-height: 18px;
        margin-top: 7px;
        margin-bottom: 5px;
        color: #60bde8 !important;
    }
    a {
        color: #60bde8 !important;
        &:hover {
            text-decoration: underline !important;
        }
    }
}
.bottom {
    border-radius: 0 0 3px 3px;
    border-top: 1px solid #e7e7e7;
    box-shadow: 0 1px 0 0 #fff inset;
    padding: 10px 3px 3px 3px;
    color: #8b8b8c;
    position: relative;
    margin-top: 3px;
    line-height: 12px;
    .time {
        font-size: 13px;
        color: #999;
    }
    .stars {
        float: right;
        a:last-child {
            padding-left: 12px;
        }
    }
    a {
        color: #8b8b8c;
    }
    i {
        cursor: pointer;
        padding-right: 5px;
        position: relative;
        top: 1.4px;
    }
    span {
        font-size: 10px;
        font-family: "Arial";
    }
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
}
.clearfix {
    &:after {
        clear: both;
    }
}
</style>