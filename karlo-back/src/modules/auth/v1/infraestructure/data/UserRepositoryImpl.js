const UserRepository = require("../../domain/repositories/UserRepository");
const db = require("../../../../../database/models/index");
const User = require("../../domain/entities/User");

class UserRepositoryImpl extends UserRepository {
  async findUserByEmail(email) {
    const user = await db.User.scope("raw").findOne({
      where: { email },
    });

    if (!user) return null;
    return new User(user.id, user.email, user.password, user.rol);
  }
}

module.exports = UserRepositoryImpl;
