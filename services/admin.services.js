const { User } = require("../models/index.js");
const service = require("./account.services.js");

class adminService {
    async generateAdmin(){
        User.findAll({ where: { cpf: process.env.ADM_CREDENTIALS_CPF }, attributes: { exclude: ["password", "username"]} })
            .then(async (seller) => {
                if (seller.length === 0) {
                    let admin = {
                        name: process.env.ADM_CREDENTIALS_NAME,
                        cpf: process.env.ADM_CREDENTIALS_CPF,
                        username: process.env.ADM_CREDENTIALS_USERNAME,
                        password: await service.getHashed(process.env.ADM_CREDENTIALS_PASSWORD),
                        role: "Manager",
                        admin: true
                    };
                    User.create(admin)
                        .then(() => {
                            console.log("Admin created successfully");
                        })
                        .catch((err) => {
                            console.log("Error creating admin: ", err);
                        });
                }
            })
            .catch((err) => {
                console.log("Error while finding admin: ", err);
            });
    }
}

module.exports = new adminService();