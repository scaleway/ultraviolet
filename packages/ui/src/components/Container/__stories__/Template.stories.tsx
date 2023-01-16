import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Container } from '../index'

export const Template: Story<ComponentProps<typeof Container>> = args => (
  <Container {...args}>Content</Container>
)
