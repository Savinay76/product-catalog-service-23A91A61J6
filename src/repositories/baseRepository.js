class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getById(id) {
    return await this.model.findByPk(id);
  }

  async getAll(skip = 0, limit = 10) {
    return await this.model.findAll({
      offset: skip,
      limit: limit
    });
  }

  async add(data, transaction = null) {
    return await this.model.create(data, { transaction });
  }

  async update(id, data, transaction = null) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    return await record.update(data, { transaction });
  }

  async delete(id, transaction = null) {
    const record = await this.model.findByPk(id);
    if (!record) return false;
    await record.destroy({ transaction });
    return true;
  }
}

module.exports = BaseRepository;