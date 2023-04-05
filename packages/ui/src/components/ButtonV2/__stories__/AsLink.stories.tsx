import { Template } from './Template.stories'

export const AsLink = Template.bind({})

AsLink.args = {
  href: 'https://www.scaleway.com/',
  variant: 'ghost',
  sentiment: 'info',
  children: 'Click me',
}

AsLink.parameters = {
  docs: {
    storyDescription:
      'Provide an `href` to turn the button as an anchor element. Adding `href` also allow to add `download` and `target` properties. `name` prop is not allowed in a anchor element.',
  },
}
