import type { StoryFn } from '@storybook/react-vite'
import { AlertCircleOutlineIcon } from '@ultraviolet/icons/AlertCircleOutlineIcon'
import type { ComponentProps } from 'react'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Tooltip } from '../../Tooltip'
import { TagInput } from '../index'

export const LabelDescription: StoryFn = (
  args: ComponentProps<typeof TagInput>,
) => (
  <Stack gap={2}>
    <TagInput
      {...args}
      label="Advanced Label"
      labelDescription={<Badge size="small">New</Badge>}
      required
    />
    <TagInput
      {...args}
      label="Advanced Label"
      labelDescription={
        <Tooltip text="Tooltip message">
          <AlertCircleOutlineIcon sentiment="neutral" />
        </Tooltip>
      }
      required
    />
  </Stack>
)

LabelDescription.args = {
  name: 'label-description',
  onChange: () => {},
}

LabelDescription.parameters = {
  docs: {
    description: {
      story: `Using the prop \`labelDescription\` you can add a badge or a tooltip to the label. You can also use the prop \`required\` in order to display a required icon but be aware that without the label being set this icon won't be shown.`,
    },
  },
}
