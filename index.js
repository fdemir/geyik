#!/usr/bin/env node

const request = require("request");
const HTMLParser = require("node-html-parser");
const chalk = require("chalk");

const word = process.argv.slice(2)[0];

if (typeof word === "undefined") {
  console.log(chalk.redBright("Lütfen bir sözcük giriniz."));
  return;
}

const options = {
  url: "https://www.nisanyansozluk.com/?k=" + encodeURI(word.trim()),
  headers: {
    "cache-control": "max-age=0",
  },
};

request(options, (error, response, body) => {
  const root = HTMLParser.parse(body);
  const rows = root.querySelectorAll(".hghlght .yaz .eskoken");

  if (error || rows.length === 0) {
    console.log(chalk.redBright("Aradığınız sözcük bulunamadı."));
    return;
  }

  const result = {
    history: {
      title: "Tarihçe",
      text: null,
    },
    origin: {
      title: "Köken",
      text: null,
    },
    description: {
      title: "Ek Açıklama",
      text: null,
    },
  };

  result.history.text = rows[0].childNodes[0].childNodes
    .map((iterator) => {
      if (iterator.getAttribute) {
        if (iterator.getAttribute("title")) {
          return chalk.redBright(iterator.getAttribute("title"));
        } else if (iterator.getAttribute("style")?.includes("display:block;")) {
          return `\n${iterator.rawText}\n`;
        }
      } else {
        return chalk.cyan(iterator.rawText.trim());
      }
    })
    .join("");

  result.description.text =
    rows
      .find((row) => row.rawText.startsWith("Not:"))
      ?.rawText.replace("Not:", "")
      .trim() + "\n";
  result.origin.text =
    root
      .querySelector("meta[property=og:description]")
      .getAttribute("content") + "\n";

  for (const key in result) {
    if (!result[key].text) continue;
    console.log(chalk.green(result[key].title + ":"));
    console.log(chalk.white(result[key].text));
  }
});
