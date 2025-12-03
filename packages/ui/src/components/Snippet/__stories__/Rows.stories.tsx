import { Template } from './Template.stories'

export const Rows = Template.bind({})

Rows.args = {
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
  rows: 14,
}

Rows.parameters = {
  docs: {
    description: {
      story: `Define maximum number of lines to display without "show/hide" button.`,
    },
  },
}
