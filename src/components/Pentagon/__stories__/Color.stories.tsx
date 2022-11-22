import { Story } from '@storybook/react'
import Pentagon from '..'
import { colors } from '../../../theme'

export const Color: Story = props => (
  <div style={{ display: 'inline-flex' }} {...props}>
    <Pentagon color={colors.info.background} />
    <Pentagon color={colors.success.background} />
    <Pentagon color={colors.warning.background} />
    <Pentagon color={colors.danger.background} />
  </div>
)
