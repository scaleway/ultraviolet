import type { StoryFn } from '@storybook/react-vite'
import { textVariants } from '@ultraviolet/themes'
import { Text } from '..'

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
