## Contributing

We welcome contributions to the Product Catalog Service!

### Setup
1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env` and update values

### Running Locally
```bash
docker-compose up --build
```

### Running Tests
```bash
npm test
```

### Code Style
- Follow existing patterns (Repository Pattern, Unit of Work)
- Add unit/integration tests for new features
- Update Swagger spec for new endpoints

### Pull Request Process
1. Branch from `main` with a descriptive name
2. Write tests for new features
3. Ensure all tests pass before opening a PR
4. Describe changes clearly in the PR description
