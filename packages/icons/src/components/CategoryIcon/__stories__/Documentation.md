CategoryIcon defines a sets of icons that are linked to Scaleway products. They are used to represent this product with a simple icon.

## ✏️ How to add a new one?

1. Add the `.svg` file into `packages/icons/src/components/CategoryIcon/assets`
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
    name: 'AiCategoryIcon',
    deprecated: true,
    deprecatedReason: 'Do not use anymore.',
  },
]
```

## ⚙️ How does it works?

Those icons have 3 sets of colors that changes depending on theme. It is all automatic but here is how it works:
Let's take an example with our AI category icon SVG:

```svg
<svg>
    <g className="AI">
      <path
        fill="#A365F6"
        d="M17.784 11.897c.021-.066.034-.136.05-.204a2.818 2.818 0 0 0-.958-2.862 3.037 3.037 0 0 0-.44-3.427 2.726 2.726 0 0 0-1.74-.926 4.032 4.032 0 0 0-2.512-2.275 2.736 2.736 0 0 0-2.094.013 2.348 2.348 0 0 0-.992 2.401l.002.103-.01 9.861c0 .01.005.017.005.026a3.184 3.184 0 0 0 2.663 3.367c.144.016.29.024.435.024a2.972 2.972 0 0 0 2.742-1.619 2.548 2.548 0 0 0 1.496-1.501c.183-.459.223-.962.113-1.444a2.728 2.728 0 0 0 1.24-1.537Zm-3.052 2.328a.693.693 0 0 1-.583.48.935.935 0 0 0-.762.668 1.203 1.203 0 0 1-1.44.792c-.514-.054-1.033-.613-1.033-1.578 0-.006-.004-.011-.004-.017l.003-2.594a1.26 1.26 0 0 1 .177-.716.835.835 0 0 1 .819-.485.911.911 0 0 0-.092-1.818c-.307.01-.61.068-.9.17l.004-4.423-.003-.126c-.016-.25-.01-.502.019-.752.23-.024.462.01.674.102a1.954 1.954 0 0 1 1.195.927c-.49.346-.87.828-1.092 1.385a.91.91 0 0 0 1.675.713c.191-.449.434-.682.724-.694a1.09 1.09 0 0 1 .925.311 1.276 1.276 0 0 1-.124 1.896.915.915 0 0 0 .327 1.468c.36.152.648.435.806.792.026.115.041.232.046.35-.007.151-.047.3-.118.435a1.065 1.065 0 0 1-.14.152 1.109 1.109 0 0 1-.944.281.91.91 0 0 0-.47 1.758c.102.019.206.032.31.039a.566.566 0 0 1 .001.483Z"
        className="fillStrong"
      />
      <path
        fill="#4F0599"
        d="m10.922 14.581-.01-9.844.002-.117a2.352 2.352 0 0 0-.991-2.406A2.753 2.753 0 0 0 7.829 2.2a4.041 4.041 0 0 0-2.511 2.277 2.75 2.75 0 0 0-1.74.927 3.038 3.038 0 0 0-.44 3.426 2.884 2.884 0 0 0-.998 1.809 2.547 2.547 0 0 0 .786 2.418c.165.15.347.281.542.39a2.43 2.43 0 0 0 .114 1.43 2.55 2.55 0 0 0 1.496 1.502A2.971 2.971 0 0 0 7.82 18c.14 0 .285-.009.435-.024a3.185 3.185 0 0 0 2.663-3.368c0-.01.005-.017.005-.026Zm-2.856 1.584c-1.095.105-1.378-.579-1.436-.779a.91.91 0 0 0-.766-.681.694.694 0 0 1-.584-.482.58.58 0 0 1-.017-.428c.104-.007.207-.02.31-.039a.909.909 0 0 0 .227-1.675.911.911 0 0 0-.699-.083c-.21.037-.426.01-.62-.077a1.133 1.133 0 0 1-.11-.06l-.028-.02a.958.958 0 0 1-.407-.985c.005-.029.003-.047.01-.077v-.002a1.48 1.48 0 0 1 .819-.84.91.91 0 0 0 .335-1.472 1.277 1.277 0 0 1-.125-1.896 1.077 1.077 0 0 1 .925-.31c.29.012.533.245.724.693a.91.91 0 1 0 1.675-.712 3.11 3.11 0 0 0-1.092-1.386 2.054 2.054 0 0 1 1.27-.953 1.63 1.63 0 0 1 .574-.102c.052.257.066.52.043.781l-.002.14.007 6.592a2.205 2.205 0 0 0-.88-.199.91.91 0 1 0 0 1.82c.358 0 .88.645.88 1.653 0 .966-.52 1.525-1.033 1.579Z"
        className="fill"
      />
    </g>
</svg>
```

You will notice that those path inside svg are having a class name, this is what we use to change the color of the icon depending on the theme.
If you look at the code, you will see that in CSS we target those two classes:

```jsx
const StyledIcon = styled.svg`
  .fill {
    fill: ${({ theme }) => theme.colors.other.icon.category.primary.fill};
  }

  .fillStrong {
    fill: ${({ theme }) => theme.colors.other.icon.category.primary.fillStrong};
  }
`
```

We say that when `<path />` tag has class fill, it will take the color of `theme.colors.other.icon.category.primary.fill`.

If the class is fillStrong, it will take the color of `theme.colors.other.icon.category.primary.fillStrong`.

This way, we can have different colors for the same icon depending on the theme, and it will switch the color automatically when the theme changes.
