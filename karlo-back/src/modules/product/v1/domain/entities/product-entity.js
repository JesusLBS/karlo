class Product {
    constructor(id, name, amount, price, inStock, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.inStock = inStock;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}

module.exports = {
    Product
};
