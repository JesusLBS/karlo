const ResponseHelper = require("../../../../../helpers/response/responseHelper");
const UserUseCases = require("../../domain/users-cases/UserUseCases");
const UserRepositoryImpl = require("../../infraestructure/data/user-repository-impl");

class UserController {
    #response;

    constructor() {
        this.#response = new ResponseHelper();
        this.userRepository = new UserRepositoryImpl();
        this.userUseCases = new UserUseCases(this.userRepository);
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

            const data = await this.userUseCases.getAllUser.execute(params);

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
            await this.userUseCases.createUser.execute(body);
            return this.#response.success({ res, status: 201 });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    show = async (req, res) => {
        try {
            const uid = req.params.dataId;

            const data = await this.userUseCases.showUser.execute(uid);

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

            await this.userUseCases.updateUser.execute(body);

            return this.#response.success({ res });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    deactivate = async (req, res) => {
        try {
            const uid = req.body.dataId;
            const data = await this.userUseCases.deactivateUser.execute(uid);
            return this.#response.success({ res, data });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    activate = async (req, res) => {
        try {
            const uid = req.body.dataId;
            const data = await this.userUseCases.activateUser.execute(uid);
            return this.#response.success({ res, data });
        } catch (error) {
            return this.#response.error(res, error);
        }
    };

    destroy = async (req, res) => {
        try {
            const uid = req.params.dataId;

            await this.userUseCases.destroyUser.execute(uid);
            return this.#response.destroy(res);
        } catch (error) {
            return this.#response.error(res, error);
        }
    };
}

module.exports = UserController;
