const BaseRepository = require('./baseRepository');
const { Product, Category } = require('../models');
const { Op } = require('sequelize'); // Import Operators

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async search({ q, categoryId, minPrice, maxPrice, skip = 0, limit = 10 }) {
    const where = {};

    // 1. Keyword search (Name or Description)
    if (q) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${q}%` } }, // iLike is case-insensitive
        { description: { [Op.iLike]: `%${q}%` } }
      ];
    }

    // 2. Price Range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice; // Greater than or equal
      if (maxPrice) where.price[Op.lte] = maxPrice; // Less than or equal
    }

    // 3. Category filter
    const include = [{ model: Category }];
    if (categoryId) {
      include[0].where = { id: categoryId };
    }

    return await this.model.findAndCountAll({
      where,
      include,
      offset: skip,
      limit: limit,
      distinct: true // Ensures count is correct with many-to-many
    });
  }

  async getByIdWithCategories(id) {
    return await this.model.findByPk(id, { include: Category });
  }
}

module.exports = new ProductRepository();