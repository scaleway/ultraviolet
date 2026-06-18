import { Template } from './Template.stories'

export const OnClick = Template.bind({})

OnClick.args = {
  ...Template.args,
  onClick: () => {
    alert('Clicked!')
  },
}

OnClick.parameters = {
  docs: {
    description: {
      story: 'Use prop `onClick` to handle click events on the code editor.',
    },
  },
}
