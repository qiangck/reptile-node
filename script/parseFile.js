const fs = require("fs");
const sha1 = require("js-sha1");
const bencode = require("bencode");
const config = require("../config");

function getFile(cb, status = "all") {
  const dirs = fs.readdirSync(config.dirURL);

  let fileInfos = [];

  dirs.forEach((fileName) => {
    const filePath = config.dirURL + "/" + fileName;

    if (fileName.includes(".torrent")) {
      const getFileInfo = parseTorrent(fs.readFileSync(filePath));

      if (getFileInfo) {
        fileInfos.push({
          url: getFileInfo,
          name: fileName,
          status: "success",
        });
      } else {
        fileInfos.push({
          url: "",
          name: fileName,
          statue: "error",
        });
        console.log(`文件转换失败===>${fileName}`);
      }
    } else {
      console.log(`文件不是torrent格式===>${fileName}`);
    }
  });

  const files =
    status === "all"
      ? fileInfos
      : fileInfos.filter((item) => item.status === status);

  typeof cb === "function" && cb(files);
}

function parseTorrent(file) {
  try {
    const result = bencode.decode(file);

    if (result) {
      const info = result["info"];

      const hashInfo = sha1(bencode.encode(info));

      const magnet = "magnet:?xt=urn:btih:" + hashInfo.toString();

      return magnet;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

module.exports = getFile;
