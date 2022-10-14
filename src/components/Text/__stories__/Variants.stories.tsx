import { ComponentStory } from '@storybook/react'
import Text, { textVariants } from '../index'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Variants: ComponentStory<typeof Text> = props => (
  <>
    {textVariants.map(variant => (
      <Text as="div" key={variant} variant={variant}>
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
