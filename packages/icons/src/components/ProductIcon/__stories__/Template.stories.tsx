import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Instance } from '../__generatedIcons__'

export const Template: StoryFn<ComponentProps<typeof Instance>> = ({
  ...props
}) => <Instance {...props} />
