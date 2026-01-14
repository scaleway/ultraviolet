import { Template } from './Template.stories'

export const LongMultilineExpanded = Template.bind({})

LongMultilineExpanded.args = {
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
  initiallyExpanded: true,
}

LongMultilineExpanded.parameters = {
  docs: {
    description: {
      story:
        'Using the prop `initiallyExpanded` you can set the snippet to be expanded by default.',
    },
  },
}
