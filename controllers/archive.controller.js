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
            [Op.or]: [
              { userId: user.id },
              {
                areaName: user.area,
                userId: null
              },
              { 
                areaName: null,
                userId: null
              }
            ]
          },
          attributes: ['filePath','name','userId','id','areaName']
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
        attributes: ['filePath','name','areaName','userId','id']
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
      let {area} = body;
      let foundUser; 

      if (body.userId) {
       foundUser = await User.findOne({ where: { id:body.userId }, attributes: ['area'] });
      }

      if (!foundUser && !area && body.userId) {
       return res.status(404).send({ message: "User not found" });
      }

      const areaName = foundUser?.area ? foundUser.area : null;
      let archive = {
        name: file.originalname,
        filePath : file.filename,
        areaName : areaName? areaName : area? area : null,
        userId : body.userId? body.userId : null,
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
      console.log(error);
    }
  };
  //DELETE
  deleteArchive = async (req, res) => {
    try {
      const { filename } = req.params;
      const archive = await Archive.findOne({ where: { filePath : filename } });
      if (!archive) {
        return res.status(404).send({ message: "Archive not found" });
      }
      const filePath = path.join(__dirname, '../uploads', archive.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await Archive.destroy({ where: { filePath : filename } });
      res.status(200).send({ message: "Archive deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting archive", error });
    }
  }
}
module.exports = new requestHandler();