## Codbit VS Code Extension

This package contains the actual VS Code extension runtime (`src/extension.ts`).

### Run in Extension Host

1. From repo root, install dependencies:
   - `pnpm install`
2. Compile once:
   - `pnpm --filter extension compile`
3. In VS Code, press `F5` and choose `Run Codbit Extension`.
4. In the new Extension Development Host window:
   - Open any file
   - Highlight code
   - Right click and select `Codbit: Remember this...`

### Useful scripts

- `pnpm --filter extension watch`: watch/compile `src` to `dist`
- `pnpm --filter extension compile`: build `dist/extension.js`
- `pnpm --filter extension check-types`: type-check extension runtime
- `pnpm --filter extension lint`: lint extension package
- `pnpm --filter extension package:vsix`: build `apps/extension/codbit.vsix`
- `pnpm --filter extension publish:check`: lint + type-check + package preflight
- `pnpm --filter extension publish:patch|minor|major`: publish to Marketplace with version bump

### Notes

- Launch/task configs are in `.vscode/launch.json` and `.vscode/tasks.json`.
- Output is generated to `apps/extension/dist`.

### Publish to VS Marketplace

1. Create a Personal Access Token in Azure DevOps with Marketplace `Manage` scope.
2. In your terminal, set token:
   - PowerShell: `$env:VSCE_PAT="<your-token>"`
   - Git Bash: `export VSCE_PAT="<your-token>"`
3. Run one of:
   - `pnpm --filter extension publish:patch`
   - `pnpm --filter extension publish:minor`
   - `pnpm --filter extension publish:major`

`vsce` will use `VSCE_PAT` automatically.
