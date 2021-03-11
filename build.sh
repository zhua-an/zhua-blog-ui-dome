#!/bin/bash 

echo "打包文件"
yarn build
echo "传输文件"
scp -r ./dist/** root@ip:/data/blog/Zhua-blog
echo "部署成功"