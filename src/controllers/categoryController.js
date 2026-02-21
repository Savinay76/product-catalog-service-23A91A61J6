const categoryRepository = require('../repositories/categoryRepository');

class CategoryController {
  async create(req, res) {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Category name is required" });
      }
      const category = await categoryRepository.add({ name, description });
      res.status(201).json(category);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Category name already exists" });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const categories = await categoryRepository.getAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CategoryController();