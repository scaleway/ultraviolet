import { Template } from './Template.stories'

export const Loading = Template.bind({})

Loading.args = {
  ...Template.args,
  isLoading: true,
}

Loading.parameters = {
  docs: {
    storyDescription:
      'By adding the prop `isLoading` on the `List`, 5 loading rows will be displayed instead of the provided children prop.',
  },
}
