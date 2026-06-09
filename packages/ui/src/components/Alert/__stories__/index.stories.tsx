import type { Meta } from '@storybook/react-vite'
import { Alert } from '..'
import a11yDoc from '../a11y.md?raw'

export default {
  component: Alert,
  title: 'UI/Feedback/Alert',
  parameters: {
    a11yStatus: 'partial',
    a11yContent: a11yDoc,
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
