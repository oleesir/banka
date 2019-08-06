module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    role: {
      type: DataTypes.ENUM('client', 'staff'),
      allowNull: false,
      defaultValue: 'client'
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  Users.associate = (models) => {
    Users.hasMany(models.Accounts, {
      foreignKey: 'ownerId',
      as: 'userId',
      onDelete: 'CASCADE'
    });

    Users.hasMany(models.Transactions, {
      foreignKey: 'cashierId',
      as: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Users;
};
