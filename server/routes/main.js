const express = require("express")
const router = express.Router()
const Post = require('../models/Post')

router.get('', async (req, res) => {
try {
  const locals = {
    title: "CMS Projekt Blog",
    description: "Blog NodeJS/Express/MongoDB",
  }


  let perPage = 10;
  let page = req.query.page || 1

  const data = await Post.aggregate([ { $sort: {createdAt: -1 } } ])
  .skip(perPage * page - perPage)
  .limit(perPage)
  .exec()

    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });



  res.render('index', {locals, data})
} catch (error) {
  console.log(error)
}
});






// backup
// router.get('', async (req, res) => {
//   const locals = {
//     title: "CMS Projekt Blog",
//     description: "Blog NodeJS/Express/MongoDB",
//   };

// try {
//   const data = await Post.find()
//   res.render('index', {locals, data})
// } catch (error) {
//   console.log(error)
// }
// });



router.get('/post/:id', async (req, res) => {
try {
  let slug = req.params.id


  const data = await Post.findById({ _id: slug })

  const locals = {
    title: data.title,
    description: "Blog NodeJS/Express/MongoDB",
  };

  res.render('post', {locals, data})
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


// // test bazy danych
// function insertPostData (){
//   Post.insertMany([
//     {
//       title:"Tworzenie bloga1",
//       body:"Treść wpisz tutaj"
//     },
//     {
//       title:"Tworzenie bloga2",
//       body:"Treść wpisz tutaj"
//     },
//     {
//       title:"Tworzenie bloga3",
//       body:"Treść wpisz tutaj"
//     },
//     {
//       title:"Tworzenie bloga4",
//       body:"Treść wpisz tutaj"
//     },
//     {
//       title:"Tworzenie bloga5",
//       body:"Treść wpisz tutaj"
//     },
//   ])
// }

// insertPostData()