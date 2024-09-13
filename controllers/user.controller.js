const db = require("../models")
const { Users } = require("../models");
const { Op } = require("sequelize");

class requestHandler {
  // GET
  getUsers = (req, res) => {
    let { query } = req;
    // Filter options
    let adminOnly = query.adminOnly;
    let startsWith = query.startsWith;
    let sortMethod = query.sortBy || "ID";
    let page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : null;
    
    function sortBy(sortMethod){
      switch (sortMethod.toUpperCase()) {
        case "NAME":
          return [['username', 'ASC']];
        default:
          return [['id', 'ASC']];
      }
    }

    // Query options
    let findOpt = {
      where: {
        // Selected Filter ? Proper logic : Default Filter
        name: startsWith ? {[Op.regexp]: `^${startsWith}`} : {[Op.ne]: null},
        admin: (adminOnly && adminOnly.toUpperCase() == "TRUE")? true : {[Op.ne]: null},
      },
      attributes: { exclude: ["password", "username"] },
      order: sortBy(sortMethod),
      offset: (page - 1) * limit,
      limit: limit
    };

    // Query & response
    Users.findAll(findOpt)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  getUsersByCPF = (req, res) => {
    let { params } = req;
    Users.findAll({ where: { cpf: params.cpf }, attributes: { exclude: ["password", "username"]} })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  getUsersById = (req, res) => {  
    let { params } = req;
    Users.findByPk(params.id, {attributes: { exclude: ["password", "username"]}}).then((user) => {
            res.status(200).send(user);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send();
          });
  }
}

module.exports = new requestHandler();
