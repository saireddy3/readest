import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.js'],
  format: ['cjs', 'esm'],
  dts: false,
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
  treeshake: true,
  skipNodeModulesBundle: true,
  outDir: 'dist',
  /**
   * @param {{ format: string }} param0
   * @returns {{ js: string }}
   */
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
  },
  external: [
    'react',
    'react-dom',
    '@skillsoft/foliate-js',
    '@skillsoft/foliate-js/epubcfi.js',
    '@skillsoft/foliate-js/comic-book.js',
    '@skillsoft/foliate-js/fb2.js',
    '@skillsoft/foliate-js/epub.js',
    '@skillsoft/foliate-js/mobi.js',
    '@skillsoft/foliate-js/vendor/fflate.js',
    '@skillsoft/foliate-js/view.js',
    '@skillsoft/foliate-js/overlayer.js',
    '@skillsoft/foliate-js/footnotes.js',
    'react-i18next',
    'i18next',
    'i18next-browser-languagedetector',
    'i18next-http-backend',
  ],
  /**
   * @param {Record<string, unknown>} options
   */
  esbuildOptions(options) {
    // Preserve path structure for imported assets
    options['assetNames'] = 'assets/[name]-[hash]';
    // Increase bundle size limit
    options['chunkNames'] = 'chunks/[name]-[hash]';
  },
  onSuccess: 'echo ✅ Build completed successfully!',
}); 