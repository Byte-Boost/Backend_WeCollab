module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    areaName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }); 
  Role.associate = function(models) {
    Role.belongsTo(models.Area, {
      foreignKey: 'areaName',
      onDelete: 'CASCADE'
    })
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
    })
  };
  return Role;
};
