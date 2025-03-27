class CreatePurchaseOrderCase {
  constructor(purchaseOrderRepository) {
    this.purchaseOrderRepository = purchaseOrderRepository;
  }

  async execute(purchaseOrderData) {
    return await this.purchaseOrderRepository.store(purchaseOrderData);
  }
}

module.exports = CreatePurchaseOrderCase;
