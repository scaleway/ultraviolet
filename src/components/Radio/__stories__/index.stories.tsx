import { ComponentMeta } from '@storybook/react'
import Radio from '..'

export default {
  component: Radio,
  parameters: {
    docs: {
      description: {
        component:
          'A radio button that only work as [controlled component](https://reactjs.org/docs/forms.html).',
      },
    },
  },
  title: 'Components/Data Entry/Radio',
} as ComponentMeta<typeof Radio>

export { Playground } from './Playground'
export { Controlled } from './Controlled'
export { Disabled } from './Disabled'
export { Error } from './Error'
