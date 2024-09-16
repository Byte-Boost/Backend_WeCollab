const db = require("../models")
const { Ticket } = require("../models");
const { Op } = require("sequelize");

class requestHandler {
  // GET
  getTickets = (req, res) => {
    let { query } = req;
    // Filter options
    let sortMethod = query.sortBy || "DATEOFCREATION";
    let page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : null;
    
    function sortBy(sortMethod){
      switch (sortMethod.toUpperCase()) {
        default:
          return [['dateOfCreation', 'ASC']];
      }
    }

    // Query options
    let findOpt = {
      order: sortBy(sortMethod),
      offset: (page - 1) * limit,
      limit: limit
    };

    // Query & response
    Ticket.findAll(findOpt)
      .then((tickets) => {
        res.status(200).send(tickets);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };

  // POST
  createTicket = async (req, res) => {
    let { body } = req;

    // Create Ticket object
    var ticket = {
      area: body.area || null,
      status: "Novo",
      category: body.category,
      title: body.title,
      description: body.description || null,
      requesterId: body.requesterId,
      dateOfCreation: body.dateOfCreation || Date.now()
    };

    // Create ticket
    Ticket.create(ticket)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };

  // PUT
  updateTicket = async (req, res) => {
    let { body, params } = req;
    Ticket.update({
        area: body.area,
        status: body.status,
        category: body.category,
        title: body.title,
        description: body.description,
        }, {
        where: {
        id: params.id
        },
    }).catch((err) => {
      console.log(err);
      res.status(400).send();
    });

    res.status(200).send();
  }
  // DELETE
  deleteTicket = (req, res) => {
    let { params } = req;
    Ticket.destroy({ where: { id: params.id } })
      .then(res.status(200).send())
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
}

module.exports = new requestHandler();
