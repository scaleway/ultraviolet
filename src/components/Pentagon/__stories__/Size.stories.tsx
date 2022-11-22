import { Story } from '@storybook/react'
import Pentagon from '..'

export const Size: Story = props => (
  <div style={{ display: 'inline-flex' }} {...props}>
    <Pentagon size="50px" />
    <Pentagon size="100px" />
    <Pentagon size="150px" />
    <Pentagon size="200px" />
  </div>
)
