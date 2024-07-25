import { Template } from './Template.stories'

export const Children = Template.bind({})

Children.args = {
  children: 'Copy id',
}

Children.parameters = {
  docs: {
    description: {
      story:
        'If needed you can add a `children` prop to the component to customize the text inside the button.',
    },
  },
}
