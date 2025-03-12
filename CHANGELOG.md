# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.1] - 2025-03-12

### Added

- Implemented XML sitemap generation for improved SEO
- Added structured metadata for search engine optimization
- Enhanced documentation URL structure for better navigation

### Changed

- Optimized page titles and meta descriptions for better search visibility
- Improved documentation organization and accessibility

### Fixed

## [1.5.0] - 2025-03-12

### Added

- Comprehensive documentation with usage examples
- Repository metadata and project information
- Advanced theming system with SASS variables
- Custom event handlers for popup interactions

### Changed

### Fixed

-

## [1.4.3] - 2025-03-11

### Added

- Additional usage examples in documentation
- New theme variables for better customization

### Changed

- Optimized SASS implementation
- Improved build process efficiency

### Fixed

- Minor styling inconsistencies
- Documentation formatting issues

## [1.4.2] - 2025-03-11

### Added

- SASS support for better styling organization
- Theme customization through CSS variables
- Husky integration for pre-commit hooks
- Lint-staged for automated code formatting

### Changed

- Updated ESLint configuration with latest plugins and rules
- Improved build configuration with Rollup
- Enhanced TypeScript configuration
- Updated all development dependencies to latest versions

### Fixed

- Build process optimization
- Code formatting consistency

## [1.3.4] - 2025-03-11

### Changed

feat: update README to reflect package rename and add live demo link

## [1.3.0] - 2025-03-11

### Changed

Working on eslint Config by @farisnceit in #10
ci: add GitHub Actions workflow for PR validation by @farisnceit in #11
ci: add Dependabot configuration for automated version updates by @farisnceit in #12
feat: rename package and sidebar enhance by @farisnceit in #13

## [1.2.0] - 2025-10-25

### Changed

- Removed unnecessary `globals` for ESM builds as they rely on `import` statements.
- Updated Rollup config to maintain compatibility with both UMD/IIFE and ESM formats.
- Removed Babel from Rollup configuration.
- Changed configuration of ESLint.
- Removed ESLint from build process.

### Chore

- Updated ESLint config to use traditional format.
- Added .npmignore for better package control.
- Updated formatting and linting rules.
- Fixed build configuration.

## [1.1.2] - 2025-03-10

### Added

-

### Changed

- Improved Demo Page & styles
- Updated documentation with new examples

### Fixed

## [1.1.1] - 2025-03-10

### Added

- New custom template example
- Different popup positions (top, right, bottom, left)

### Changed

- Added project documentation files (CHANGELOG.md, CONTRIBUTING.md)
- Removed unnecessary comments in animation code
- Cleaned up HTML formatting in example/index.html
- Renamed CSS file from confirmation-popper.css to confirmly-popup.css

### Fixed

- Fixed incorrect CSS class in template (changed {{confirmClass}} to {{cancelClass}} for cancel button)

## [1.0.0] - 2025-03-09

### Added

- Initial release of confirmly-popup
- Core confirmation popup functionality with Popper.js integration
- Customizable templates and styling
- Support for different placements (top, bottom, left, right)
- Warning theme and custom theme support
- TypeScript support
- ESM and UMD builds
- Responsive design with mobile support
- Comprehensive documentation and examples

### Dependencies

- @popperjs/core ^2.11.8
- Development tooling setup with TypeScript, Rollup, ESLint, and Prettier
