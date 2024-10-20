const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./models');
const cors = require('cors');
const authMiddleware = require('./middleware/auth.middleware');
const startup = require('./services/startup.services');
const dummyData = require('./services/dummyData.services');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JJM-Collab API',
      version: '0.8.0',
    }, 
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());

app.use(express.json())

app.use('/accounts', require('./routes/account.routes'));

app.use(authMiddleware);
app.use('/users', require('./routes/user.routes'));
app.use('/tickets', require('./routes/ticket.routes'));
app.use('/areas', require('./routes/area.routes'));
app.use('/roles', require('./routes/role.routes'));
app.use('/archives', require('./routes/archive.routes'));

db.sequelize.sync().then(async ()=>{
  await startup.setupAreas()
  // Create an admin user if it doesn't exist
  if (process.env.DEVELOPMENT_TESTS) dummyData.generateDummyData();
  else startup.generateAdmin();
  app.listen(PORT, ()=>console.log(`Server running on https://localhost:${PORT}`));
});