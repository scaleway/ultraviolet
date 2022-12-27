import { Template } from './Template.stories'

export const UserInputs = Template.bind({})

UserInputs.parameters = {
  docs: {
    storyDescription: `__userInputs__ properties can be used to specify which word shouldn't be used for a password. That way you can force user to avoid using sensitive data such as: their email, login, name, etc.

In this example try to type __thisisalongpassword__, the score should be really low as the word has been "banned" using __userInputs__ properties.`,
  },
}
UserInputs.args = {
  userInputs: ['thisisalongpassword'],
}
