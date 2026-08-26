import { Template } from './Template.stories'

export const Basic = Template.bind({})
Basic.args = {
  disabled: false,
  onChange: () => {},
  page: 3,
  pageCount: 10,
}
