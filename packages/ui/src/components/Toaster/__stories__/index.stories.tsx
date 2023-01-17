import type { ComponentMeta } from '@storybook/react'
import { ToastContainer } from '..'

export default {
  component: ToastContainer,
  parameters: {
    docs: {
      description: {
        component: `Display short information about an event that happen in the interface in a floating alert.
Toaster is based on **react-tostify**, you can find a complete documentation [here](https://fkhadra.github.io/react-toastify/introduction/).

Toaster is separated in two parts, first the \`ToastContainer\` which is where the div of the toast will be rendered, and second the \`toast()\` function which is used to display the toast.
`,
      },
    },
  },
  title: 'Components/Feedback/Toaster',
} as ComponentMeta<typeof ToastContainer>

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
