import { Template } from './Template.stories'

export const MaxSize = Template.bind({})

MaxSize.args = { ...Template.args, maxSize: 3 }

MaxSize.parameters = {
  docs: {
    description: {
      story: 'Define the maximum number of key/value pair allowed using prop `maxSize`',
    },
  },
}
