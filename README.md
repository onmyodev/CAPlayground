<table width="100%">
  <tr>
    <td align="right" width="120">
      <img src="apps/web/public/icon-dark.png" alt="CAPlayground Logo" width="100" />
    </td>
    <td align="left">
      <h1>CAPlayground</span></h1>
      <h3 style="margin-top: -10px;">Create beautiful animated wallpapers for iOS and iPadOS on any desktop computer.</h3>
    </td>
  </tr>
</table>

## Overview

CAPlayground is a web-based Core Animation editor for making stunning wallpapers for your iOS Devices. Check out the `/roadmap` page of the deployed app to see progress.

## Getting Started

### Prerequisites

- Node.js 20+
- Bun

### Install
Install project dependencies:
```bash
bun install
```

### Development
To start the dev server:
```bash
bun run dev
```

Open http://localhost:3000 in your browser.

### Environment variables (optional)

Supabase is used only for server-side wallpaper download counters and aggregate analytics.

Create a `.env.local` in the project root with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Only required for server-side counters and analytics
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

The app runs fully without these values; counters and analytics are simply disabled.

### Build & Start

```bash
bun run build && bun run start
```

## Contributing

Read [CONTRIBUTING.md](.github/CONTRIBUTING.md)

## License

[Creative Commons License](LICENSE)

**Note:** The Creative Commons License applies to the source code. Use of the hosted service is subject to the attribution requirements for shared content.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=caplayground/caplayground&type=Date)](https://www.star-history.com/#caplayground/caplayground&Date)
