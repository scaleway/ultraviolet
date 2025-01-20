import { Template } from './Template.stories'

export const Type = Template.bind({})
Type.args = {
  label: 'Verification code with letters',
  type: 'text',
  initialValue: 'A3B6',
}

Type.parameters = {
  docs: {
    description: { story: 'use `type` prop to allow letter' },
  },
}
