import { Template } from './Template.stories'

export const Loading = Template.bind({})

Loading.args = { ...Template.args, loading: 'loading' }

Loading.parameters = {
  docs: {
    description: {
      story: 'Use prop `loading` to display a custom loading text paired with a loader',
    },
  },
}
