const ResponseHelper = require("../../../../../helpers/response/responseHelper");
const PurchaseOrderUseCases = require("../../domain/purchaseorder-cases/purchaseorder-use-case");
const PurcharseOrderImpl = require("../../infraestructure/data/purchaseorder-repository-impl");

class PurcharseOrderController {
    #response;

    constructor() {
        this.#response = new ResponseHelper();
        this.userRepository = new PurcharseOrderImpl();
        this.purchaseOrderUseCases = new PurchaseOrderUseCases(this.userRepository);
    }

    index = async (req, res) => {
        try {
            const params = {
                search: req.params.search,
                sort: req.params.sort,
                direction: req.params.direction,
                page: req.params.page,
                limit: req.params.limit,
                withTrashed: req.params.withTrashed,
            };

            const data = await this.purchaseOrderUseCases.getAll.execute(params);

            return this.#response.success({ res, data });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    store = async (req, res) => {
        try {
            const { id: userId } = req.auth;
            const { businessId, ...rest } = req.body;
            const body = {
                businessId,
                userId,
                iva: 0.16,
                ...rest,
            };
            console.log(body)
            await this.purchaseOrderUseCases.create.execute(body);
            return this.#response.success({ res, status: 201 });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    show = async (req, res) => {
        try {
            const uid = req.params.dataId;

            const data = await this.purchaseOrderUseCases.show.execute(uid);

            return this.#response.success({ res, data });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    update = async (req, res) => {
        try {
            const { rol, ...rest } = req.body;
            const body = {
                rol,
                ...rest,
            };

            await this.purchaseOrderUseCases.update.execute(body);

            return this.#response.success({ res });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    destroy = async (req, res) => {
        try {
            const uid = req.params.dataId;

            await this.purchaseOrderUseCases.destroy.execute(uid);
            return this.#response.destroy(res);
        } catch (error) {
            return this.#response.error(res, error);
        }
    };
}

module.exports = PurcharseOrderController;
