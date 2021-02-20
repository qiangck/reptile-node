const log4js = require("log4js");
const config = require("../config");

log4js.configure({
  appenders: {
    err: {
      type: "dateFile",
      filename: config.logsDir + "/cheese.log",
      backups: 5, // 仅保留最新的五个日志文件
      pattern: ".yyyy-MM-dd", // 用于确定何时滚动日志的模式
      alwaysIncludePattern: true,
      compress: true,
    },
    log: { type: "console" },
  },
  categories: {
    default: {
      appenders: ["err"],
      level: "ERROR",
    },
    log: {
      appenders: ["log"],
      level: "INFO",
    },
  },
});

function logs() {
  const log = log4js.getLogger("log");

  const err = log4js.getLogger("err");

  console.log = function (...args) {
    const texts = args.join("");

    log.info(texts);
  };

  console.error = function (...args) {
    const texts = args.join("");

    err.error(texts);
  };

  return log;
}

module.exports = logs;
