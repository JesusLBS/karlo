const GetAllUserUseCase = require("../../domain/users-cases/get-all-user-use-case");
const CreateUserUseCase = require("../../domain/users-cases/CreateUserUseCase");

class UserUseCases {
  constructor(userRepository) {
    this.getAllUser = new GetAllUserUseCase(userRepository);
    this.createUser = new CreateUserUseCase(userRepository);
  }
}

module.exports = UserUseCases;
