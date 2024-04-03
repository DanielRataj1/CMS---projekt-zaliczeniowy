const express = require('express')
const router = express.Router()

router.get('', (req, res)=> {
    const locals = {
        title: "CMS Projekt Blog",
        description:"Blog NodeJS/Express/MongoDB"
    }
    res.render('index', {locals})
})

module.exports = router
