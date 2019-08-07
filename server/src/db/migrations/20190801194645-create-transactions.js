module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    transactionId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    accountNumber: {
      type: Sequelize.BIGINT,
      allowNull: false,
      default: null
    },
    ownerId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
        as: 'ownerId'
      }
    },
    cashierId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
        as: 'cashierId'
      }
    },
    type: {
      type: Sequelize.ENUM('debit', 'credit'),
      allowNull: false
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      default: null
    },
    oldBalance: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      default: null
    },
    newBalance: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      default: null
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Transactions')
};
