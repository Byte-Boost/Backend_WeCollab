const { User, Area, Role } = require("../models/index.js");
const service = require("./account.services.js");
const { Op } = require("sequelize");

class startupService {
    async setupAreas(){
        Area.findAll({where: {
            name: ["Administrativa", "Negocios", "Tecnica", "Gestao"]
        }}).then(async (areas)=> {
            if (areas.length === 0) {
                let ad = {
                    name: "Administrativa"
                }
                let ng = {
                    name: "Negocios"
                }
                let tc = {
                    name: "Tecnica"
                }
                let gs = {
                    name: "Gestao"
                }

                Area.bulkCreate([ad, ng, tc, gs])
                .then(() => {
                    console.log("Areas created successfully");
                })
                .catch((err) => {
                    console.log("Error creating areas: ", err);
                });
            }
        })
        .catch((err) => {
            console.log("Error while creating areas: ", err);
        });

        Role.findAll()
        .then(async (roles)=> {
            if (roles.length === 0) {
                let ad1 = {
                    name: "Assistente Administrativo",
                    areaName: "Administrativa"
                }
                let ad2 = {
                    name: "Analista Administrativo I",
                    areaName: "Administrativa"
                }
                let ad3 = {
                    name: "Analista Administrativo II",
                    areaName: "Administrativa"
                }
                let ad4 = {
                    name: "Analista Administrativo III",
                    areaName: "Administrativa"
                }
                let ad5 = {
                    name: "Analista de RH",
                    areaName: "Administrativa"
                }
                let ad6 = {
                    name: "Estagiário Administrativo",
                    areaName: "Administrativa"
                }
                let ng1 = {
                    name: "Vendedor",
                    areaName: "Negocios"
                }
                let tc1 = {
                    name: "Especialista em Logística",
                    areaName: "Tecnica"
                }
                let tc2 = {
                    name: "Operador de logística I",
                    areaName: "Tecnica"
                }
                let tc3 = {
                    name: "Operador de logística II",
                    areaName: "Tecnica"
                }
                let tc4 = {
                    name: "Analista de Logística I",
                    areaName: "Tecnica"
                }
                let tc5 = {
                    name: "Analista de Logística II",
                    areaName: "Tecnica"
                }
                let tc6 = {
                    name: "Analista de Logística III",
                    areaName: "Tecnica"
                }
                let tc7 = {
                    name: "Motorista",
                    areaName: "Tecnica"
                }
                let tc8 = {
                    name: "Estagiário Operacional",
                    areaName: "Tecnica"
                }
                let gs1 = {
                    name: "Gerente de Operações",
                    areaName: "Gestao"
                }
                let gs2= {
                    name: "Comercial",
                    areaName: "Gestao"
                }
                let gs3 = {
                    name: "Diretor Executivo",
                    areaName: "Gestao"
                }

                Role.bulkCreate([
                    ad1, ad2, ad3, ad4, ad5, ad6, 
                    ng1, 
                    tc1, tc2, tc3, tc4, tc5, tc6, tc7, tc8, 
                    gs1, gs2, gs3
                ])
                .then(() => {
                    console.log("Roles created successfully");
                })
                .catch((err) => {
                    console.log("Error creating roles: ", err);
                });
            }
        })
        .catch((err) => {
            console.log("Error while creating areas: ", err);
        });

    }

    async generateAdmin(){
        User.findAll({ where: { cpf: process.env.ADM_CREDENTIALS_CPF }, attributes: { exclude: ["password", "username"]} })
            .then(async (users) => {
                if (users.length === 0) {
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

module.exports = new startupService();