import { Template } from './Template'

export const Multiline = Template.bind({})

Multiline.args = {
  children: `
# Install the package and start it
pnpm add @scaleway/ui
pnpm install
pnpm start
`,
}
