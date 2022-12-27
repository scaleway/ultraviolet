# Scaleway Form

## Contribute

### Add a validator

- Create a file under `src/validators/` folder
- Export a default function with a type : (arg: unknown) => ValidatorObject
- Export it into `src/validators/index.ts`
- Add the key into the `ValidatorProps` type in `src/types.ts`
- Add tests into `src/validators/__tests__` folder
