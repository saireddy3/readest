import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
  treeshake: true,
  skipNodeModulesBundle: true,
  outDir: 'dist',
  outExtension({ format }: { format: string }) {
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
  ],
  esbuildOptions(options: Record<string, unknown>) {
    // Preserve path structure for imported assets
    options['assetNames'] = 'assets/[name]-[hash]';
    // Increase bundle size limit
    options['chunkNames'] = 'chunks/[name]-[hash]';
  },
  onSuccess: 'echo ✅ Build completed successfully!',
});