const path = require("path");

const getPath = (pathName) => path.join(__dirname, "../", pathName);

module.exports = {
  // 种子目录
  dirURL: getPath("torrents"),
  // 磁链输出目录
  outputURL: getPath('output'),
  // 爬虫脚本目录
  reptileCommandDir: getPath('command'),
  // 是否输出显示电影名称
  outShowName: true,
  // 日志文件目录
  logsDir: getPath('logs')
};
