import type { Meta } from '@storybook/react-vite'
import { RadioCard } from '..'

export default {
  component: RadioCard,
  title: 'Compositions/RadioCard',
  parameters: {
    a11yStatus: 'not-tested',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
    docs: {
      description: {
        subtitle: 'Use prop `compact` to only display the total price.',
      },
    },
  },
} satisfies Meta<typeof RadioCard>

export { Basic } from './Basic.stories'
export { WithDescription } from './WithDescription.stories'
export { WithBadge } from './WithBadge.stories'
export { WithSideText } from './WithSideText.stories'
export { Error } from './Error.stories'
export { Disabled } from './Disabled.stories'
export { Playground } from './Playground.stories'
