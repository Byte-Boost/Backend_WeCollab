const { User, Ticket, Comment } = require("../models/index.js");
const { Op } = require('sequelize');
const service = require("./account.services.js");

class dummyDataService {
    async generateDummyData(){
        let admin = {
            name: process.env.ADM_CREDENTIALS_NAME,
            cpf: process.env.ADM_CREDENTIALS_CPF,
            username: process.env.ADM_CREDENTIALS_USERNAME,
            password: await service.getHashed(process.env.ADM_CREDENTIALS_PASSWORD),
            role: "Manager",
            admin: true
        };
        let user1 = {
            name: "Jaqueline Veloso",
            cpf: "11111111111",
            username: "jaquemfvs",
            password: await service.getHashed("123"),
            role: "User",
            admin: false
        };
        let user2 = {
            name: "João Eduardo",
            cpf: "22222222222",
            username: "joao-eduardo17",
            password: await service.getHashed("123"),
            role: "User",
            admin: false
        };
        let user3 = {
            name: "Marcos Antônio",
            cpf: "33333333333",
            username: "OOoutroMarcos",
            password: await service.getHashed("123"),
            role: "User",
            admin: false
        };
        let user4 = {
            name: "Markos Vinicius Nunes",
            cpf: "44444444444",
            username: "MarkVN2",
            password: await service.getHashed("123"),
            role: "Manager",
            admin: false
        };
        let user5 = {
            name: "Sandro-Pimentel",
            cpf: "55555555555",
            username: "Sandro-Pimentel",
            password: await service.getHashed("123"),
            role: "User",
            admin: false
        };
        let user6 = {
            name: "Vinicius Felipe Forcato",
            cpf: "66666666666",
            username: "nininhosam",
            password: await service.getHashed("123"),
            role: "User",
            admin: false
        };
        let user7 = {
            name: "Vitor Saborito",
            cpf: "77777777777",
            username: "VituuSaborito",
            password: await service.getHashed("123"),
            role: "User",
            admin: false
        };
        User.bulkCreate([admin, user1, user2, user3, user4, user5, user6, user7])
            .then(() => {
                console.log("Dummy Data created successfully");
            })
            .catch((err) => {
                console.log("Error creating Dummy Data: ", err);
            });
        
            
        let ticket1 = {
            area: "Recursos Humanos",
            status: "Concluído",
            category: "Suporte",
            title: "Necessito de mais funcionarios",
            description: "A quantidade de trabalho excedeu o experado",
            requesterId: 2,
            dateOfCreation: new Date("2024-06-10")
        };
        let ticket2 = {
            area: "Area de teste",
            status: "Em andamento",
            category: "Agendamento",
            title: "Reuniões entre os dias 06 e 09",
            description: "Pedido para agendar reuniões com [xxxx] entre os dias 06/10 e 09/10",
            requesterId: 4,
            dateOfCreation: new Date("2024-09-25")
        };
        let ticket3 = {
            area: "Suporte",
            status: "Novo",
            category: "Suporte",
            title: "Sistemas estão fora do ar desde as 8am",
            description: "Os sistemas internos cairam as 8am do dia 25/09, e ainda não retornaram",
            requesterId: 7,
            dateOfCreation: new Date("2024-09-25")
        };
        Ticket.bulkCreate([ticket1, ticket2, ticket3])
        .then(() => {
            console.log("Tickets created successfully");
        })
        .catch((err) => {
            console.log("Error creating tickets: ", err);
        });

        let comment1 = {
            content: "Pedido sendo considerado.",
            ticketId: 1,
            commenterId: 1,
            date: new Date("2024-06-11")
        };
        let comment2 = {
            content: "Pedido aprovado.",
            ticketId: 1,
            commenterId: 1,
            date: new Date("2024-06-12")
        };
        let comment3 = {
            content: "Pedido concedido, Ticket realizado.",
            ticketId: 1,
            commenterId: 1,
            date: new Date("2024-06-12")
        };
        let comment4 = {
            content: "Não será possível agendar reuniões no dia 06/10",
            ticketId: 2,
            commenterId: 1,
            date: new Date("2024-09-25")
        };
        let comment5 = {
            content: "Será possível para os dias 07-10 de outubro, nesse caso?",
            ticketId: 2,
            commenterId: 4,
            date: new Date("2024-09-26")
        };
        let comment6 = {
            content: "Sim, estes dias estão disponíveis. gostária de agendá-los?",
            ticketId: 2,
            commenterId: 1,
            date: new Date("2024-09-26")
        };
        Comment.bulkCreate([comment1, comment2, comment3, comment4, comment5, comment6])
        .then(() => {
            console.log("Comments created successfully");
        })
        .catch((err) => {
            console.log("Error creating comments: ", err);
        });
    }
}

module.exports = new dummyDataService();