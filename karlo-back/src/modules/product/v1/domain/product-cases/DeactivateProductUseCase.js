const db = require("../../../../../database/models");

class DeactivateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    const transaction = await db.sequelize.transaction();
    try {
      const data = await this.productRepository.deactivate(productData, {
        transaction,
      });

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

module.exports = DeactivateProductUseCase;
