Icons are inline SVGs that are used in the design system in our React components.
Those are also called system icons, and they define the icons that are used in the design system in our React components.
Those icons are customisable through props only.

## ✏️ How to add a new one?

1. Add the `.svg` file into `packages/icons/src/components/Icon/assets` and in the correct sub folder
2. Then run the following command:
`pnpm run icons:update` at root of the project. The icons component will be generated automatically using this command.
<br />
<br />
** IMPORTANT: ** Make sure that the icon name is unique, otherwise it will override the existing one.
The name of the svg should be snake-case.

## 🗑️ How to deprecate an icon?

Sometime we need to rename icons or remove them. To deprecated an icon you can simply edit the file `packages/icons/src/deprecatedIcons.ts` and add the name of the icon you want to deprecate.

```ts
export const DEPRECATED_ICONS: DeprecatedIconsType = [
  ...
  {
    name: 'AsteriskIcon',
    deprecated: true,
    deprecatedReason: 'Use * from the font instead.',
  },
]
```
