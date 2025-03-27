const GetAllProductCase = require("../../domain/product-cases/GetAllProductUseCase");
const CreateProductCase = require("../../domain/product-cases/CreateProductCase");
const UpdateProductCase = require("../../domain/product-cases/UpdateProductCase");
const DestroyProductUseCase = require("../../domain/product-cases/DestroyProductCase");
const DeactivateProductUseCase = require("../../domain/product-cases/DeactivateProductUseCase");

class ProductUseCases {
    constructor(productRepository) {
        this.getAll = new GetAllProductCase(productRepository);
        this.create = new CreateProductCase(productRepository);
        this.update = new UpdateProductCase(productRepository);
        this.destroy = new DestroyProductUseCase(productRepository);
        this.deactivate = new DeactivateProductUseCase(productRepository);
    }
}

module.exports = ProductUseCases;
