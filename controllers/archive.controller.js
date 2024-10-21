const { Archive, Area, User } = require("../models");
const { Op } = require("sequelize");
const fs = require('fs');
const path = require('path');



class requestHandler {
  // GET
  downloadArchive = async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, '../uploads', filename);

      // Log the file path to debug
      console.log(`Attempting to download file: ${filePath}`);

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return res.status(404).send({ message: "File not found" });
      }

      res.download(filePath, filename, (err) => {
        if (err) {
          console.error(`Error downloading file: ${err}`);
          res.status(500).send({ message: "Error downloading file", error: err });
        }
      });
    } catch (error) {
      console.error(`Error in downloadArchive method: ${error}`);
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
          attributes: ['filePath','name','userId','id']
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
        attributes: ['filePath','name','areaName','userId','id'] // Select only the filePath and name attributes
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
      let archive = {
        name: file.originalname,
        filePath : file.filename,
        areaName : User.find({where: {id: body.userId}, attributes: ['area']}),
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