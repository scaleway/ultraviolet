import { Meta, Story } from '@storybook/react'
import React from 'react'
import ToastContainer, { toast } from '..'
import { Button } from '../..'

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

const Template: Story = () => (
  <>
    <ToastContainer />
    <div style={{ display: 'flex', gap: 8 }}>
      <Button
        variant="success"
        onClick={() => toast.success('This is success')}
      >
        Success
      </Button>
    </div>
  </>
)

export const Default = Template.bind({})

export const Variants: Story = () => (
  <>
    <ToastContainer />
    <div style={{ display: 'flex', gap: 8 }}>
      <Button
        variant="success"
        onClick={() => toast.success('This is success')}
      >
        Success
      </Button>
      <Button variant="info" onClick={() => toast.info('This is info')}>
        Info
      </Button>
      <Button variant="warning" onClick={() => toast.error('This is error')}>
        Error
      </Button>
    </div>
  </>
)
