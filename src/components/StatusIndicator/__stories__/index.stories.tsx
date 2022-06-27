import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import StatusIndicator from '..'

export default {
  component: StatusIndicator,
  parameters: {
    deprecated: true,
    deprecatedReason:
      'This component is deprecated, please use Status component instead.',
    docs: {
      description: {
        component: 'Colorful circle that can be used to indicated state.',
      },
    },
  },
  title: 'Components/Data Display/StatusIndicator',
} as Meta

const Template: Story<ComponentProps<typeof StatusIndicator>> = args => (
  <StatusIndicator {...args} />
)

export const Default = Template.bind({})

Default.args = {
  status: 'available',
}

export const Status: Story = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <StatusIndicator status="available" />
    <StatusIndicator status="unavailable" />
    <StatusIndicator status="available" />
    <StatusIndicator status="starting" />
    <StatusIndicator status="stopped_in_place" />
  </div>
)

Status.parameters = {
  docs: {
    description: {
      story: 'Status prop can be used to show different state types and color.',
    },
  },
}

export const Animated = Template.bind({})

Animated.args = {
  animated: true,
  status: 'starting',
  tooltip: 'Starting animated',
}

Animated.parameters = {
  docs: {
    description: {
      story:
        'Animated prop will make StatusIndicator blink. This prop is usually used for temporary or "in progress" state.',
    },
  },
}

export const CustomStatus = Template.bind({})

CustomStatus.args = {
  status: 'fake_status',
  statuses: {
    fake_status: 'purple',
  },
}
