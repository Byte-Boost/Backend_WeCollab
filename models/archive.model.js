module.exports = (sequelize, DataTypes) => {
  const Archive = sequelize.define('Archive', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Archive.associate = function(models) {
    Archive.belongsTo(models.Area, { foreignKey: 'areaName', as: 'area' });
    Archive.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Archive.belongsTo(models.User, { foreignKey: 'uploaderId', as: 'uploader' });
  };

  return Archive;
};