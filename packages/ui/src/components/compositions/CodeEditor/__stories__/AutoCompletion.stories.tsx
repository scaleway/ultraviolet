import { Template } from './Template.stories'

export const AutoCompletion = Template.bind({})

AutoCompletion.args = { ...Template.args, autoCompletion: false }

AutoCompletion.parameters = {
  docs: {
    description: {
      story:
        'AutoCompletion is enabled by default. You can disable it by setting `autoCompletion` to `false`.',
    },
  },
}
