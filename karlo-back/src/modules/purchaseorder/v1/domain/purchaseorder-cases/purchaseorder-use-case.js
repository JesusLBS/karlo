const GetAllPurcharseOrderCase = require("../../domain/purchaseorder-cases/GetAllPurchaseOrderUseCase");
const CreatePurchaseOrderCase = require("../../domain/purchaseorder-cases/CreatePurchaseOrderCase");
const UpdatePurchaseOrderCase = require("../../domain/purchaseorder-cases/UpdatePurchaseOrderCase");
const DestroyPurchaseOrderUseCase = require("../../domain/purchaseorder-cases/DestroyPurchaseOrderCase");

class PurchaseOrderUseCases {
    constructor(purchaseOrderRepository) {
        this.getAll = new GetAllPurcharseOrderCase(purchaseOrderRepository);
        this.create = new CreatePurchaseOrderCase(purchaseOrderRepository);
        this.update = new UpdatePurchaseOrderCase(purchaseOrderRepository);
        this.destroy = new DestroyPurchaseOrderUseCase(purchaseOrderRepository);
    }
}

module.exports = PurchaseOrderUseCases;
