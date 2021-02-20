const superagent = require("superagent");
const cheerio = require("cheerio");
const async = require("async");

function getHomeUrls(homeURL, callback) {
  const selectName = ".subject_link";

  superagent.get(homeURL).then((res) => {
    const $ = cheerio.load(res.text);

    const urls = $(selectName)
      .map((i, el) => {
        const dom = $(el);
        return {
          i,
          url: dom.attr("href"),
          name: dom.text().trim().replace(/\//g, ""),
        };
      })
      .get();

    async.map(urls, getChildUrls, (err, results) => {
      if (!err && typeof callback === "function") {
        const data = results.filter((item) => !!item);

        callback(data);
      }
    });
  });
}

async function getChildUrls(content) {
  try {
    const res = await superagent.get(content.url);

    const $res = cheerio.load(res.text);

    const openModelUrl = $res(".ajaxdialog[target=_blank]").attr("href");

    const resUrl = await superagent.get(openModelUrl).type("json");

    const data = JSON.parse(resUrl.text);

    const body = data.message.body;

    const $resUrl = cheerio.load(body);

    const downloadUrl = $resUrl("a[target=_blank]").attr("href");

    return {
      url: downloadUrl,
      name: content.name,
    };
  } catch (err) {
    console.error("发生错误=============>：", err);

    return null;
  }
}

module.exports = getHomeUrls;
