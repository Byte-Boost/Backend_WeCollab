const db = require("../models")
const { User, Role } = require("../models");
const { Op } = require("sequelize");
const service = require("../services/account.services.js");

class requestHandler {
  // GET
  getUsers = (req, res) => {
    let { query, user } = req;
    // Filter options
    let isAdmin = user.admin;
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
      order: sortBy(sortMethod),
      offset: (page - 1) * limit,
      limit: limit,
      include: [{ model: Role, attributes: ["name"] }],
      attributes: isAdmin ? { exclude: ["password"] } : ["id", "name"],
    };

    // Query & response
    User.findAndCountAll(findOpt)
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
    User.findAll({ where: { cpf: params.cpf }, include: [{ model: Role, attributes: ["name"] }], attributes: { exclude: ["password"]} })
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
    User.findByPk(params.id, {include: [{ model: Role, attributes: ["name"] }], attributes: { exclude: ["password"]}}).then((user) => {
            res.status(200).send(user);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send();
          });
  }
  getSelf = (req, res) => {
    let { user } = req;
    User.findByPk(user.id, {include: [{ model: Role, attributes: ["name"] }], attributes: { exclude: ["password"]}})
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  }

// ACCOUNT ROUTE
  // POST
  registerUser = async (req, res) => {
    let { body } = req;

    // Assert CPF is in the correct format
    body.cpf = String(body.cpf).replace(/[\D]+/g, "");

    let role = {id: null}
    if (body.role != null) {
      await Role.findOne({ where: { name: body.role } })
      .then((r) => {role = r})
    }

    if (role){
      // Create user object
      var user = {
        name: body.name,
        cpf: body.cpf,
        area: body.area,
        username: body.username,
        password: await service.getHashed(body.password),
        roleId: role.id ? role.id : null,
        admin: body.admin || false
      };
  
      // Create user
      User.create(user)
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send();
      });
    } else {
      res.status(400).send({error: "Role not found"});
    }
  };

  loginUser = async (req, res) => {
    let { body } = req;

    const user = await User.findOne({ where: { username: body.username } });
    
    try {
      if (!user) throw new Error("User does not exist");
      const token = await service.login(user, body.password);
      res.status(200).json({ token: token });
    } catch (err) {
      res.status(401).send({error:err.message});
    }

  };

  // PUT
  updateUser = async (req, res) => {
    let { body, params } = req;
    
    let role = body.role
    if (body.role != null) {
      await Role.findOne({ where: { name: body.role } })
      .then((r) => {
        role = r ? r.id : null})
    }

    if (role !== null){
      User.update({
        username: body.username,
        name: body.name,
        area: body.area,
        roleId: role,
        admin: body.admin,
        }, {
        where: {
          id: params.id
        },
      }).then(()=>{
        res.status(200).send()
      }).catch((err) => {
        console.log(err);
        res.status(400).send({error: "Invalid request"});
      });


    } else {
      res.status(400).send({error: "Role not found"});
    }

  }

  resetPassword = async (req, res) => {
    try {
      const { id } = req.params;
      const defaultPassword = "123456"; 
      const hashedPassword = await service.getHashed(defaultPassword);
      
      await User.update({ password: hashedPassword }, { where: { id } });
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error resetting password" });
    }
  };

  updatePassword = async (req, res) => {
    const { user, body } = req;
    User.findByPk(user.id).then(async (fullUser)=>{
      const passwordMatch = await service.compareHash(body.currentPassword, fullUser.password);
      
      if (!passwordMatch) {
        return res.status(401).send({ error: "Current password incorrect" });
      }
  
      const hashedNewPassword = await service.getHashed(body.newPassword);
      
      User.update({ password: hashedNewPassword }, { where: { id: user.id } })
        .then(()=>{
            res.status(200).send();
        }).catch ((error)=>{
          console.error(error);
          res.status(500).send({ error: "Error updating password" });
        }) 

    }).catch((error)=>{
        console.error(error);
        res.status(500).send({ error: "Error finding user" });
    })
  };

  updatePfp = async (req, res) =>{
    let { body, user } = req;

    if (body.pfp !== null){
      User.update({
        pfp: body.pfp,
        }, {
        where: {
          id: user.id
        },
      }).then(()=>{
        res.status(200).send()
      }).catch((err) => {
        console.log(err);
        res.status(400).send({error: "Invalid request"});
      });
    } else {
      res.status(400).send({error: "Invalid request"});
    }
  }
  
  // DELETE
  deleteUser = (req, res) => {
    let { params } = req;
    User.destroy({ where: { id: params.id } })
      .then(res.status(200).send())
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
}

module.exports = new requestHandler();
