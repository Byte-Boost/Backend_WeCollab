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
              name: "Liam Carter",
              cpf: "12345678901",
              area: "Gestao",
              username: "LiamTheExplorer",
              password: await service.getHashed("password123"),
              roleId: 16,
              admin: true,
            },
            {
              name: "Ava Thompson",
              cpf: "23456789012",
              area: "Tecnica",
              username: "AvaInTheSky",
              password: await service.getHashed("password123"),
              roleId: 10,
              admin: false,
            },
            {
              name: "Noah Patel",
              cpf: "34567890123",
              area: "Negocios",
              username: "NoahTheNavigator",
              password: await service.getHashed("password123"),
              roleId: 7,
              admin: false,
            },
            {
              name: "Sophia Chen",
              cpf: "45678901234",
              area: "Tecnica",
              username: "SophiaScribe",
              password: await service.getHashed("password123"),
              roleId: 12,
              admin: false,
            },
            {
              name: "Mason Lee",
              cpf: "56789012345",
              area: "Administrativa",
              username: "MasonMystic",
              password: await service.getHashed("password123"),
              roleId: 3,
              admin: false,
            },
            {
              name: "Isabella Kim",
              cpf: "67890123456",
              area: "Tecnica",
              username: "BellaBrilliant",
              password: await service.getHashed("password123"),
              roleId: 8,
              admin: false,
            },
            {
              name: "Lucas Martinez",
              cpf: "78901234567",
              area: "Administrativa",
              username: "LucasTheLegend",
              password: await service.getHashed("password123"),
              roleId: 2,
              admin: false,
            },
            {
              name: "Mia Johnson",
              cpf: "89012345678",
              area: "Tecnica",
              username: "MiaMagical",
              password: await service.getHashed("password123"),
              roleId: 15,
              admin: false,
            },
            {
              name: "Ethan Brown",
              cpf: "90123456789",
              area: "Administrativa",
              username: "EthanEclipse",
              password: await service.getHashed("password123"),
              roleId: 5,
              admin: false,
            },
            {
              name: "Olivia Garcia",
              cpf: "01234567890",
              area: "Gestao",
              username: "OliviaOdyssey",
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
                requesterId: 3, // Ava Thompson
                status: "Em andamento",
                dateOfCreation: new Date("2023-09-15"),
            },
            {
                area: "Negocios",
                title: "Market Research Analysis",
                description: "Conducting a thorough analysis of current market trends.",
                requesterId: 4, // Noah Patel
                status: "Novo",
                dateOfCreation: new Date("2023-09-22"),
            },
            {
                area: "Administrativa",
                title: "Office Supplies Restock",
                description: "Ordering and restocking office supplies for the month.",
                requesterId: 7, // Lucas Martinez
                status: "Concluído",
                dateOfCreation: new Date("2023-10-01"),
            },
            {
                area: "Tecnica",
                title: "Server Maintenance",
                description: "Scheduled maintenance of the main servers.",
                requesterId: 6, // Isabella Kim
                status: "Em andamento",
                dateOfCreation: new Date("2023-10-05"),
            },
            {
                area: "Administrativa",
                title: "Staff Attendance",
                description: "Monitoring and reporting daily attendance records.",
                requesterId: 9, // Ethan Brown
                status: "Novo",
                dateOfCreation: new Date("2024-10-10"),
            },
            {
                area: "Gestao",
                title: "Team Leadership Training",
                description: "Conducting leadership training for new managers.",
                requesterId: 10, // EthanEclipse
                status: "Concluído",
                dateOfCreation: new Date("2024-10-18"),
            }
        ];
            
        const observers = [
            { userId: 4, ticketId: 1 }, // Noah Patel
            { userId: 6, ticketId: 1 }, // Isabella Kim
            { userId: 2, ticketId: 2 }, // LiamTheExplorer
            { userId: 7, ticketId: 2 }, // Robin
            { userId: 5, ticketId: 3 }, // Mason Lee
            { userId: 10, ticketId: 3 }, // EthanEclipse
            { userId: 8, ticketId: 4 }, // Mia Johnson 
            { userId: 9, ticketId: 4 }, // Ethan Brown
            { userId: 5, ticketId: 5 }, // Mason Lee
            { userId: 2, ticketId: 5 }, // LiamTheExplorer
            { userId: 4, ticketId: 5 }, // Noah Patel
            { userId: 3, ticketId: 6 }, // AvaInTheSky
            { userId: 8, ticketId: 6 }, // Mia Johnson
            { userId: 7, ticketId: 6 }  // Robin
        ];
              
        Ticket.bulkCreate(tickets)
        .then(() => {

            Observer.bulkCreate(observers).then(()=>{
              let comments = [
                {
                content: "This issue needs to be resolved ASAP!",
                ticketId: 1,
                commenterId: 2, // LiamTheExplorer
                date: new Date("2023-09-16")
                },
                {
                content: "Working on the network adjustments now.",
                ticketId: 1,
                commenterId: 3, // AvaInTheSky
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
                commenterId: 6, // Isabella Kim
                date: new Date("2023-10-06")
                },
                {
                content: "Servers are down for maintenance now.",
                ticketId: 4,
                commenterId: 8, // Mia Johnson
                date: new Date("2023-10-06")
                },
                {
                content: "Maintenance complete, everything is up and running.",
                ticketId: 4,
                commenterId: 8, // Mia Johnson
                date: new Date("2023-10-07")
                },
            
                // Ticket 5 - "Staff Attendance" (No comments)
            
                // Ticket 6 - "Team Leadership Training" (2 comments)
                {
                content: "Training materials have been shared with the team.",
                ticketId: 6,
                commenterId: 10, // EthanEclipse
                date: new Date("2023-10-19")
                },
                {
                content: "All teams have completed the training successfully.",
                ticketId: 6,
                commenterId: 10, // EthanEclipse
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

    }
}

module.exports = new dummyDataService();