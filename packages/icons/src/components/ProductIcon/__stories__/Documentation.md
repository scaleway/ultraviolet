ProductIcon component is used to render a set of icons that are linked to a product or service.
Those icons are made of multiple colors that changes automatically based on the current theme.

## + How to add a new one?

1. Add the `.svg` file into `packages/icons/src/components/ProductIcon/assets`
2. Then run the following command:
`pnpm run icons:update` at root of the project. The icons component will be generated automatically using this command.
<br />
<br />
** IMPORTANT: ** Make sure that the icon name is unique, otherwise it will override the existing one.
The name of the svg should be snake-case.

## ⚙ How does it works?

Those icons have 2 sets of colors that changes depending on theme. It is all automatic but here is how it works:
Let's take an example with our Apple Silicon product icon svg:

```svg
<svg>
  <g className="MacMini-M1">
    <g className=".Square">
      <path
        fill="#EEF"
        d="M0 16C0 7.163 7.163 0 16 0h32c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H16C7.163 64 0 56.837 0 48V16Z"
        className="fillWeak"
      />
    </g>
    <g className="MacMini-M1">
      <path
        fill="#4F0599"
        fillRule="evenodd"
        d="M40 8.5c5.523 0 10 4.477 10 10v16c0 5.523-4.477 10-10 10h-7v5.17a3.009 3.009 0 0 1 1.83 1.83h13.334a1 1 0 0 1 .117 1.993l-.117.007H34.83a3.001 3.001 0 0 1-5.658 0H15a1 1 0 0 1-.117-1.993L15 51.5h14.171A3.009 3.009 0 0 1 31 49.67V44.5h-7c-5.523 0-10-4.477-10-10v-16c0-5.523 4.477-10 10-10h16Zm-8 34h-8l-.25-.004A8 8 0 0 1 16 34.5v-16l.004-.25A8 8 0 0 1 24 10.5h16l.25.004A8 8 0 0 1 48 18.5v16l-.004.25A8 8 0 0 1 40 42.5h-8Zm0 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
        className="fill"
        clipRule="evenodd"
      />
      <path
        fill="#A365F6"
        fillRule="evenodd"
        d="M45 18.5a5 5 0 0 0-5-5H24a5 5 0 0 0-5 5v16a5 5 0 0 0 5 5h16a5 5 0 0 0 5-5v-16Zm-21-3h16l.176.005A3 3 0 0 1 43 18.5v16l-.005.176A3 3 0 0 1 40 37.5H24l-.176-.005A3 3 0 0 1 21 34.5v-16l.005-.176A3 3 0 0 1 24 15.5Zm10.11 14.79v-6.98h-1.58l-2.22 5.19-2.22-5.19H26.5v6.98h1.4v-4.54l1.88 4.54h1.06l1.87-4.54v4.54h1.4ZM35.164 23v1.29h.97v6h1.44V23h-2.41Z"
        className="fillStrong"
        clipRule="evenodd"
      />
    </g>
  </g>
</svg>
```

The same way that we did for CategoryIcon, we have a className on the `<path />` tag that defines the color token to use from theme.
In this case, we have 3 different colors: `fillWeak`, `fill` and `fillStrong`.

In the code of the component we get the tokens associated with those className and we use them to fill the svg.
