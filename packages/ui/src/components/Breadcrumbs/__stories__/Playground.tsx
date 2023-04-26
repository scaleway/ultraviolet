import { Template } from './Template'

export const Playground = Template.bind({})

Playground.parameters = {
  docs: {
    storyDescription: `
      Creates a Breadcrumbs of hierarchical pages.
      Link are automatically supported with \`to\` prop using the \`linkComponent\` from
      your theme configuration.
    `,
  },
}
