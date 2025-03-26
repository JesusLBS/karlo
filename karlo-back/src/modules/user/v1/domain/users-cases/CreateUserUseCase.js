class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    return await this.userRepository.store(userData);
  }
}

module.exports = CreateUserUseCase;
