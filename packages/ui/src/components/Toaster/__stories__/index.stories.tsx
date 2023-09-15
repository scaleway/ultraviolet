import type { Meta } from '@storybook/react'
import { ToastContainer } from '..'

export default {
  component: ToastContainer,
  title: 'Components/Feedback/Toaster',
} as Meta<typeof ToastContainer>

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
