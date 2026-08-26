import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  rules: [
    {
      name: 'hasOneUppercase',
      text: 'Password must have at least one uppercase character',
      valid: true,
    },
    {
      name: 'hasOneLowercase',
      text: 'Password must have at least one lowercase character',
      valid: true,
    },
    {
      name: 'hasOneSpecial',
      text: 'Password must have at least one special character',
      valid: true,
    },
    {
      name: 'hasOneNumber',
      text: 'Password must have at least one number',
      valid: true,
    },
    {
      name: 'isLongEnough',
      text: 'Password must have a minimum of 8 characters',
      valid: false,
    },
    {
      name: 'score',
      text: 'Password strength score',
      valid: false,
    },
  ],
}
