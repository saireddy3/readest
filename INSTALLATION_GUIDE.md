# Installation Guide for @saireddy3/book-reader

## Prerequisites

1. **GitHub Personal Access Token** with `read:packages` scope
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select `read:packages` scope
   - Copy the generated token

## Installation Steps

### Step 1: Configure npm/yarn for GitHub Packages

In your project root, create a `.npmrc` file with the following content:

```
@saireddy3:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Replace `YOUR_GITHUB_TOKEN` with your actual GitHub Personal Access Token.

### Step 2: Install the package

```bash
# Using npm
npm install @saireddy3/book-reader@latest

# Using yarn
yarn add @saireddy3/book-reader@latest
```

### Step 3: Import and use in your React application

```javascript
import { Reader } from '@saireddy3/book-reader';
import '@saireddy3/book-reader/dist/index.css';

function App() {
  return (
    <div className="App">
      <Reader />
    </div>
  );
}
```

## Alternative Setup (Environment Variables)

For CI/CD or team environments, use environment variables:

### .npmrc file:
```
@saireddy3:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

### Set environment variable:
```bash
export NPM_TOKEN=your_github_token_here
```

## Troubleshooting

### Error: "Not found" from different registry

If you get an error like:
```
error Error: https://nexus.tools.squads-dev.com/repository/npm-public/@saireddy3%2fbook-reader: Not found
```

This means your project is using a different npm registry. The `.npmrc` configuration above will fix this by directing only `@saireddy3` scoped packages to GitHub Packages.

### Authentication Issues

If you get authentication errors:
1. Verify your GitHub token has `read:packages` scope
2. Check that the token is correctly placed in `.npmrc`
3. Try logging in manually: `npm login --scope=@saireddy3 --registry=https://npm.pkg.github.com/`

## Security Notes

- **Never commit `.npmrc` with actual tokens** to version control
- Add `.npmrc` to your `.gitignore` file
- Use environment variables for tokens in CI/CD pipelines
- Regularly rotate your GitHub Personal Access Tokens

## Package Information

- **Latest Version**: 0.9.38
- **Registry**: GitHub Packages
- **Dependencies**: React 18+, foliate-js, zustand, i18next
- **License**: MIT 