module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Accounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    accountId: {
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
    type: {
      type: Sequelize.ENUM('current', 'savings', 'fixed'),
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('active', 'dormant'),
      allowNull: false,
      defaultValue: 'active'
    },
    balance: {
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
  down: queryInterface => queryInterface.dropTable('Accounts')
};
