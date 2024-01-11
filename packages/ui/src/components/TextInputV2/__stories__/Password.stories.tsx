import { Template } from './Template.stories'

export const Password = Template.bind({})

Password.args = {
  ...Template.args,
  type: 'password',
}
