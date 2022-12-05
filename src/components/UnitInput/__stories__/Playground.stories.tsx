import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = { ...Template.args }

Playground.parameters = {
  docs: {
    storyDescription: `UnitInput provide data as follows:

    \`\`\`js
    {
        unit: [string],
        value: [string]
    }
    \`\`\``,
  },
}
