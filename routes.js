const express = require('express');
const router = express.Router();
const baseStaticPath = __dirname + `/interface/`;


router.get(`/recipe`, (req, res) => res.sendFile(baseStaticPath + `pages/recipe.html`));


// Handle 404
router.use((req, res, next) => {
    console.log(`Wrong Endpoints! - 404 ${req.method} `)
    res.status(404).send("Error 404 - Wrong Endpoint!");
  });



module.exports = router;
