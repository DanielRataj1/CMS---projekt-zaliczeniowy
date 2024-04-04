const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  const locals = {
    title: "CMS Projekt Blog",
    description: "Blog NodeJS/Express/MongoDB",
  };
  res.render("index", { locals });
});

router.get("/about", (req, res) => {
  const locals = {
    title: "CMS Projekt Blog",
    description: "Blog NodeJS/Express/MongoDB",
  };
  res.render("about", { locals });
});

router.get("/contact", (req, res) => {
  const locals = {
    title: "CMS Projekt Blog",
    description: "Blog NodeJS/Express/MongoDB",
  };
  res.render("contact", { locals });
});

module.exports = router;
