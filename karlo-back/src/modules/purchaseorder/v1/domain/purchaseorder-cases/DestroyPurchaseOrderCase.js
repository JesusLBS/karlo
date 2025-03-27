const db = require("../../../../../database/models");

class DestroyPurcharseOrderUseCase {
  constructor(purchaseOrderRepository) {
    this.purchaseOrderRepository = purchaseOrderRepository;
  }

  async execute(purchaseOrderData) {
    const transaction = await db.sequelize.transaction();
    try {
      const data = await this.purchaseOrderRepository.destroy(purchaseOrderData, { transaction });

      if (!data) {
        throw { statusCode: 404, message: "Data not found" };
      }

      await transaction.commit();
      return data;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = DestroyPurcharseOrderUseCase;
