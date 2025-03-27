class PurcharseOrders {
    constructor(id, status, total, subtotal, iva, products, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.status = status;
        this.total = total;
        this.subtotal = subtotal;
        this.iva = iva;
        this.products = products;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}

module.exports = {
    PurcharseOrders
};
