const db = require("../../../../../database/models");

class UpdateBusinessCase {
  constructor(businesessRepository) {
    this.businesessRepository = businesessRepository;
  }

  async execute(businessData) {
    const transaction = await db.sequelize.transaction();
    try {
      const data = await this.businesessRepository.update(businessData, { transaction });

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

module.exports = UpdateBusinessCase;
