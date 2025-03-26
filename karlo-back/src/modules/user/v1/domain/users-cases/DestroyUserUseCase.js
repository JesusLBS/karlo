const db = require("../../../../../database/models");

class DestroyUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const transaction = await db.sequelize.transaction();
    try {
      const user = await this.userRepository.destroy(userData, { transaction });

      if (!user) {
        throw { statusCode: 404, message: "Data not found" };
      }

      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = DestroyUserUseCase;
