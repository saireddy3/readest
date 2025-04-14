import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
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
    /^!!raw-loader/,
  ],
  esbuildOptions(options) {
    options.alias = {
      // Add alias to map foliate-js to @shmandadi/foliate-js
      'foliate-js': '@shmandadi/foliate-js',
    };
  },
}); 