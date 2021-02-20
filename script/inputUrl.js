function inputURL(callback) {
  process.stdin.setEncoding("utf8");

  process.stdout.write("请输入页面地址:");

  process.stdin.on("readable", () => {
    var chunk = process.stdin.read();

    if (chunk !== null) {
      if (typeof callback === "function") {
        callback(chunk);
      }
    } else {
      process.stdout.write("请输入页面地址");
    }
  });

  process.stdin.on("end", () => {
    process.stdout.write("任务结束");
  });
}

module.exports = inputURL;
