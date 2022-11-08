import { Template } from './Template.stories'

export const Target = Template.bind({})

Target.parameters = {
  docs: {
    storyDescription:
      'Edit the `target` prop to specify the target you want for your link. By using `_blank`, an icon is added to show that it is an external link',
  },
}

Target.args = {
  href: 'https://scaleway.com',
  target: '_blank',
}
