# Spoke

The build of Spoke, a bike repair booking app. You design in Figma, Codex builds from your frames, and you check the result.

## Figma design

[Spoke starter kit](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=6-5)

Use these frame links with Figma MCP when implementing each screen:

- [01 Choose a service](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=7-114)
- [02 Pick a slot](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=7-121)
- [03 Confirm](https://www.figma.com/design/xWrQF0fTmdvB0OKzHVPsDo/?node-id=7-128)

## Start the app

Open this folder in a terminal (in GitHub Desktop: Repository, Open in Terminal) and run:

```
npm install
npm run dev
```

The app runs at http://localhost:5173. Stop it with Ctrl+C.

## What is in this repo

| File | What it is for |
|---|---|
| `AGENTS.md` | The rules Codex and Claude read before every task. |
| `LOG.md` | Your process log for the assignment. Fill it in while you work. |
| `REFLECTION.md` | Your reflection for the assignment. |
| `src/` | The app. Tokens go in `src/styles/tokens.css`, components in `src/components/`. |

## Keep this repo public and clean

Anyone can read this repo. Never commit passwords, API keys or `.env` files.
