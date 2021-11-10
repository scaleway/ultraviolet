import { Meta, Story } from '@storybook/react'
import React from 'react'
import ToastContainer, { toast } from '..'
import { Boxer, Button } from '../..'

export default {
  component: ToastContainer,
  parameters: {
    docs: {
      description: {
        component:
          'Display short information about an event that happen in the interface in a floating alert.',
      },
    },
  },
  title: 'Components/Feedback/Toaster',
} as Meta

const Template: Story = args => (
  <>
    <ToastContainer {...args} />
    <Boxer>
      <Button
        variant="success"
        mb={1}
        onClick={() => toast.success('This is success')}
      >
        Success
      </Button>
    </Boxer>
  </>
)

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.decorators = [
  () => (
    <>
      <ToastContainer />
      <Boxer>
        <Button
          variant="success"
          mb={1}
          onClick={() => toast.success('This is success')}
        >
          Success
        </Button>
        <Button
          variant="info"
          mb={1}
          onClick={() => toast.info('This is info')}
        >
          Info
        </Button>
        <Button
          variant="warning"
          mb={1}
          onClick={() => toast.warn('This is warning')}
        >
          Warning
        </Button>
        <Button
          variant="warning"
          mb={1}
          onClick={() => toast.error('This is error')}
        >
          Error
        </Button>
      </Boxer>
    </>
  ),
]
