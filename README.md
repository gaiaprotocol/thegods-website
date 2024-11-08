# thegods-interface

## Run dev entrypoint
```
deno run --allow-net --allow-read --watch server/entrypoint-dev.ts
```

```
cd utils
node --loader ts-node/esm ./resize-images.ts
node --loader ts-node/esm ./generate-spritesheet.ts
```