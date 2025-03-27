const GetAllBusinessCase = require("../../domain/business-cases/GetAllBusinessUseCase");
const CreateBusinessCase = require("../../domain/business-cases/CreateBusinessCase");
const UpdateBusinessCase = require("../../domain/business-cases/UpdateBusinessCase");
const DestroyBusinessCase = require("../../domain/business-cases/DestroyBusinessCase");
const DeactivateBusinessUseCase = require("../../domain/business-cases/DeactivateBusinessUseCase");

class BusinessUseCases {
    constructor(businessRepository) {
        this.getAllBusiness = new GetAllBusinessCase(businessRepository);
        this.createBusiness = new CreateBusinessCase(businessRepository);
        this.updateBusiness = new UpdateBusinessCase(businessRepository);
        this.destroyBusiness = new DestroyBusinessCase(businessRepository);
        this.deactivateBusiness = new DeactivateBusinessUseCase(businessRepository);
    }
}

module.exports = BusinessUseCases;
