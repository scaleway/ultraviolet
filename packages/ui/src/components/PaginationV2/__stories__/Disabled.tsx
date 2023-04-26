import { Template } from './Template'

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  onChange: () => {},
  page: 3,
  pageCount: 10,
}
