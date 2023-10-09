import { Template } from './Template.stories'

export const IconOnly = Template.bind({})

IconOnly.args = {
  ...Template.args,
  icon: 'pencil',
  'aria-label': 'edit',
  children: undefined,
}

IconOnly.parameters = {
  docs: {
    description: { story: '`children` element is not required' },
  },
}
