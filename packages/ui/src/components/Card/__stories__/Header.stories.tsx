import { Template } from './Template.stories'

export const Header = Template.bind({})
Header.args = {
  header: 'Simple Header',
  children: 'This is the content of a Card',
}

Header.parameters = {
  docs: {
    storyDescription:
      'You can pass a `string` to the `header` prop to display a simple header.',
  },
}
