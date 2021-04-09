module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
<<<<<<< HEAD
    'User',
=======
    'user',
>>>>>>> db899ebc4404eaf8ba2fa080fc4bf4c94655871a
    {
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
<<<<<<< HEAD
      underscored: true,
=======
>>>>>>> db899ebc4404eaf8ba2fa080fc4bf4c94655871a
      timestamps: true
    }
  );

  return User;
};
