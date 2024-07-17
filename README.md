# Nuxt 3 tRPC Example

## tRPC

`trpc-nuxt`が推奨しているディレクトリ構成。`@/server/api/trpc/[trpc].ts`がルーターの定義となる。実際のルーティングは`@/server/trpc/routers`配下で定義する。

https://trpc-nuxt.vercel.app/get-started/usage/recommended

```bash
.
├── server
│   ├── api
│   │   └── trpc
│   │       └── [trpc].ts  # <-- tRPC HTTP handler
│   │   └── [..]
│   ├── trpc
│   │   ├── routers
│   │   │   ├── index.ts  # <-- main app router
│   │   │   ├── todo.ts  # <-- sub routers
│   │   │   └── [..]
│   │   ├── context.ts   # <-- create app context
│   │   └── trpc.ts      # <-- procedure helpers
├── plugins
│   ├── client.ts  # <-- tRPC client plugin
└── [..]
```
