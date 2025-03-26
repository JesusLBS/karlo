const GetAllUserUseCase = require("../../domain/users-cases/get-all-user-use-case");
const CreateUserUseCase = require("../../domain/users-cases/CreateUserUseCase");
const UpdateUserUseCase = require("../../domain/users-cases/UpdateUserCase");
const DestroyUserUseCase = require("../../domain/users-cases/DestroyUserUseCase");
const DeactivateUserUseCase = require("../../domain/users-cases/DeactivateUserUseCase");

class UserUseCases {
  constructor(userRepository) {
    this.getAllUser = new GetAllUserUseCase(userRepository);
    this.createUser = new CreateUserUseCase(userRepository);
    this.updateUser = new UpdateUserUseCase(userRepository);
    this.destroyUser = new DestroyUserUseCase(userRepository);
    this.deactivateUser = new DeactivateUserUseCase(userRepository);
  }
}

module.exports = UserUseCases;
