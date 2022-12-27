import { Template } from './Template.stories'

export const Icon = Template.bind({})

Icon.args = {
  icon: 'lock',
  extend: true,
  children: 'With text',
}

Icon.parameters = {
  docs: {
    storyDescription:
      'This shows how to use `icon` on Button. You can specify the name of the icon or the icon itself.',
  },
}
