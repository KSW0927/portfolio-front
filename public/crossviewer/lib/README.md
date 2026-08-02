# Vendor Runtime Notes

Files in this directory are committed vendor artifacts required by the CrossViewer runtime.

## Files

- `crepas-viewer.min.js`: primary browser bundle loaded by the app shell
- `crepas.js`: supporting runtime glue code
- `crepas.worker.js`: worker used by the document engine
- `crepas.wasm`: WebAssembly payload used by the engine
- `crepas.key`: key file consumed by the vendor runtime

## Handling rules

- Update these files together when the upstream vendor package changes.
- Do not run formatters on these files.
- Do not assume they are reproducible from the local toolchain.
- After replacing them, verify `npm run dev`, `npm run build`, and the Playwright smoke path.

## Hosting requirement

The runtime expects cross-origin isolation headers:

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

These are already configured in [vite.config.ts](/D:/ceJava/htdocs/crossviewer/vite.config.ts).
