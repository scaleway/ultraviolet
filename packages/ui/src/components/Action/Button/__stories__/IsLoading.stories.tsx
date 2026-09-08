import { Template } from './Template.stories'

export const IsLoading = Template.bind({})

IsLoading.args = {
  ...Template.args,
  isLoading: true,
}

IsLoading.parameters = {
  docs: {
    description: {
      story:
        'You can use the prop `isLoading`, it will disable the button and add (or replace icon) a `Loader` component. The `iconPosition` prop also impacts Loader position.',
    },
  },
}
