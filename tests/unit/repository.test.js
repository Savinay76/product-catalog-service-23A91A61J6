const productRepository = require('../../src/repositories/productRepository');
const { Product } = require('../../src/models');

// Mocking the Product model to isolate the repository
jest.mock('../../src/models', () => ({
  Product: {
    findByPk: jest.fn(),
    findAndCountAll: jest.fn(),
    create: jest.fn()
  },
  Category: {}
}));

describe('Product Repository Unit Tests (Isolated)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call findByPk with the correct ID', async () => {
    Product.findByPk.mockResolvedValue({ id: '1', name: 'Test' });
    await productRepository.getById('1');
    expect(Product.findByPk).toHaveBeenCalledWith('1');
  });

  it('should apply pagination (limit/offset) in search', async () => {
    Product.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });
    
    await productRepository.search({ limit: 5, skip: 10 });

    expect(Product.findAndCountAll).toHaveBeenCalledWith(expect.objectContaining({
      limit: 5,
      offset: 10
    }));
  });
});