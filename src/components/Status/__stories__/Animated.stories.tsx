import { Template } from './Template.stories'

export const Animated = Template.bind({})

Animated.args = {
  animated: true,
  variant: 'info',
}

Animated.parameters = {
  docs: {
    description: {
      story:
        'Animated prop will make StatusIndicator blink. This prop is usually used for temporary or "in progress" state.',
    },
  },
}
