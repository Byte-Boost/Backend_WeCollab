const { Ticket, User, Observer } = require("../models");
const { Op } = require("sequelize");
class requestHandler {
  // GET
  getFinishedRatio = async (req, res) => {
    let { query } = req;
    // Filter options
    let area = query.area;
    
    // Query & response
    let concluido = await Ticket.count({
      where: {
        status: "Concluído",
        area: area ? area : {[Op.ne]: null},
      }
    })
    let total = await Ticket.count({
      where: {
        area: area ? area : {[Op.ne]: null},
      }
    });
    let ratio = concluido / total;
    res.status(200).send({ratio, concluido, total});
  };
}

module.exports = new requestHandler();
