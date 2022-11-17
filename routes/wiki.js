const express = require("express");
const router = express.Router();
const { Page } = require("../models");
const { addPage, wikiPage, main } = require("../views");
// const addPage = require("../views/addPage.js");
// const db = require("../models/index.js");

router.get("/", async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
  // try {
  // res.send(wikiPage())
  // } catch(error){next(error)}
  next();
});

router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  try {
    const page = await Page.create({
      title: title,
      content: content,
    });

    //const slug = await Page.findOne({ where: { slug: req.params.slug } });

    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
  next();
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    res.send(wikiPage(page));
  } catch (error) {
    next(error);
  }
  //res.send(`hit dynamic route at ${req.params.slug}`);
});

module.exports = router;
