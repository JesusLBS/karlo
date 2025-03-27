const authService = require("../../../../../services/internal/auth.service");

class AuthenticateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(password, email) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }

    const isValid = await authService.comparePassword(password.toString(), user.password);

    if (!isValid) {
      throw { statusCode: 400, message: "Invalid credentials" };
    }
    const {  password: pass, ...rest} = user;
    const token = await authService.token(rest);

    return { token };
  }
}

module.exports = AuthenticateUserUseCase;
