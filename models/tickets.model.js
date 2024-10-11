module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define("Ticket", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      area: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validator: {
          isIn: ["Novo", "Em Andamento", "Concluído"]
        },
        defaultValue: "Novo"
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateOfCreation: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      requesterId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    Ticket.associate = function(models) {
      Ticket.belongsTo(models.User, {
        foreignKey: 'requesterId',
        onDelete: 'CASCADE'
      })
      Ticket.belongsTo(models.Area, {
        foreignKey: 'area',
        onDelete: 'CASCADE'
      })
      Ticket.hasMany(models.Comment, {
        foreignKey: 'ticketId',
      })
      Ticket.belongsToMany(models.User, {
        through: 'TicketObservers',
        foreignKey: 'ticketId'
      })
    };
    return Ticket;
  };
  