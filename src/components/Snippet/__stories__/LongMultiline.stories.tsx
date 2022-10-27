import { Template } from './Template.stories'

export const LongMultiline = Template.bind({})

LongMultiline.args = {
  value: `
# Install the package and start it
pnpm add @scaleway/ui
pnpm install
pnpm start

# Build
pnpm build

# Test
pnpm test:unit
`,
  multiline: true,
}
