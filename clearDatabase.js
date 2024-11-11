const fs = require('fs');
const path = require('path');


async function deleteUploads(){
  fs.readdir('./uploads', (err, files) => {
      if (err) throw err;
      // console.log(files)
      for (const file of files) {
      if (file != '.gitkeep')
        fs.unlink(path.join('./uploads', file), (err) => {
          if (err) throw err;
        });
      }
    });
}

const mysql = require("mysql2/promise");
mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}).then(async (connection) => {
  await connection.query(`DROP DATABASE ${process.env.DB_NAME};`);
  await connection.query(`CREATE DATABASE ${process.env.DB_NAME};`);
  await deleteUploads();
  await connection.end();
})
