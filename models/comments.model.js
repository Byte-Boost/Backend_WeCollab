module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
        },
        content: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        date: {
        type: DataTypes.DATE,
        allowNull: false,
        },
        commenterId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        ticketId: {
        type: DataTypes.INTEGER,
        allowNull: false
        }
    });
    
    Comment.associate = function(models) {
        Comment.belongsTo(models.User, {
        foreignKey: 'commenterId',
        onDelete: 'CASCADE'
        })
        Comment.belongsTo(models.Ticket, {
        foreignKey: 'ticketId',
        onDelete: 'CASCADE'
        })
    };
    
    return Comment;
  };
  