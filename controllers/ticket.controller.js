const { Ticket, Comment, User } = require("../models");
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
  getComment = (req, res) => {
    let { query } = req;
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
    console.log(Ticket)
    console.log(Comment)
    console.log(User)
    Ticket.create(ticket)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  createComment = async (req, res) => {
    let { body } = req;

    // Create Ticket Comment object
    var comment = {
      content: body.content || null,
      ticketId: body.ticketId,
      commenterId: body.commenterId,
      date: Date.now()
    };
    
    // Create comment
    Comment.create(comment)
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
