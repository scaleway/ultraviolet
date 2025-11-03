import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { FranceFlag } from '../__generated__'

export const Template: StoryFn<ComponentProps<typeof FranceFlag>> = ({
  ...props
}) => <FranceFlag {...props} />
