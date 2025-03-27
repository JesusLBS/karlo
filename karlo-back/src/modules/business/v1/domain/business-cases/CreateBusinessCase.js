class CreateBusinessCase {
  constructor(businesessRepository) {
    this.businesessRepository = businesessRepository;
  }

  async execute(businessData) {
    return await this.businesessRepository.store(businessData);
  }
}

module.exports = CreateBusinessCase;
