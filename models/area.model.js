module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define("Area", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    }
  });
  Area.associate = function(models) {
    Area.hasMany(models.Role, {
      foreignKey: 'areaName',
    }),
    Area.hasMany(models.User, {
      foreignKey: 'area',
    })
    Area.hasMany(models.Ticket, {
      foreignKey: 'area',
    })
  };
  return Area;
};
