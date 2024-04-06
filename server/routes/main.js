const express = require("express");
const router = express.Router();
const Post = require('../models/Post')

router.get("", async (req, res) => {
  const locals = {
    title: "CMS Projekt Blog",
    description: "Blog NodeJS/Express/MongoDB",
  };

try {
  const data = await Post.find()
  res.render('index', {locals, data})
} catch (error) {
  console.log(error)
}
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


//test bazy danych
// function insertPostData (){
//   Post.insertMany([
//     {
//       title:"Tworzenie bloga",
//       body:"Treść wpisz tutaj"
//     },
//   ])
// }

// insertPostData()