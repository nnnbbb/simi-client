export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
cd /data/simi/web
git pull
# 安装 node_modules 取消代理
unset https_proxy && unset http_proxy && unset all_proxy
yarn
yarn build
pm2 delete simi-web
pm2 start npm --name "simi-web" -- start
pm2 logs -f simi-web
