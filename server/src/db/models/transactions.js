module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    transactionId: {
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
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
        as: 'ownerId'
      }
    },
    cashierId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
        as: 'cashierId'
      }
    },
    type: {
      type: DataTypes.ENUM('debit', 'credit'),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      default: null
    },
    oldBalance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      default: null
    },
    newBalance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      default: null
    }
  }, {});
  Transactions.associate = (models) => {
    Transactions.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'ownerId',
      onDelete: 'CASCADE'
    });

    Transactions.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'cashierId',
      onDelete: 'CASCADE'
    });
  };
  return Transactions;
};
