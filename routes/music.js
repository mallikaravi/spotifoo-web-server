const express = require('express');
const app = express();
const music = require('../data');
const musicList = music.musicList;
const cors = require("cors");

app.use(
    cors({
      origin: "*",
      credentials: true,
    })
)


/* GET home page. */
app.get('/music', function(req, res, next) {

  let filter = req.query.filter;
  let search = req.query.search;
  const page = req.query.page;
  const items = req.query.items;


  if (!page && !search && !filter) {
    res.send(JSON.stringify(musicList));
    return;
  }

  let resObject = musicList.map(i => ({...i}));

  if (search && filter) {
    search = search.toLowerCase();
    if (filter !== "title" &&
        filter !== "artist" &&
        filter !== "album" &&
        filter !== "genre") {
      filter = null;
    } else {
      resObject = resObject.filter(item => {
        if (filter === "title") return item.title.toLowerCase().includes(search);
        if (filter === "artist") return item.artist.toLowerCase().includes(search);
        if (filter === "album") return item.album.toLowerCase().includes(search);
        if (filter === "genre") return item.genre.toLowerCase().includes(search);
      })
    }
  }

  if (search && !filter) {
    search = search.toLowerCase();

    resObject = resObject.filter(item => {
      let isMatched = false;
      if (item.title.toLowerCase().includes(search)) isMatched = true;
      if (item.artist.toLowerCase().includes(search)) isMatched = true;
      if (item.album.toLowerCase().includes(search)) isMatched = true;
      if (item.genre.toLowerCase().includes(search)) isMatched = true;
      return isMatched;
    })
  }


  if (page) {

    const pageNr = parseInt(page);
    let itemsNr = parseInt(items);

    if (!isNaN(pageNr)) {
      if (isNaN(itemsNr)) itemsNr = 10;

      const start = (pageNr-1)*itemsNr;
      const end = start + itemsNr;
      resObject = resObject.slice(start, end);
    }

  }

  res.send(JSON.stringify(resObject));
});

app.get('/genre', function(req, res, next) {
  res.send(JSON.stringify(
      ["pop", "rock", "reggaeton", "metal"]
  ))
});

app.get('/', function(req, res, next) {
  res.send("<div>There are two endpoints: /music and /genre both only have GET Methods.</div>More Info is in the project requirements document.")
});

module.exports = app;
