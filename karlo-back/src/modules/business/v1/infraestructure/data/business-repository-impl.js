const BusinessRepository = require("../../domain/repositories/business-repository");
const db = require("../../../../../database/models/index");

class BusinessRepositoryImpl extends BusinessRepository {
    async index({ defaultOptions, where }) {
        const { limit, page, sort, direction, withTrashed } = defaultOptions;

        const { count, rows } = await db.Business.scope("raw").findAndCountAll({
            where,
            order: [[sort, direction]],
            offset: (page - 1) * limit,
            paranoid: withTrashed,
            limit,
        });

        return { count, rows };
    }

    countAll = async (where) => {
        return await db.Business.scope("raw").count({
            where,
            paranoid: false,
        });
    };

    async store(body, options = {}) {
        const transaction = options.transaction;
        const row = await db.Business.create(body, { transaction });
        if (!row) return null;
        return row;
    }

    async edit(id) {
        const row = await db.Business.scope("raw").findOne({ where: { id } });
        if (!row) return null;
        return row;
    }

    async update(body, options = {}) {
        const transaction = options.transaction;
        const { id, ...rest } = body;
        const row = await db.Business.findOne({ where: { id }, transaction });
        if (!row) return null;

        await row.update({ ...rest }, { transaction });
        return row;
    }

    async destroy(id, options = {}) {
        const transaction = options.transaction;
        const row = await db.Business.findOne({
            where: { id },
            paranoid: false,
            transaction,
        });
        if (!row) return null;
        await row.destroy({ force: true, transaction });
        return true;
    }

    async deactivate(id, options = {}) {
        const transaction = options.transaction;
        const row = await db.Business.findOne({ where: { id }, transaction });
        if (!row) return null;
        await row.destroy({ transaction });
        return true;
    }

    async activate(id, options = {}) {
        const transaction = options.transaction;
        const row = await db.Business.findOne({
            where: { id },
            paranoid: false,
            transaction,
        });
        if (!row) return null;
        await row.restore({ transaction });
        return true;
    }
}

module.exports = BusinessRepositoryImpl;
