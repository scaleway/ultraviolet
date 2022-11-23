import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Container from '../index'

export const Template: Story<ComponentProps<typeof Container>> = args => (
  <Container {...args}>Content</Container>
)
