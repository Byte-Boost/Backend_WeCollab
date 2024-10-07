module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    areaName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    }
  }); 
  Role.associate = function(models) {
    Role.belongsTo(models.Area, {
      foreignKey: 'areaName',
      onDelete: 'CASCADE'
    })
    Role.hasMany(models.User, {
      foreignKey: 'role',
    })
  };
  return Role;
};
