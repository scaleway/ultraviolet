import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import StatusIndicator from '..'

export default {
  component: StatusIndicator,
  parameters: {
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
  <>
    <StatusIndicator status="available" tooltip="Available" mr={1} />
    <StatusIndicator status="unavailable" tooltip="Unavailable" mr={1} />
    <StatusIndicator status="starting" tooltip="Starting" mr={1} />
    <StatusIndicator status="stopped" tooltip="Stopped" mr={1} />
    <StatusIndicator
      status="stopped_in_place"
      tooltip="Stopped in place"
      mr={1}
    />
  </>
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
  tooltip: 'Fake status',
}
