The Flags component is a collection of flags designed for use within Ultraviolet's components in particular cases, such region selectors in `SelectInput`.

## + How to add a new one?

1. Add the `.svg` file into `packages/icons/src/components/Flags/assets`
2. Then run the following command:
`pnpm run icons:update` at root of the project. The icons component will be generated automatically using this command.
<br />
<br />
**IMPORTANT:** Make sure that the icon name is unique, otherwise it will override the existing one.
The name of the svg should be snake-case.
