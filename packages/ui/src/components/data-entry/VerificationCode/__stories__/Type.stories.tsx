import { Template } from './Template.stories'

export const Type = Template.bind({})
Type.args = {
  initialValue: 'A3B6',
  label: 'Verification code with letters',
  type: 'text',
}

Type.parameters = {
  docs: {
    description: { story: 'use `type` prop to allow letter' },
  },
}
