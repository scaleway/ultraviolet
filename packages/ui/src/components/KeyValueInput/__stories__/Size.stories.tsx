import { Template } from './Template.stories'

export const Size = Template.bind({})

Size.args = { ...Template.args, size: 'small' as const }

Size.parameters = {
  docs: {
    description: {
      story: 'Three sizes are available for the inputs: `small`, `medium` and `large` (default value)',
    },
  },
}
