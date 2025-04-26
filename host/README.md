# SSR Hydration Rspack Vue Host

## Setup

To get started, install the required dependencies:

```bash
pnpm install
```

Before starting the host application please start the `rspack_ssr_hydration_remote_vue` so the remote is properly shown in the host application.

## Development

Run the following command to build the host application and start the Node.js server:

```bash
pnpm dev
```

This will generate the `mf-manifest.json` and `remoteEntry.js` files, and serve the fully SSR-hydrated Rspack remote application.
