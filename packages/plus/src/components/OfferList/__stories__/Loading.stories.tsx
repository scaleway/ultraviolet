import { Template } from './Template.stories'

export const Loading = Template.bind({})

Loading.args = {
  ...Template.args,
  expandable: true,
  loading: true,
  type: 'radio',
}
