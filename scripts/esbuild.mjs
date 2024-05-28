import { build } from 'esbuild'

const baseConfig = {
  bundle: true,
  minify: process.env.NODE_ENV === "production",
  sourcemap: process.env.NODE_ENV !== "production"
}

const extensionConfig = {
  ...baseConfig,
  entryPoints: ['./src/extension.ts'],
  outfile: './out/extension.js',
  external: ['vscode'],
  format: 'cjs',
  platform: 'node'
}

const uiConfig = {
  ...baseConfig,
  entryPoints: ['./src/ui/index.tsx'],
  outfile: './out/ui/index.js'
}

(async () => {
  const args = process.argv.slice(2);
  console.log(args);
  try {
    await build(extensionConfig);
    await build(uiConfig);
    console.log('Successfully built');
  } catch (err) {
    process.stderr.write(err.stderr);
    process.exit(1);
  }
})()