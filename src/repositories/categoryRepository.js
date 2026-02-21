const BaseRepository = require('./baseRepository');
const { Category } = require('../models');

class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category);
  }
}

module.exports = new CategoryRepository();