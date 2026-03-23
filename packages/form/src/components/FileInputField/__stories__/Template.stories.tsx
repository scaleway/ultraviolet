import { Stack } from '@ultraviolet/ui'

import { FileInputField } from '..'
import { Submit } from '../..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<
  ComponentProps<typeof FileInputField>
> = args => (
  <Stack gap="1">
    <FileInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Template.args = {
  bottom: <FileInputField.List />,
  children: (
    <>
      Or <FileInputField.Button>Add file</FileInputField.Button>
    </>
  ),
  label: 'Label',
  multiple: true,
  name: 'example',
  title: 'Drag and drop',
}
