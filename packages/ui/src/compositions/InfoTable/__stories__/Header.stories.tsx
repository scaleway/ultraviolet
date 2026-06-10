import { Template } from './Template.stories'

export const Header = Template.bind({})

Header.args = { ...Template.args, header: 'Header' }

Header.parameters = {
  docs: {
    description: {
      story: 'Prop `header` wraps InfoTable inside a card with a header',
    },
  },
}
