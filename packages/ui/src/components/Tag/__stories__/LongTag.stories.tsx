import { Template } from './Template.stories'

export const LongTag = Template.bind({})

LongTag.parameters = {
  docs: {
    description: {
      story:
        'Loading for async operation or other use cases, You can define it by passing `isLoading` property to true.',
    },
  },
}

LongTag.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id. dolor sit amet, consectetur adipiscing elit. Nullam id.',
}
