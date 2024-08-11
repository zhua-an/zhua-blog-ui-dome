// 配置编译环境和线上环境之间的切换

let baseUrl = '';
let iconfontVersion = ['1570761_9lvxo45gl0l'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
// let uploadUrl = '/admin/file/upload';
let uploadUrl = '/admin/qiniu/upload';
const env = process.env
if (env.NODE_ENV == 'development') {// 开发环境地址
    baseUrl = `http://localhost:8888`; 
} else if (env.NODE_ENV == 'production') {//生产环境地址
    baseUrl = `https://www.******.com`; 
} else if (env.NODE_ENV == 'test') {//测试环境地址
    baseUrl = ``; 
}
let codeUrl = `${baseUrl}/code`

export {
    baseUrl,
    iconfontUrl,
    iconfontVersion,
    codeUrl,
    uploadUrl,
    env
}