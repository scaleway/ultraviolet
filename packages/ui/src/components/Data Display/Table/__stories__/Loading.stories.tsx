import { Template } from './Template.stories'

export const Loading = Template.bind({})

Loading.args = {
  ...Template.args,
  loading: true,
}

Loading.parameters = {
  docs: {
    description: {
      story:
        'By adding the prop `loading` on the `Table`, 5 loading rows will be displayed instead of the provided children prop.',
    },
  },
}
