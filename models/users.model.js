module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
    },
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [11, 11],
        is: {
          args: /^\d{11}$/,
          msg: "Invalid CPF format",
        },
      }
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        isIn: ["User", "Manager"]
      },
      defaultValue: "User"
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Ticket, {
      foreignKey: 'requesterId',
    })
    User.hasMany(models.Comment, {
      foreignKey: 'commenterId',
    })
  };
  return User;
};
