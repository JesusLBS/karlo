'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PurchaseOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      businessId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "Businesses",
          },
          key: "id",
          as: "businessId",
        },
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
          as: "userId",
        },
      },
      status: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.DECIMAL(10, 2)
      },
      subtotal: {
        type: Sequelize.DECIMAL(10, 2)
      },
      iva: {
        type: Sequelize.DECIMAL(10, 2)
      },
      products: {
        type: Sequelize.JSONB
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PurchaseOrders');
  }
};