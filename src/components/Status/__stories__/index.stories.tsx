import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Status, { statusVariants } from '..'

export default {
  component: Status,
  parameters: {
    docs: {
      description: {
        component: 'Colorful circle that can be used to indicated state.',
      },
    },
  },
  title: 'Components/Data Display/Status',
} as Meta

const Template: Story<ComponentProps<typeof Status>> = args => (
  <div style={{ display: 'flex' }}>
    <Status {...args} />
  </div>
)

export const Playground = Template.bind({})
Playground.args = {
  variant: 'success',
}

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription: 'Set `variant` using variant property.',
  },
}
Variants.decorators = [
  () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {statusVariants.map(variant => (
        <Status key={variant} variant={variant} />
      ))}
    </div>
  ),
]

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

export const Tooltip = Template.bind({})
Tooltip.parameters = {
  docs: {
    storyDescription: 'Add a `tooltip` using tooltip property',
  },
}
Tooltip.args = {
  tooltip: 'A tooltip text',
  variant: 'success',
}
