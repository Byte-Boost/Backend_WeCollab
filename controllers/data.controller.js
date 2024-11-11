const { Ticket, User, Observer } = require("../models");
const { Op } = require("sequelize");
const { getDateXDaysAgo } = require("../services/date.services");
class requestHandler {
  // GET
  getFinishedRatio = async (req, res) => {
    let { query } = req;
    // Filter options
    let area = query.area;
    let period = null;
    if (query.period == "week") period = 7
    if (query.period == "month") period = 30
    
    // Query & response
    let concluido = await Ticket.count({
      where: {
        status: "Concluído",
        area: area ? area : {[Op.ne]: null},
        dateOfCreation: period != null ? {[Op.gte]: getDateXDaysAgo(period)} : {[Op.ne]: null}
      }
    })
    let total = await Ticket.count({
      where: {
        area: area ? area : {[Op.ne]: null},
        dateOfCreation: period != null ? {[Op.gte]: getDateXDaysAgo(period)} : {[Op.ne]: null}
      }
    });
    let ratio = concluido / total;
    res.status(200).send({ratio, concluido, total});
  };

  getTicketSpeed = async (req, res) => {
    let { query } = req;
    // Filter options
    let area = query.area;
    let period = null;
    if (query.period == "week") period = 7
    if (query.period == "month") period = 30
    
    // Query & response
    let tickets = await Ticket.findAll({
      where: {
        area: area ? area : {[Op.ne]: null},
        status: "Concluído",
        dateOfCreation: period != null ? {[Op.gte]: getDateXDaysAgo(period)} : {[Op.ne]: null}
      }
    });
    let speed = 0;
    tickets.forEach(ticket => {
      speed += (ticket.dateOfConclusion - ticket.dateOfCreation);
    });
    speed /= tickets.length;
    res.status(200).send({speed});
  }
}

module.exports = new requestHandler();
