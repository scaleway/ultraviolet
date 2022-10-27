import { Template } from './Template.stories'

export const Multiline = Template.bind({})

Multiline.args = {
  value: `
# Install the package and start it
pnpm add @scaleway/ui
pnpm install
pnpm start
`,
  multiline: true,
}
