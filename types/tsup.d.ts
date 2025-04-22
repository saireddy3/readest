declare module 'tsup' {
  interface TsupConfig {
    entry?: string[] | Record<string, string>;
    format?: ('cjs' | 'esm' | 'iife')[];
    dts?: boolean | { entry?: string | Record<string, string> } | { only: boolean };
    sourcemap?: boolean;
    clean?: boolean;
    minify?: boolean;
    splitting?: boolean;
    external?: (string | RegExp)[];
    outDir?: string;
    target?: string;
    esbuildOptions?: (options: Record<string, unknown>) => void;
    outExtension?: (ctx: { format: string }) => { js: string } | undefined;
    [key: string]: unknown;
  }

  export function defineConfig(config: TsupConfig): TsupConfig;
} 