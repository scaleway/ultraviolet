Icons are inline SVGs that are used in the design system in our React components.
Those are also called system icons, and they define the icons that are used in the design system in our React components.
Those icons are customisable through props only.

### ➕ How to add a new one?

Simply edit the file `packages/icons/src/components/Icon/index.tsx`, add the new category icon into the object.
As you can see from existing icons, you should not include the `<svg>` tag it will be added automatically.

> ** IMPORTANT: ** Make sure that the icon name is unique, otherwise it will override the existing one.\
> The name should be camelCase and should not contain any special characters.
