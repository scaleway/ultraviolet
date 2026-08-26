import { Template } from './Template.stories'

export const Success = Template.bind({})

Success.args = {
  ...Template.args,
  success: 'Your tags have been succesfully saved',
}
