# Contributing to Confirmly-Popup

Thank you for your interest in contributing to Confirmly-Popup! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/yourusername/confirmly-popup.git
cd confirmly-popup
```

2. Install dependencies:

```bash
npm install
```

3. Start development:

```bash
npm run watch
```

4. Run linting and formatting:

```bash
npm run lint
npm run format
```

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages following conventional commits
- Add JSDoc comments for public APIs
- Maintain type safety with TypeScript

### Testing

- Add test cases for new features
- Ensure existing tests pass
- Test across different browsers
- Check mobile responsiveness

### Documentation

- Update README.md for new features
- Add JSDoc comments for new methods
- Update example files if needed
- Keep CHANGELOG.md up to date

## Pull Request Process

1. Create a new branch for your feature:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:

```bash
git add .
git commit -m "feat: add your feature"
```

3. Push to your fork:

```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request:

- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Fill in the PR template

### PR Requirements

- Describe the changes clearly
- Reference any related issues
- Update documentation if needed
- Pass all CI checks
- Follow code style guidelines
- Include tests if applicable

## Code Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged

## Questions?

Feel free to open an issue for any questions or concerns.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
