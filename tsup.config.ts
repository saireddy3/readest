import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
  treeshake: true,
  skipNodeModulesBundle: true,
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
  // Include all static assets
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.svg': 'file',
    '.gif': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
    '.css': 'file',
  },
  external: [
    'react',
    'react-dom',
    'next',
    '@shmandadi/foliate-js',
    '@shmandadi/foliate-js/epubcfi.js',
    '@shmandadi/foliate-js/comic-book.js',
    '@shmandadi/foliate-js/fb2.js',
    '@shmandadi/foliate-js/epub.js',
    '@shmandadi/foliate-js/mobi.js',
    '@shmandadi/foliate-js/vendor/fflate.js',
    '@shmandadi/foliate-js/view.js',
    '@shmandadi/foliate-js/overlayer.js',
    '@shmandadi/foliate-js/footnotes.js',
    // Also include original paths for backward compatibility
    'foliate-js',
    'foliate-js/epubcfi.js',
    'foliate-js/comic-book.js',
    'foliate-js/fb2.js',
    'foliate-js/epub.js',
    'foliate-js/mobi.js',
    'foliate-js/vendor/fflate.js',
    'foliate-js/view.js',
    'foliate-js/overlayer.js',
    'foliate-js/footnotes.js',
    'react-i18next',
    'i18next',
    'i18next-browser-languagedetector',
    'i18next-http-backend',
    /^!!raw-loader/,
  ],
  esbuildOptions(options) {
    options.alias = {
      // Add alias to map foliate-js to @shmandadi/foliate-js
      'foliate-js': '@shmandadi/foliate-js',
    };
    // Ensure we handle all file types
    options.loader = {
      ...options.loader,
      '.png': 'file',
      '.jpg': 'file',
      '.svg': 'file',
    };
    // Preserve path structure for imported assets
    options.assetNames = 'assets/[name]-[hash]';
    // Increase bundle size limit
    options.chunkNames = 'chunks/[name]-[hash]';
  },
  onSuccess: 'echo ✅ Build completed successfully!',
}); 