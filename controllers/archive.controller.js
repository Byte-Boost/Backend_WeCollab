const { Archive, Area, User } = require("../models");
const { Op } = require("sequelize");

const path = require('path');



class requestHandler {
  // GET
  downloadArchive = async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, '../uploads', filename);
        res.download(filePath, filename, (err) => {
          if (err) {
            res.status(500).send({ message: "Error downloading file", error: err });
          }
        });
      } catch (error) {
        res.status(500).send({ message: "Error downloading file", error });
      }
  };
  getArchives = async (req, res) => {
    try {
      let { user } = req;
      if (!user.admin) {
        const archives = await Archive.findAll({
          where: {
            userId: user.id
          },
          attributes: ['filePath','name','area','userId',]
        });
        res.status(200).send(archives);
      }
      else if(user.admin){
        const archives = await Archive.findAll();
        res.status(200).send(archives);
      }
      else{
      const archives = await Archive.findAll(
      {
        where: { areaName : user.area },
        attributes: ['filePath','name','area','userId',] // Select only the filePath and name attributes
      });
      res.status(200).send(archives);
      }
    } catch (error) {
      res.status(500).send({ message: "Error retrieving file paths", error });
    }
  };
  // POST
  uploadArchive = async (req, res) => {
    try {
      // Access the uploaded file via req.file
      const file = req.file;
      if (!file) {
        return res.status(400).send({ message: "No file uploaded" });
      }

      let { body, params, user } = req;
      console.log(user.id)
      const filePath = path.join('uploads', file.filename);
      let archive = {
        name: file.originalname,
        filePath : filePath,
        areaName : body.areaName,
        userId : body.userId,
        uploaderId : user.id
      }

      Archive.create(archive).then(() => {
          res.status(201).send({ message: "File uploaded successfully", file: archive });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send();
      });
    } catch (error) {
      res.status(500).send({ message: "Error uploading file", error });
    }
  };
}
module.exports = new requestHandler();