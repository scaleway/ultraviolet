import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import ContainerV2 from '../index'

export const Template: Story<ComponentProps<typeof ContainerV2>> = args => (
  <ContainerV2 {...args}>Content</ContainerV2>
)
