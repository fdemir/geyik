#!/usr/bin/env node

const request = require('request');
const HTMLParser = require('node-html-parser');
const chalk = require('chalk');

const word = process.argv.slice(2)[0]

if(!word) {
  console.log(chalk.redBright("Lütfen bir sözcük giriniz."))
  return false
}

request('https://www.nisanyansozluk.com/?k=' + word, function (error, response, body) {


  const root = HTMLParser.parse(body)
  const rows = root.querySelectorAll(".hghlght .yaz .eskoken")

  if(error || rows.length == 0) {
    console.log(chalk.redBright("Aradığınız sözcük bulunamadı."))
    return false
  }

  const result = {
    history: {
      title: 'Tarhiçe',
      text: null,
    },
    origin: {
      title: 'Köken',
      text: null
    },
    description: {
      title: 'Ek Açıklama',
      text: null
    },
  }

  result.history.text = rows[0].rawText
  result.description.text = rows.find(row => row.rawText.startsWith("Not:"))?.rawText
  result.origin.text = root.querySelector("meta[property=og:description]").getAttribute("content")

  for (const key in result) {
    if(!result[key].text) continue
    console.log(chalk.green(result[key].title + ':'))
    console.log(chalk.white(result[key].text));
  }
  
});