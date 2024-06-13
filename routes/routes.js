const express = require('express');
const router = express.Router();

// Middleware
const middleWare = require(`./middleware`);

const baseStaticPath = `/Users/hamas/Documents/projects/meal-planner/interface/pages/`;
router.get(`/recipe-history`, (req, res) => res.sendFile(baseStaticPath + `recipe_history.html`));
router.get(`/recipe`, (req, res) => res.sendFile(baseStaticPath + `recipe.html`));
router.get('/recipe-detail', middleWare.ingredientsMiddleware  ,(req, res) => res.sendFile(baseStaticPath + 'ingredients.html'));


// Handle 404
router.use((req, res, next) => {
    console.log(`Wrong Endpoints! - 404 ${req.method} `)
    res.status(404).send("Error 404 - Wrong Endpoint!");
  });

module.exports = router;
