const { User, Ticket, Comment, Observer } = require("../models/index.js");
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
        const dummyUsers = [
            {
              name: "Monkey D. Luffy",
              cpf: "12345678901",
              area: "Gestao",
              username: "luffy",
              password: await service.getHashed("password123"),
              roleId: 16,
              admin: true,
            },
            {
              name: "Roronoa Zoro",
              cpf: "23456789012",
              area: "Tecnica",
              username: "zoro",
              password: await service.getHashed("password123"),
              roleId: 10,
              admin: false,
            },
            {
              name: "Nami",
              cpf: "34567890123",
              area: "Negocios",
              username: "nami",
              password: await service.getHashed("password123"),
              roleId: 7,
              admin: false,
            },
            {
              name: "Usopp",
              cpf: "45678901234",
              area: "Tecnica",
              username: "usopp",
              password: await service.getHashed("password123"),
              roleId: 12,
              admin: false,
            },
            {
              name: "Sanji",
              cpf: "56789012345",
              area: "Administrativa",
              username: "sanji",
              password: await service.getHashed("password123"),
              roleId: 3,
              admin: false,
            },
            {
              name: "Tony Tony Chopper",
              cpf: "67890123456",
              area: "Tecnica",
              username: "chopper",
              password: await service.getHashed("password123"),
              roleId: 8,
              admin: false,
            },
            {
              name: "Nico Robin",
              cpf: "78901234567",
              area: "Administrativa",
              username: "robin",
              password: await service.getHashed("password123"),
              roleId: 2,
              admin: false,
            },
            {
              name: "Franky",
              cpf: "89012345678",
              area: "Tecnica",
              username: "franky",
              password: await service.getHashed("password123"),
              roleId: 15,
              admin: false,
            },
            {
              name: "Brook",
              cpf: "90123456789",
              area: "Administrativa",
              username: "brook",
              password: await service.getHashed("password123"),
              roleId: 5,
              admin: false,
            },
            {
              name: "Jinbe",
              cpf: "01234567890",
              area: "Gestao",
              username: "jinbe",
              password: await service.getHashed("password123"),
              roleId: 17,
              admin: true,
            }
          ];
          
        User.bulkCreate([admin, ...dummyUsers])
            .then(() => {
                console.log("Dummy Data created successfully");
            })
            .catch((err) => {
                console.log("Error creating Dummy Data: ", err);
            });
        
            
        const tickets = [
            {
                area: "Tecnica",
                title: "Network Optimization",
                description: "Improving the network speed and stability.",
                requesterId: 3, // Roronoa Zoro
                status: "Em Andamento",
                dateOfCreation: new Date("2023-09-15"),
            },
            {
                area: "Negocios",
                title: "Market Research Analysis",
                description: "Conducting a thorough analysis of current market trends.",
                requesterId: 4, // Nami
                status: "Novo",
                dateOfCreation: new Date("2023-09-22"),
            },
            {
                area: "Administrativa",
                title: "Office Supplies Restock",
                description: "Ordering and restocking office supplies for the month.",
                requesterId: 7, // Nico Robin
                status: "Concluído",
                dateOfCreation: new Date("2023-10-01"),
            },
            {
                area: "Tecnica",
                title: "Server Maintenance",
                description: "Scheduled maintenance of the main servers.",
                requesterId: 6, // Chopper
                status: "Em Andamento",
                dateOfCreation: new Date("2023-10-05"),
            },
            {
                area: "Administrativa",
                title: "Staff Attendance",
                description: "Monitoring and reporting daily attendance records.",
                requesterId: 9, // Brook
                status: "Novo",
                dateOfCreation: new Date("2024-10-10"),
            },
            {
                area: "Gestao",
                title: "Team Leadership Training",
                description: "Conducting leadership training for new managers.",
                requesterId: 10, // Jinbe
                status: "Concluído",
                dateOfCreation: new Date("2024-10-18"),
            }
        ];
            
        const observers = [
            { userId: 4, ticketId: 1 }, // Nami
            { userId: 6, ticketId: 1 }, // Chopper
            { userId: 2, ticketId: 2 }, // Luffy
            { userId: 7, ticketId: 2 }, // Robin
            { userId: 5, ticketId: 3 }, // Sanji
            { userId: 10, ticketId: 3 }, // Jinbe
            { userId: 8, ticketId: 4 }, // Franky
            { userId: 9, ticketId: 4 }, // Brook
            { userId: 5, ticketId: 5 }, // Sanji
            { userId: 2, ticketId: 5 }, // Luffy
            { userId: 4, ticketId: 5 }, // Nami
            { userId: 3, ticketId: 6 }, // Zoro
            { userId: 8, ticketId: 6 }, // Franky
            { userId: 7, ticketId: 6 }  // Robin
        ];
              
        Ticket.bulkCreate(tickets)
        .then(() => {

            Observer.bulkCreate(observers).then(()=>{
                console.log("Observers created successfully");
            }).catch((err)=>{
                console.log("Error creating observers: ", err);
            });

            console.log("Tickets created successfully");
        })
        .catch((err) => {
            console.log("Error creating tickets: ", err);
        });

        // Ticket 1 - "Network Optimization" (2 comments)
        let comments = [
            {
            content: "This issue needs to be resolved ASAP!",
            ticketId: 1,
            commenterId: 2, // Luffy
            date: new Date("2023-09-16")
            },
            {
            content: "Working on the network adjustments now.",
            ticketId: 1,
            commenterId: 3, // Zoro
            date: new Date("2023-09-17")
            },
        
            // Ticket 2 - "Market Research Analysis" (No comments)
        
            // Ticket 3 - "Office Supplies Restock" (1 comment)
            {
            content: "Supplies have been ordered, waiting for confirmation.",
            ticketId: 3,
            commenterId: 7, // Robin
            date: new Date("2023-10-02")
            },
        
            // Ticket 4 - "Server Maintenance" (3 comments)
            {
            content: "Scheduled maintenance will start tomorrow.",
            ticketId: 4,
            commenterId: 6, // Chopper
            date: new Date("2023-10-06")
            },
            {
            content: "Servers are down for maintenance now.",
            ticketId: 4,
            commenterId: 8, // Franky
            date: new Date("2023-10-06")
            },
            {
            content: "Maintenance complete, everything is up and running.",
            ticketId: 4,
            commenterId: 8, // Franky
            date: new Date("2023-10-07")
            },
        
            // Ticket 5 - "Staff Attendance" (No comments)
        
            // Ticket 6 - "Team Leadership Training" (2 comments)
            {
            content: "Training materials have been shared with the team.",
            ticketId: 6,
            commenterId: 10, // Jinbe
            date: new Date("2023-10-19")
            },
            {
            content: "All teams have completed the training successfully.",
            ticketId: 6,
            commenterId: 10, // Jinbe
            date: new Date("2023-10-20")
            }
        ];
  
        Comment.bulkCreate(comments)
        .then(() => {
            console.log("Comments created successfully");
        })
        .catch((err) => {
            console.log("Error creating comments: ", err);
        });
    }
}

module.exports = new dummyDataService();