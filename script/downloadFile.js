const fs = require("fs-extra");
const superagent = require("superagent");
const config = require("../config");

async function mapDownload(content) {
  try {
    const request = await superagent.get(content.url).timeout({
      response: 5000,
      deadline: 10000,
    });

    if (request.status === 200) {
      request.on("data", async (data) => {
        await fs.outputFile(config.dirURL + `/${content.name}.torrent`, data);
      });
    }
  } catch (err) {
    console.log(`发生错误========>${err}：${content.name}`);
  }
}

async function downloadFile(urls, callback) {
  // 清空目录
  await fs.remove(config.dirURL);

  await Promise.all(urls.map((url) => mapDownload(url)));

  process.nextTick(callback);
}

module.exports = downloadFile;
