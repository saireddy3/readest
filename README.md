# Readest

Readest is a modern, web-based e-book reader application built with Next.js. It provides a feature-rich reading experience with support for various e-book formats.

## Features

- Support for popular e-book formats (EPUB, etc.)
- Customizable reading experience (fonts, themes, layout)
- Annotations and highlights
- Table of contents navigation
- Text-to-speech functionality
- Multi-language support with i18n
- Responsive design for desktop and mobile

## Prerequisites

- Node.js 18.x or higher
- Yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/readest.git
   cd readest
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

## Usage

### Development

To run the development server:

```bash
yarn dev
```

This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

### Building for Production

To build the application for production:

```bash
yarn build
```

To start the production server:

```bash
yarn start
```

### Static Export

To create a static export:

```bash
yarn build:static
```

## Project Structure

- `/src/app` - Next.js app router pages and components
- `/src/components` - Reusable UI components
- `/src/hooks` - Custom React hooks
- `/src/store` - State management using Zustand
- `/src/utils` - Utility functions
- `/src/libs` - Library integrations
- `/src/i18n` - Internationalization files
- `/src/services` - Service modules
- `/public` - Static assets

## Configuration

### Environment Variables

Create a `.env.web` file in the root directory with the following variables:

```
# Example environment variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Internationalization

The app supports multiple languages. Translations can be added to:

```
/public/locales/{language-code}/translation.json
```

To extract new translation keys:

```bash
yarn i18n:extract
```

## Customization

### Themes

The app supports light and dark themes, which can be customized in:

```
/src/styles/themes.ts
```

### Fonts

Font settings can be configured in:

```
/src/services/constants.ts
```

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Foliate.js](https://github.com/johnfactotum/foliate-js) - E-book parser and renderer
- [i18next](https://www.i18next.com/) - Internationalization
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [DaisyUI](https://daisyui.com/) - UI component library

## License

This project is licensed under the [MIT License](LICENSE). 