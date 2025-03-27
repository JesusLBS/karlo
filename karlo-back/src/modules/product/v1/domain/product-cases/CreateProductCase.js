class CreateProductCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    return await this.productRepository.store(productData);
  }
}

module.exports = CreateProductCase;
