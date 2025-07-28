import { Template } from './Template.stories'

export const Header = Template.bind({})
Header.args = {
  children: 'This is the content of a Card',
  header: 'Simple Header',
}

Header.parameters = {
  docs: {
    description: {
      story:
        'You can pass a `string` to the `header` prop to display a simple header.',
    },
  },
}
