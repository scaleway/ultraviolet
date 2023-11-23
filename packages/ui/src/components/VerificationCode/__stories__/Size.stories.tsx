import { Template } from './Template.stories'

export const Size = Template.bind({})
Size.args = {
  size: 'small',
}

Size.parameters = {
  docs: {
    description: { story: 'use `size` prop to change the size of the input' },
  },
}
