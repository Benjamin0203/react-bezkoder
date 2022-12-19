// const { where } = require("sequelize");
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

//Create and save a new Tutorial
exports.create = (req, res) => {
  //validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  //Save Tutorial in the database
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the Tutorial."
      });
    });
  };
    //Retrieve all Tutorials/find by title from the database
    //req.query.title : get query string from the request and consider it as condition for findAll() method
    exports.findAll = (req, res) => {
      const title = req.query.title;
      const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

      Tutorial.findAll({ where: condition})
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving tutorials."
        });
      });
    };

    //Retrieve a single object: find a single Tutorial with an id
    //req.params.id : get the single id
    //findByPk 
    exports.findOne = (req, res) => {
      const id = req.params.id;

      Tutorial.findByPk(id)
        .then(data => {
          if(data) {
            res.send(data)
          } else {
            res.status(404).send({
              message: `Cannot find Tutorial with id=${id}.`
            });
          }
        })
        .catch(error => {
          message: "Error retrieving Tutorial with id=" + id
        });
    };

    //Updating an object: update a tutorial by id
    exports.update = (req, res) => {
      const id = req.params.id;

      Tutorial.update(req.body, { where: { id: id } })
        .then(data => {
          if(data == 1) {
            res.send({
              message: "Tutorial was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update tutorial with id=${id}`
            });
          }
        })
        .catch(error => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          })
        })
    };

    //Delete an object: delete a Tutorial by id
    exports.delete = (req, res) => {
      const id = req.params.id;

      Tutorial.destroy({ where: { id: id} })
        .then(data => {
          if(data == 1) {
            res.send({
              message: "Tutorial has been deleted"
            })
          } else {
            res.send({
              message: `Sorry, Cannot delete tutorial with id=${id}`
            })
          }
        })
        .catch(error => {
          res.status(500).send({
            message: "Cannot delete tutorial with id=" + id
          });
        });
    };

    //Delete all objects: delete all tutorials from database
    exports.deleteAll = (res, req) => {
      Tutorial.destroy( {
        where: {},
        truncate: false
      })
      .then(data => {
        res.send({ message: `${data} has Tutorials has been deleted`})
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred when removing all tutorials"
        });
      });
    };

    //Find all objects by condition: find all tutorials with published: true
    exports.findAllByTitile = (req, res) => {
      Tutorial.findAll({where: { published: true }})
        .then(data => {
          res.send(data)
        })
        .catch(error => {
          res.status(5000).send({
            message: error.message || "Some error occurred when retrieving all published tutorials."
          });
        });
    };
