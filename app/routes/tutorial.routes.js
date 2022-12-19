module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js")
  const router = require("express").Router();

  //Create a new Tutorial
  router.post("/", tutorials.create);

  //Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  //Retrieve all published Tutorials
  router.get("/published", tutorials.findAllByTitile);

  //Retrieve a singel Tutrial with id
  router.get("/:id", tutorials.findOne);

  //Update a Tutorial with id
  router.put("/:id", tutorials.update);

  //Delete a tutorial with id
  router.delete("/:id", tutorials.delete);

  //Delete all tutorials
  router.delete("/", tutorials.deleteAll);

  app.use('/api/tutorials', router);
};