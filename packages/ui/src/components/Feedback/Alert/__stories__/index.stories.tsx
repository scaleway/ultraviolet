import type { Meta } from '@storybook/react-vite'
import { Alert } from '..'

export default {
  component: Alert,
  title: 'UI/Feedback/Alert',
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: false,
      understandable: true,
      robust: false,
    },
  },
} satisfies Meta<typeof Alert>

export { Playground } from './Playground.stories'
export { Title } from './Title.stories'
export { Button } from './Button.stories'
export { Link } from './Link.stories'
export { Sentiments } from './Sentiments.stories'
export { Size } from './Size.stories'
export { Closable } from './Closable.stories'
export { LongChildren } from './LongChildren.stories'
