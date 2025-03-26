'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PurchaseOrder.init({
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: 'Please enter a business ID',
        },
        isInt: {
          msg: 'Business ID must be an integer',
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: 'Please enter a user ID',
        },
        isInt: {
          msg: 'User ID must be an integer',
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a status',
        },
      },
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a total amount',
        },
        isDecimal: {
          msg: 'Total must be a decimal value',
        },
      },
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a subtotal amount',
        },
        isDecimal: {
          msg: 'Subtotal must be a decimal value',
        },
      },
    },
    iva: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide an IVA value',
        },
        isDecimal: {
          msg: 'IVA must be a decimal value',
        },
      },
    },
    products: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Products cannot be empty',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'PurchaseOrder',
    tableName: 'PurchaseOrders',
    scopes: {
      raw: {
        raw: true,
        nest: true,
      },
      desc: {
        order: [['createdAt', 'desc']],
      },
    },
  });
  return PurchaseOrder;
};
