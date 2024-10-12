const { Role } = require("../models");
const { Op } = require("sequelize");
class requestHandler {
  // GET
  getRoles = async (req, res) => {
    let { query } = req;
    // Filter options
    let startsWith = query.startsWith;
    let area = query.area;
    let page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : null;
    
    // Query options
    let findOpt = {
      where: {
        name: startsWith ? {[Op.regexp]: `^${startsWith}`} : {[Op.ne]: null},
        areaName: area ? area : {[Op.ne]: null}
      },
      offset: (page - 1) * limit,
      limit: limit,
      attributes: ["name"]
    };

    // Query & response
    Role.findAll(findOpt)
      .then((roles) => {
        res.status(200).send(roles);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
}

module.exports = new requestHandler();
