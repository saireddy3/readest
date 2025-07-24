# Local Development Guide

This guide explains how to properly set up local development for the book-reader package and link it to your front-end project.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Access to both the book-reader package and your front-end project

## Setup Steps

### 1. In the Book-Reader Package (this repo)

#### Build the package
```bash
npm run build:lib
```

#### Create a global link
```bash
npm link
```

#### Start watching for changes (optional but recommended)
```bash
npm run watch:lib
```

### 2. In Your Front-End Project

#### Link to the local package
```bash
npm link @skillsoft/book-reader
```

#### Verify the link
```bash
npm ls @skillsoft/book-reader
```

You should see something like:
```
└── @skillsoft/book-reader@0.0.2 -> /Users/your-path/readest-Apr9/readest
```

## Development Workflow

### Option 1: Manual Rebuild (Recommended for stability)
1. Make changes to the book-reader package
2. Run `npm run build:lib` in the book-reader directory
3. Changes will be reflected in your front-end project

### Option 2: Watch Mode (Recommended for active development)
1. Start the watch mode: `npm run watch:lib`
2. Make changes to the book-reader package
3. Changes will automatically rebuild and be reflected

### Option 3: Development Server
1. Run `npm run dev` in the book-reader package for testing
2. Make changes and test in the development environment
3. Build when ready: `npm run build:lib`

## Troubleshooting

### Changes not reflecting?

1. **Check if the package is properly linked:**
   ```bash
   npm ls @skillsoft/book-reader
   ```

2. **Rebuild the package:**
   ```bash
   npm run build:lib
   ```

3. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

4. **Re-link the package:**
   ```bash
   # In book-reader package
   npm unlink
   npm link
   
   # In front-end project
   npm unlink @skillsoft/book-reader
   npm link @skillsoft/book-reader
   ```

5. **Restart your development server:**
   ```bash
   # Stop your dev server and restart it
   npm run dev
   ```

### Module resolution issues?

1. **Check your import statements:**
   ```javascript
   // Correct
   import { Reader } from '@skillsoft/book-reader';
   
   // Also correct
   import Reader from '@skillsoft/book-reader';
   ```

2. **Verify the dist folder exists:**
   ```bash
   ls -la dist/
   ```

3. **Check package.json exports:**
   Make sure the exports in package.json match your import statements.

### Build errors?

1. **Check for TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```

2. **Check for linting errors:**
   ```bash
   npm run lint
   ```

3. **Clear build artifacts:**
   ```bash
   rm -rf dist/
   npm run build:lib
   ```

## Unlinking

When you're done with local development:

### In your front-end project:
```bash
npm unlink @skillsoft/book-reader
npm install @skillsoft/book-reader
```

### In the book-reader package:
```bash
npm unlink
```

## Best Practices

1. **Always rebuild after changes** - Don't forget to run `npm run build:lib`
2. **Use watch mode during active development** - `npm run watch:lib`
3. **Test in the development environment first** - Use `npm run dev` to test changes
4. **Keep your dependencies up to date** - Regularly update peer dependencies
5. **Use version control** - Commit your changes before testing in the front-end project

## Common Issues

### "Module not found" errors
- Ensure the package is properly linked
- Check that the dist folder exists and contains the built files
- Verify import paths are correct

### "Cannot resolve module" errors
- Clear npm cache: `npm cache clean --force`
- Re-link the package
- Restart your development server

### Stale builds
- Always run `npm run build:lib` after making changes
- Use watch mode for automatic rebuilding
- Clear the dist folder and rebuild if needed

## Production Deployment

When ready for production:

1. **Build the package:**
   ```bash
   npm run build:lib
   ```

2. **Publish to your registry:**
   ```bash
   npm publish
   ```

3. **Update your front-end project:**
   ```bash
   npm install @skillsoft/book-reader@latest
   ``` 