import { Template } from './Template.stories'

export const OptionName = Template.bind({})

OptionName.args = { ...Template.args, optionName: 'version' }

OptionName.parameters = {
  docs: {
    description: {
      story:
        'By default the option name will be `[name]Option` where `name` is the name of the field. This can be overridden by passing the `optionName` prop.',
    },
  },
}
