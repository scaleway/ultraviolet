import type { ComponentStory } from '@storybook/react'
import { Text, textVariants } from '../index'

export const Variants: ComponentStory<typeof Text> = props => (
  <>
    {textVariants.map(variant => (
      <Text {...props} as="div" key={variant} variant={variant}>
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
