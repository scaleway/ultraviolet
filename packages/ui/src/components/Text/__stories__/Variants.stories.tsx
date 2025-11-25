import type { StoryFn } from '@storybook/react-vite'
import { Text } from '..'
import { textVariants } from '../constants'

export const Variants: StoryFn<typeof Text> = props => (
  <>
    {textVariants.map(variant => (
      <Text key={variant} {...props} as="div" variant={variant}>
        {variant}
      </Text>
    ))}
  </>
)

Variants.parameters = {
  docs: {
    description: {
      story: 'Set variant using `variant` property.',
    },
  },
}
