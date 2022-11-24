import { Template } from './Template.stories'

export const Loading = Template.bind({})

Loading.parameters = {
  docs: {
    description: {
      story:
        'Loading for async operation or other use cases, You can define it by passing `isLoading` property to true.',
    },
  },
}

Loading.args = {
  isLoading: true,
}
