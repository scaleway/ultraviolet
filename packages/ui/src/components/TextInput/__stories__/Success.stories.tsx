import { Template } from './Template.stories'

export const Success = Template.bind({})

Success.args = {
  ...Template.args,
  success: 'Field has been succesfully updated!',
}
