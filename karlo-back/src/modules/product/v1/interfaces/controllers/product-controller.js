const ResponseHelper = require("../../../../../helpers/response/responseHelper");
const ProductUseCases = require("../../domain/product-cases/product-use-case");
const ProductRepositoryImpl = require("../../infraestructure/data/product-repository-impl");

class ProductController {
    #response;

    constructor() {
        this.#response = new ResponseHelper();
        this.userRepository = new ProductRepositoryImpl();
        this.productUseCases = new ProductUseCases(this.userRepository);
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

            const data = await this.productUseCases.getAll.execute(params);

            return this.#response.success({ res, data });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    store = async (req, res) => {
        try {
            const { roleId: catRoleId, ...rest } = req.body;
            const body = {
                catRoleId,
                ...rest,
            };
            await this.productUseCases.create.execute(body);
            return this.#response.success({ res, status: 201 });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    show = async (req, res) => {
        try {
            const uid = req.params.dataId;

            const data = await this.productUseCases.show.execute(uid);

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

            await this.productUseCases.update.execute(body);

            return this.#response.success({ res });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    deactivate = async (req, res) => {
        try {
            const uid = req.body.dataId;
            const data = await this.productUseCases.deactivate.execute(uid);
            return this.#response.success({ res, data });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    destroy = async (req, res) => {
        try {
            const uid = req.params.dataId;

            await this.productUseCases.destroy.execute(uid);
            return this.#response.destroy(res);
        } catch (error) {
            return this.#response.error(res, error);
        }
    };
}

module.exports = ProductController;
