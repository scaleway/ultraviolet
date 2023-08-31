import type { Meta } from '@storybook/react'
import { RadioGroup } from '..'

export default {
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'A group of radios button that only work as [controlled component](https://reactjs.org/docs/forms.html).',
      },
    },
  },
  title: 'Components/Data Entry/RadioGroup',
} as Meta<typeof RadioGroup>

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { Direction } from './Direction.stories'
export { Helper } from './Helper.stories'
export { Error } from './Error.stories'
