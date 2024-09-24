import { Template } from './Template.stories'

export const NoExpandable = Template.bind({})

NoExpandable.args = {
  children: `# Install the package and start it
pnpm add @ultraviolet/ui
pnpm install
pnpm start

# Build
pnpm build

# Test
pnpm test:unit
# Install the package and start it
pnpm add @ultraviolet/ui
pnpm install
pnpm start

# Build
pnpm build

# Test
pnpm test:unit`,
  noExpandable: true,
  rows: 10,
}

NoExpandable.parameters = {
  docs: {
    description: {
      story: `When set to true, prop  \`noExpandable\`, if the snippet is more than \`rows\` long there is scroll instead of a "show/hide" button`,
    },
  },
}
