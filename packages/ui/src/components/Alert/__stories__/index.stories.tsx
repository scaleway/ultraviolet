import { Alert } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Alert,
  title: 'UI/Feedback/Alert',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Title } from './Title.stories'
export { Button } from './Button.stories'
export { Link } from './Link.stories'
export { Sentiments } from './Sentiments.stories'
export { Size } from './Size.stories'
export { Closable } from './Closable.stories'
export { LongChildren } from './LongChildren.stories'
