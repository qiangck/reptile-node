# 介绍

爬取电影网站种子使用

# 目录

- command 自定义脚本目录
- config 配置文件目录
- logs 日志文件目录
- output 输出的磁链地址日志目录
- script 主脚本目录
- torrents 种子存储目录(临时使用)
- index.js 入口文件

# command使用

目录需要存在index.js文件并暴露出一个函数

fn(
  homeURL/** 入口地址 **/,
  callback(/** 爬取到的地址数组 **/)
)

`
  module.exports = (homeURL, callback) => {
    // 逻辑

    callback([
      {url: '*****', name: '*****'},
      {url: '*****', name: '*****'},
      {url: '*****', name: '*****'}
    ])
  };
`

# 命令

> yarn/npm run pull

# 声明！！！

本脚本开源，仅做学习交流，请勿用于商用，由此引起的法律责任，及其他问题本人概不负责