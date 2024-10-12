const { Area, Role } = require("../models");
const { Op } = require("sequelize");
class requestHandler {
  // GET
  getAreas = async (req, res) => {
    let { query } = req;
    // Filter options
    let startsWith = query.startsWith;
    let page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : null;
    
    // Query options
    let findOpt = {
      where: {
        name: startsWith ? {[Op.regexp]: `^${startsWith}`} : {[Op.ne]: null},
      },
      offset: (page - 1) * limit,
      limit: limit,
      attributes: ["name"],
      include: {
        model: Role,
        attributes: ["id", "name"],
      }
    };

    // Query & response
    Area.findAll(findOpt)
      .then((areas) => {
        res.status(200).send(areas);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
}

module.exports = new requestHandler();
