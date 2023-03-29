import { Template } from './Template.stories'

export const IsLoading = Template.bind({})

IsLoading.args = {
  ...Template.args,
  isLoading: true,
}

IsLoading.parameters = {
  docs: {
    storyDescription:
      'You can use the prop `isLoading`, it will disable the button and add (or replace icon) a `Loader` component. The `iconPosition` prop also impacts Loader position.',
  },
}
