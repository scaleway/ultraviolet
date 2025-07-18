import type { Meta } from '@storybook/react'
import { ButtonUtilityClasses } from '..'

export default {
  component: ButtonUtilityClasses,
  title: 'Components/Action/ButtonUtilityClasses',
} as Meta<typeof ButtonUtilityClasses>

export const Playground = () => (
  <ButtonUtilityClasses>Click me</ButtonUtilityClasses>
)
