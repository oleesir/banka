module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Accounts', {
    accountId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    accountNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      default: null
    },
    ownerId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
        as: 'ownerId'
      }
    },
    type: {
      type: DataTypes.ENUM('current', 'savings', 'fixed'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'dormant'),
      allowNull: false,
      defaultValue: 'active'
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      default: null
    }
  }, {});
  Accounts.associate = (models) => {
    Accounts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'ownerId',
      onDelete: 'CASCADE'
    });
  };
  return Accounts;
};
