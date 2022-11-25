import { Story } from '@storybook/react'
import Pentagon from '..'
import { colors } from '../../../theme'

export const Color: Story = props => (
  <>
    <Pentagon color={colors.info.background} {...props} />
    <Pentagon color={colors.success.background} {...props} />
    <Pentagon color={colors.warning.background} {...props} />
    <Pentagon color={colors.danger.background} {...props} />
  </>
)

Color.decorators = [
  StoryComponent => (
    <div style={{ display: 'inline-flex' }}>
      <StoryComponent />
    </div>
  ),
]
