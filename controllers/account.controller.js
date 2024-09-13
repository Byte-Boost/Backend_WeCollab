const { User } = require("../models/index.js");
const service = require("../services/account.services.js");

class requestHandler {
  // POST
  registerUser = async (req, res) => {
    let { body } = req;

    // Assert CPF is in the correct format
    body.cpf = String(body.cpf).replace(/[\D]+/g, "");
    
    // Create user object
    var user = {
      name: body.name,
      cpf: body.cpf,
      area: body.area || null,
      username: body.username,
      role: (body.role == "Manager" || body.role == "Admin") ? body.role : "User",
      password: await service.getHashed(body.password),
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
    User.update({
      name: body.name,
      area: body.area,
      role: body.role,
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
