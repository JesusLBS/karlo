
const { Op, col, where, cast } = require('sequelize');
const { Business } = require("../entities/business-entity");
const TimeUtil = require("../../../../../utils/timeUtil");
const timeUtil = new TimeUtil("es-MX");

class GetAllBusinessCase {
  constructor(businesessRepository) {
    this.businesessRepository = businesessRepository;
  }

  defaultOptions = () => ({
    limit: 10,
    page: 1,
    sort: "name",
    direction: "ASC",
    withTrashed: true,
    search: "",
    hasMore: false,
    lastPage: 1,
  });

  async execute(params) {
    let defaultOptions = this.defaultOptions();
    let { search, hasMore, lastPage } = defaultOptions;
    let { sort, direction, page, limit, withTrashed } = params;

    const isValid = [
      undefined,
      "''",
      null,
      "null",
      ":search",
      ":sort",
      ":direction",
      ":page",
      ":limit",
      ":withTrashed",
    ];

    if (!isValid.includes(params.search)) {
      search = params.search;
    }
    if (!isValid.includes(sort)) {
      defaultOptions.sort = sort;
    }
    if (!isValid.includes(direction)) {
      defaultOptions.direction = direction;
    }
    if (!isValid.includes(page)) {
      defaultOptions.page = +page;
    }
    if (!isValid.includes(limit)) {
      defaultOptions.limit = +limit;
    }
    if (!isValid.includes(withTrashed)) {
      defaultOptions.withTrashed = +withTrashed ? true : false;
    }

    const where = this.buildWhereClause(search, defaultOptions.withTrashed);

    const { count, rows } = await this.businesessRepository.index({
      defaultOptions,
      where,
    });
    const countAll = await this.businesessRepository.countAll(where);

    lastPage = Math.ceil(count / defaultOptions.limit);

    if (count > defaultOptions.page * defaultOptions.limit) {
      hasMore = true;
    }

    const rowsUpdate = rows.map((value) => this.mapUserEntity(value));
    const headers = this.headersTable();

    return {
      countAll,
      count,
      rows: rowsUpdate,
      headers,
      page: defaultOptions.page,
      lastPage,
      hasMore,
    };
  }

  buildWhereClause(search, withTrashed) {
    const data = {
      [Op.or]: [
        where(cast(col('id'), 'text'), { [Op.like]: `%${search}%` }),
        { name: { [Op.like]: `%${search}%` } }
      ]
    };
    if (!withTrashed) {
      data.deletedAt = { [Op.ne]: null };
    }
    return data;
  }

  mapUserEntity(value) {
    const { id, name, ...rest } = value;

    const transformedDates = {
      createdAt: timeUtil.transformTime(rest.createdAt),
      updatedAt: timeUtil.transformTime(rest.updatedAt),
      deletedAt: timeUtil.transformTime(rest.deletedAt),
    };

    return new Business(
      id,
      name,
      ...Object.values(transformedDates),
    );
  }

  headersTable() {
    const headers = [
      { header: "#", key: "uid" },
      { header: "Negocio", key: "name" },
      { header: "Estatus", key: "deletedAt" },
      { header: "Creado", key: "createdAt" },
      { header: "Actualizado", key: "updatedAt" },
      { header: "Acciones", key: "actions" },
    ];
    return headers;
  }
}

module.exports = GetAllBusinessCase;
