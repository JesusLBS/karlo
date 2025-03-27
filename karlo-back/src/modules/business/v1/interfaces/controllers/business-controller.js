const ResponseHelper = require("../../../../../helpers/response/responseHelper");
const BusinessUseCases = require("../../domain/business-cases/business-use-case");
const BusinessRepositoryImpl = require("../../infraestructure/data/business-repository-impl");

class BusinessController {
    #response;

    constructor() {
        this.#response = new ResponseHelper();
        this.businessRepository = new BusinessRepositoryImpl();
        this.businessUseCases = new BusinessUseCases(this.businessRepository);
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

            const data = await this.businessUseCases.getAllBusiness.execute(params);

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
            await this.businessUseCases.createBusiness.execute(body);
            return this.#response.success({ res, status: 201 });
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

            await this.businessUseCases.updateBusiness.execute(body);

            return this.#response.success({ res });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    deactivate = async (req, res) => {
        try {
            const uid = req.body.dataId;
            const data = await this.businessUseCases.deactivateBusiness.execute(uid);
            return this.#response.success({ res, data });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    destroy = async (req, res) => {
        try {
            const uid = req.params.dataId;

            await this.businessUseCases.destroyBusiness.execute(uid);
            return this.#response.destroy(res);
        } catch (error) {
            return this.#response.error(res, error);
        }
    };
}

module.exports = BusinessController;
