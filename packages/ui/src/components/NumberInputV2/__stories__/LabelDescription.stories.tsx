import type { StoryFn } from '@storybook/react'
import { Icon } from '@ultraviolet/icons/legacy'
import type { ComponentProps } from 'react'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Tooltip } from '../../Tooltip'
import { NumberInputV2 } from '../index'

export const LabelDescription: StoryFn = (
  args: ComponentProps<typeof NumberInputV2>,
) => (
  <Stack gap={2}>
    <NumberInputV2
      {...args}
      label="Advanced Label"
      labelDescription={<Badge size="small">New</Badge>}
      required
    />
    <NumberInputV2
      {...args}
      label="Advanced Label"
      labelDescription={
        <Tooltip text="Tooltip message">
          <Icon name="alert" color="neutral" variant="outlined" />
        </Tooltip>
      }
      required
    />
  </Stack>
)

LabelDescription.args = {
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
}

LabelDescription.parameters = {
  docs: {
    description: {
      story: `Using the prop \`labelDescription\` you can add a badge or a tooltip to the label. You can also use the prop \`required\` in order to display a required icon but be aware that without the label being set this icon won't be shown.`,
    },
  },
}
