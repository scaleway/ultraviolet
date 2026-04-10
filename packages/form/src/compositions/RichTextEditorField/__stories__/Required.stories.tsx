import { Stack } from '@ultraviolet/ui'

import { RichTextEditorField } from '..'
import { Submit } from '../../../components/Submit'

import { Template } from './Template.stories'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Required: StoryFn<
  ComponentProps<typeof RichTextEditorField>
> = args => (
  <Stack gap={1}>
    <RichTextEditorField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = { ...Template.args, required: true }
