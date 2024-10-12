const { Ticket, Comment, User, Observer } = require("../models");
const { Op } = require("sequelize");
class requestHandler {
  // GET
  getTickets = async (req, res) => {
    let { query, user } = req;
    let currentUser = await User.findOne({ where: { id: user.id } });
    // Filter options
    let filter = query.filter || null;
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
      where: {
        area: filter == "area" ? currentUser.area : {[Op.ne]: null},
        requesterId: (filter == null && currentUser.admin) || filter == "area" ? {[Op.ne]: null} : currentUser.id
      },
      order: sortBy(sortMethod),
      offset: (page - 1) * limit,
      limit: limit,
      include: [
        {
          model: Observer,
          attributes: ["id"],
          include: {
            model: User,
            attributes: ["id", "name"],
          }
        }
      ]
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
  getTicketById = async (req, res) => {
    let { params } = req;
    
    // Query & response
    Ticket.findByPk(params.id, {
      include: [
        {
          model: Observer,
          attributes: ["id"],
          include: {
            model: User,
            attributes: ["id", "name"],
          }
        }
      ]
    })
      .then((ticket) => {
        res.status(200).send(ticket);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  getComment = async (req, res) => {
    let { query, params } = req;
    // Filter options
    let sortMethod = query.sortBy || "DATE";
    let page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : null;
    
    function sortBy(sortMethod){
      switch (sortMethod.toUpperCase()) {
        default:
          return [['date', 'ASC']];
      }
    }

    // Query options
    let findOpt = {
      where: {ticketId: params.id},
      include: {
        model: User,
        attributes: { exclude: ["password", "username", "cpf"] },
      },
      order: sortBy(sortMethod),
      offset: (page - 1) * limit,
      limit: limit
    };

    // Query & response
    Comment.findAll(findOpt)
      .then((comments) => {
        res.status(200).send(comments);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  // POST
  createTicket = async (req, res) => {
    let { body } = req;

    let observers = body.observers;
    if (observers && observers.length > 0) {
      // user has passed a non-empty array of observers
      User.findAll({ where: { id: observers } })
      .then((users) => {
        if(users.length > 0){
          // Check if at least one observer exists, and only then:
          // Create Ticket object
          var ticket = {
            area: body.area || null,
            title: body.title,
            description: body.description || null,
            requesterId: body.requesterId,
            status: "Novo",
            dateOfCreation: body.dateOfCreation || Date.now()
          };
          // Create ticket
          Ticket.create(ticket)
            .then((ticket) => {
              let observerList = users.map((user) => {return {userId: user.id, ticketId: ticket.id}});
              Observer.bulkCreate(observerList);
              res.status(201).send();
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send({error: "Failed to create ticket"});
          });

        } else {
          res.status(400).send({error: "Invalid observer ids"});
        }
      })
      .catch((err)=>{
        res.status(400).send({error: "Invalid observer ids"});
      });
    } else {
      res.status(400).send({error: "observers cannot be empty"})
    }
    
  };
  createComment = async (req, res) => {
    let { body, params } = req;

    // Create Ticket Comment object
    var comment = {
      content: body.content || null,
      ticketId: params.id,
      commenterId: body.commenterId,
      date: Date.now()
    };
    
    // Create comment
    Comment.create(comment)
      .then(() => {
        Ticket.findByPk(params.id).then((ticket) => {
          ticket.update({
            status: "Em andamento",
          });
        });
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  closeTicket = async (req, res)=>{
    let { params } = req;

    await Ticket.update(
      {status: "Concluído"},
      {
        where: {
          id: params.id
        }
      }).then((response) => {
        res.status(204).send();
      }).catch((err) => {
        console.log(err);
        res.status(400).send();
      }
    );

  }
  // PUT & PATCH
  updateTicket = async (req, res) => {
    let { body, params } = req;
    Ticket.update({
        area: body.area,
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
  updateComment = async (req, res) => {
    let { body, params } = req;
    Comment.update({
        content: body.content,
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
  forwardTicket = async (req, res) =>{
    let { body, params } = req;
    let observers = body.observers;
    if (observers && observers.length > 0) {
      // user has passed a non-empty array of observers
      User.findAll({ where: { id: observers } })
      .then(async (users) => {
        if(users.length > 0){
          // Check if at least one observer exists, and only then:
          let observerList = users.map((user) => {return {userId: user.id, ticketId: params.id}});
          await Observer.destroy({ where: { ticketId: params.id } });
          await Observer.bulkCreate(observerList);
          res.status(201).send();
        } else {
          res.status(400).send({error: "Invalid observer ids"});
        }
      })
      .catch((err)=>{
        res.status(400).send({error: "Invalid observer ids"});
      });
    } else {
      res.status(400).send({error: "observers cannot be empty"})
    }
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
  deleteComment = (req, res) => {
    let { params } = req;
    Comment.destroy({ where: { id: params.id } })
      .then(res.status(200).send())
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
}

module.exports = new requestHandler();
