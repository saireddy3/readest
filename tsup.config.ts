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
    'foliate-js',
    '@shmandadi/foliate-js',
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
  ]
}); 