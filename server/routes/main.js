const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("", async (req, res) => {
  try {
    const locals = {
      title: "CMS Projekt Blog",
      description: "Blog NodeJS/Express/MongoDB",
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/",
    });

  } catch (error) {
    console.log(error);
  }
});

// router.get("/page", async (req, res) => {
//   try {
//     const locals = {
//       title: "CMS Projekt Blog",
//       description: "Blog NodeJS/Express/MongoDB",
//     };

//     res.render("index", {
//       locals,
//       data,
//       current: page,
//       nextPage: hasNextPage ? nextPage : null,
//       currentRoute: "/",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });



router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id

    const data = await Post.findById({ _id: slug })

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }

    res.render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error)
  }

})

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
  res.render("contact", { locals })
});

module.exports = router

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

// // test bazy danych
// function insertPostData (){
//   Post.insertMany([
//     {
//       title:"Tworzenie bloga6",
//       body:"Treść wpisz tutaj"
//     },
//     {
//       title:"Tworzenie bloga7",
//       body:"Treść wpisz tutaj"
//     },
//     {
//       title:"Tworzenie bloga8",
//       body:"Treść wpisz tutaj"
//     },
//     {
//       title:"Tworzenie bloga9",
//       body:"Treść wpisz tutaj"
//     },
//     {
//       title:"Tworzenie bloga10",
//       body:"Treść wpisz tutaj"
//     },
//   ])
// }

// insertPostData()
