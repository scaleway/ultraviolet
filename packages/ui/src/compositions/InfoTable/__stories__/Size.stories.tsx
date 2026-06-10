import { Template } from './Template.stories'

export const Size = Template.bind({})

Size.args = { ...Template.args, size: 'small' }

Size.parameters = {
  docs: {
    description: {
      story: 'Change the component size using prop `size` (`large` by default).',
    },
  },
}
