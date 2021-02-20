const parseFile = require("./script/parseFile");
const fs = require("fs-extra");
const config = require("./config");
const reptileCommandDir = require(config.reptileCommandDir);
const inputURL = require("./script/inputUrl");
const downloadFile = require("./script/downloadFile");
const logInit = require("./script/log");
logInit();

const formatTime = (fmt) => {
  const date = new Date();

  const o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return fmt;
};

inputURL((url) => {
  reptileCommandDir(url, (result) => {
    downloadFile(result, () => {
      // torrent文件转换磁链地址
      // fn(cb, status = 'all' || 'error' || 'success')
      parseFile((list) => {
        const time = formatTime("yyyyMMdd-hhssmm");

        let filenames = [];

        list.forEach((item) => {
          if (config.outShowName) {
            filenames.push(item.name);

            filenames.push(item.url);

            filenames.push("\n");
          } else {
            filenames.push(item.url);
          }
        });

        const formatList = filenames.join("\n");

        fs.writeFileSync(config.outputURL + `/output-${time}.json`, formatList);
      }, "success");
    });
  });
});
