const { User } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
        },
        allowNull: false
      }
    },
    {
      underscored: true,
      timestamps: true
    }
  );
  Weet.associate = models => {
    Weet.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return Weet;
};
