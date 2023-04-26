import { Template } from './Template'

export const LongMultiline = Template.bind({})

LongMultiline.args = {
  children: `
# Install the package and start it
pnpm add @scaleway/ui
pnpm install
pnpm start

# Build
pnpm build

# Test
pnpm test:unit
# Install the package and start it
pnpm add @scaleway/ui
pnpm install
pnpm start

# Build
pnpm build

# Test
pnpm test:unit
`,
}
